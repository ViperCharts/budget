import { defineStore } from "pinia";
import { trpc } from "@/lib/trpc";
import { useAIStore } from "./ai";
import { useAccountsStore } from "./accounts";
import { useTransactionsStore } from "./transactions";
import { readFileAsText, detectFormat, csvToText, parseCSV } from "@/lib/csv";
import { extractFromText, extractFromPDF } from "@/lib/ai";
import { nanoid, makeTransactionId } from "@/lib/nanoid";
import type { BudgetFile, FileFormat, ExtractedFileData } from "@/types";

export interface FileTreeNode {
  year: number;
  months: {
    month: number;
    files: BudgetFile[];
  }[];
}

export const useFilesStore = defineStore("files", {
  state: () => ({
    files: [] as BudgetFile[],
    loading: false,
    uploading: false,
  }),

  getters: {
    /** Files organized as YYYY / MM / file tree */
    tree(): FileTreeNode[] {
      const map: Record<number, Record<number, BudgetFile[]>> = {};

      for (const file of this.files) {
        const year =
          file.statementYear ?? new Date(file.uploadedAt).getFullYear();
        const month =
          file.statementMonth ?? new Date(file.uploadedAt).getMonth() + 1;
        if (!map[year]) map[year] = {};
        if (!map[year][month]) map[year][month] = [];
        map[year][month].push(file);
      }

      return Object.entries(map)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, months]) => ({
          year: Number(year),
          months: Object.entries(months)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([month, files]) => ({
              month: Number(month),
              files: files.sort(
                (a, b) =>
                  new Date(b.uploadedAt).getTime() -
                  new Date(a.uploadedAt).getTime()
              ),
            })),
        }));
    },

    byId(): Record<string, BudgetFile> {
      return Object.fromEntries(this.files.map((f) => [f.id, f]));
    },
  },

  actions: {
    async fetch() {
      this.loading = true;
      try {
        const rows = await trpc.files.list.query();
        this.files = rows.map((row) => ({
          id: row.id,
          name: row.name,
          format: row.format as FileFormat,
          status: row.status as BudgetFile["status"],
          size: row.size,
          uploadedAt: row.uploadedAt,
          ...(row.statementYear != null && { statementYear: row.statementYear }),
          ...(row.statementMonth != null && { statementMonth: row.statementMonth }),
          ...(row.accountId != null && { accountId: row.accountId as string }),
          ...(row.storagePath != null && { storagePath: row.storagePath as string }),
          ...(row.error != null && { error: row.error as string }),
          ...(row.extractedData != null && { extractedData: row.extractedData as BudgetFile["extractedData"] }),
        }));
      } finally {
        this.loading = false;
      }
    },

    async uploadFile(rawFile: File) {
      const aiStore = useAIStore();
      const accountsStore = useAccountsStore();
      const transactionsStore = useTransactionsStore();

      const id = nanoid();
      const format = detectFormat(rawFile.name) as FileFormat;

      // Create initial record on server
      const fileDoc: BudgetFile = {
        id,
        name: rawFile.name,
        format,
        status: "uploading",
        size: rawFile.size,
        uploadedAt: new Date().toISOString(),
      };

      await trpc.files.create.mutate({
        id,
        name: rawFile.name,
        format,
        size: rawFile.size,
        uploadedAt: fileDoc.uploadedAt,
      });

      // Optimistic: add to local state
      this.files.push(fileDoc);

      // Upload file to server
      const formData = new FormData();
      formData.append("file", rawFile);
      formData.append("fileId", id);

      const uploadRes = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!uploadRes.ok) {
        await trpc.files.updateStatus.mutate({ id, status: "error", error: "Upload failed" });
        this._updateLocalFile(id, { status: "error", error: "Upload failed" });
        return;
      }

      const { storagePath } = await uploadRes.json();

      // Update status to processing
      await trpc.files.updateStatus.mutate({ id, status: "processing", storagePath });
      this._updateLocalFile(id, { status: "processing", storagePath });

      // AI extraction (if configured)
      if (aiStore.hasApiKey && format !== "unknown") {
        try {
          let extracted = null;

          if (format === "csv") {
            const text = await readFileAsText(rawFile);
            const rows = parseCSV(text);
            const rawText = csvToText(rows);
            if (rawText)
              extracted = await extractFromText(rawText, aiStore.settings);
          } else if (format === "pdf") {
            extracted = await extractFromPDF(rawFile, aiStore.settings);
          }

          if (extracted) {
            // Infer statement year/month from date
            let statementYear: number | undefined;
            let statementMonth: number | undefined;
            if (extracted.statementDate) {
              const d = new Date(extracted.statementDate);
              statementYear = d.getFullYear();
              statementMonth = d.getMonth() + 1;
            } else if (extracted.transactions.length > 0) {
              const firstDate = extracted.transactions[0].date;
              if (firstDate) {
                const d = new Date(firstDate);
                statementYear = d.getFullYear();
                statementMonth = d.getMonth() + 1;
              }
            }

            // Upsert account — deduplicate by account number if available
            let accountId: string | undefined;
            if (extracted.accountName || extracted.accountType) {
              const existingAccount = extracted.accountNumber
                ? accountsStore.byAccountNumber[extracted.accountNumber]
                : undefined;

              if (existingAccount) {
                const updatedFileIds = existingAccount.fileIds.includes(id)
                  ? existingAccount.fileIds
                  : [...existingAccount.fileIds, id];
                await accountsStore.upsertAccount({
                  ...existingAccount,
                  balance: extracted.closingBalance ?? existingAccount.balance,
                  fileIds: updatedFileIds,
                });
                accountId = existingAccount.id;
              } else {
                const account = await accountsStore.upsertAccount({
                  name: extracted.accountName ?? "Unknown Account",
                  type: extracted.accountType ?? "checking",
                  balance: extracted.closingBalance ?? 0,
                  accountNumber: extracted.accountNumber,
                  holderName: extracted.holderName,
                  interestRate: extracted.interestRate,
                  creditLimit: extracted.creditLimit,
                  fileIds: [id],
                });
                accountId = account?.id;
              }
            }

            // Save transactions
            if (extracted.transactions.length > 0 && accountId) {
              await transactionsStore.addTransactions(
                extracted.transactions.map((t) => {
                  const date = t.date ?? new Date().toISOString().split("T")[0];
                  const description = t.description ?? "";
                  return {
                    id: makeTransactionId(accountId!, date, description),
                    accountId: accountId!,
                    fileId: id,
                    date,
                    description,
                    amount: t.amount ?? 0,
                    type: t.type ?? "debit",
                    category: t.category ?? "Other",
                  };
                })
              );
            }

            // Update file status — strip undefined fields before sending to server
            const extractedData = Object.fromEntries(
              Object.entries(extracted).filter(([, v]) => v !== undefined)
            ) as ExtractedFileData;
            await trpc.files.updateStatus.mutate({
              id,
              status: "ready",
              extractedData,
              ...(statementYear !== undefined && { statementYear }),
              ...(statementMonth !== undefined && { statementMonth }),
              ...(accountId !== undefined && { accountId }),
            });
            this._updateLocalFile(id, {
              status: "ready",
              extractedData,
              ...(statementYear !== undefined && { statementYear }),
              ...(statementMonth !== undefined && { statementMonth }),
              ...(accountId !== undefined && { accountId }),
            });
          } else {
            await trpc.files.updateStatus.mutate({ id, status: "ready" });
            this._updateLocalFile(id, { status: "ready" });
          }
        } catch (err) {
          console.error("AI extraction failed:", err);
          const error = err instanceof Error ? err.message : "AI extraction failed";
          await trpc.files.updateStatus.mutate({ id, status: "error", error });
          this._updateLocalFile(id, { status: "error", error });
        }
      } else {
        await trpc.files.updateStatus.mutate({ id, status: "ready" });
        this._updateLocalFile(id, { status: "ready" });
      }
    },

    async getDownloadUrl(fileId: string): Promise<string> {
      const file = this.byId[fileId];
      if (!file?.storagePath) throw new Error("No storage path for file");
      return `/api/files/download/${file.storagePath}`;
    },

    async deleteFile(fileId: string) {
      const file = this.byId[fileId];
      if (!file) return;

      // Server handles storage deletion and transaction cleanup
      await trpc.files.delete.mutate({ id: fileId });

      // Optimistic update
      this.files = this.files.filter((f) => f.id !== fileId);

      // Also update local transactions store
      const transactionsStore = useTransactionsStore();
      transactionsStore.transactions = transactionsStore.transactions.filter(
        (t) => t.fileId !== fileId
      );
    },

    _updateLocalFile(id: string, updates: Partial<BudgetFile>) {
      const idx = this.files.findIndex((f) => f.id === id);
      if (idx >= 0) {
        this.files[idx] = { ...this.files[idx], ...updates };
      }
    },
  },
});
