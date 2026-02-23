import { defineStore } from "pinia";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useAuthStore } from "./auth";
import { useAIStore } from "./ai";
import { useAccountsStore } from "./accounts";
import { useTransactionsStore } from "./transactions";
import { readFileAsText, detectFormat, csvToText, parseCSV } from "@/lib/csv";
import { extractFromText, extractFromPDF } from "@/lib/ai";
import { nanoid, makeTransactionId } from "@/lib/nanoid";
import type { BudgetFile, FileFormat } from "@/types";

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
    _unsubscribe: null as Unsubscribe | null,
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
    subscribe() {
      const auth = useAuthStore();
      if (!auth.user) return;

      this.loading = true;
      const q = query(
        collection(db, "files"),
        where("uid", "==", auth.user.uid)
      );

      this._unsubscribe = onSnapshot(q, (snapshot) => {
        this.files = snapshot.docs.map((d) => d.data() as BudgetFile);
        this.loading = false;
      });
    },

    unsubscribe() {
      this._unsubscribe?.();
      this._unsubscribe = null;
    },

    async uploadFile(rawFile: File) {
      const auth = useAuthStore();
      const aiStore = useAIStore();
      const accountsStore = useAccountsStore();
      const transactionsStore = useTransactionsStore();

      if (!auth.user) throw new Error("Not authenticated");

      const id = nanoid();
      const format = detectFormat(rawFile.name) as FileFormat;
      const storagePath = `users/${auth.user.uid}/files/${id}_${rawFile.name}`;

      // Create initial record
      const fileDoc: BudgetFile = {
        id,
        name: rawFile.name,
        format,
        status: "uploading",
        size: rawFile.size,
        uploadedAt: new Date().toISOString(),
      };

      console.log("[uploadFile] Writing file record to Firestore:", id);
      await setDoc(doc(db, "files", id), { ...fileDoc, uid: auth.user.uid });

      // Upload to storage
      console.log("[uploadFile] Uploading to Storage:", storagePath);
      const fileRef = storageRef(storage, storagePath);
      await uploadBytes(fileRef, rawFile);
      console.log("[uploadFile] Storage upload complete");

      // Update status to processing
      await setDoc(
        doc(db, "files", id),
        { status: "processing", storagePath },
        { merge: true }
      );

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
                // Reuse existing account — update balance and add this file
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
                // Create new account
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

            // Save transactions — IDs are deterministic to prevent duplicates on re-upload
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

            // Update file doc — strip undefined fields before writing to Firestore
            const extractedData = Object.fromEntries(
              Object.entries(extracted).filter(([, v]) => v !== undefined)
            );
            await setDoc(
              doc(db, "files", id),
              {
                status: "ready",
                extractedData,
                ...(statementYear !== undefined && { statementYear }),
                ...(statementMonth !== undefined && { statementMonth }),
                ...(accountId !== undefined && { accountId }),
              },
              { merge: true }
            );
          } else {
            await setDoc(
              doc(db, "files", id),
              { status: "ready" },
              { merge: true }
            );
          }
        } catch (err) {
          console.error("AI extraction failed:", err);
          await setDoc(
            doc(db, "files", id),
            {
              status: "error",
              error:
                err instanceof Error ? err.message : "AI extraction failed",
            },
            { merge: true }
          );
        }
      } else {
        await setDoc(
          doc(db, "files", id),
          { status: "ready" },
          { merge: true }
        );
      }
    },

    async getDownloadUrl(fileId: string): Promise<string> {
      const file = this.byId[fileId]
      if (!file?.storagePath) throw new Error('No storage path for file')
      const fileRef = storageRef(storage, file.storagePath)
      return getDownloadURL(fileRef)
    },

    async deleteFile(fileId: string) {
      const file = this.byId[fileId];
      if (!file) return;

      // Delete from storage
      if (file.storagePath) {
        try {
          const fileRef = storageRef(storage, file.storagePath);
          await deleteObject(fileRef);
        } catch {
          // Ignore if not found
        }
      }

      // Delete from Firestore
      await deleteDoc(doc(db, "files", fileId));

      // Delete associated transactions
      const transactionsStore = useTransactionsStore();
      await transactionsStore.deleteByFileId(fileId);
    },
  },
});
