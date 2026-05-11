import { z } from "zod";
import { eq, and } from "drizzle-orm";
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
} from "plaid";
import { router, protectedProcedure } from "../trpc";
import { db } from "../../db";
import {
  financialAccounts,
  transactions,
  plaidItems,
  plaidSecrets,
} from "../../db/schema";
import { nanoid } from "../../lib/nanoid";

function getPlaidClient(): PlaidApi {
  const clientId = process.env.PLAID_CLIENT_ID;
  const secret = process.env.PLAID_SECRET;
  const env = (process.env.PLAID_ENV ?? "sandbox") as keyof typeof PlaidEnvironments;

  if (!clientId || !secret) {
    throw new Error("Plaid credentials are not configured");
  }

  const config = new Configuration({
    basePath: PlaidEnvironments[env],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": clientId,
        "PLAID-SECRET": secret,
      },
    },
  });

  return new PlaidApi(config);
}

function mapPlaidAccountType(type: string, subtype: string): string {
  if (type === "credit") return "credit_card";
  if (type === "loan") {
    if (subtype === "mortgage") return "mortgage";
    return "loan";
  }
  if (type === "investment") return "investment";
  if (subtype === "savings") return "savings";
  return "checking";
}

function mapPlaidCategory(plaidCategory: string): string {
  const map: Record<string, string> = {
    FOOD_AND_DRINK: "Food & Dining",
    TRAVEL: "Travel",
    TRANSPORTATION: "Transportation",
    RENT_AND_UTILITIES: "Housing",
    ENTERTAINMENT: "Entertainment",
    GENERAL_MERCHANDISE: "Shopping",
    PERSONAL_CARE: "Health & Wellness",
    MEDICAL: "Healthcare",
    LOAN_PAYMENTS: "Debt Payments",
    BANK_FEES: "Fees & Charges",
    GENERAL_SERVICES: "Services",
    GOVERNMENT_AND_NON_PROFIT: "Other",
    HOME_IMPROVEMENT: "Home",
    INCOME: "Income",
    TRANSFER_IN: "Internal Transfer",
    TRANSFER_OUT: "Internal Transfer",
  };
  return map[plaidCategory] ?? "Other";
}

async function syncPlaidItemData(
  userId: string,
  itemId: string,
  accessToken: string,
): Promise<void> {
  const plaid = getPlaidClient();

  try {
    // Fetch accounts and balances
    const accountsResponse = await plaid.accountsGet({ access_token: accessToken });
    const plaidAccounts = accountsResponse.data.accounts;

    const plaidAccountIdToDbId: Record<string, string> = {};

    for (const pa of plaidAccounts) {
      // Look for existing account with this plaid account ID
      const [existing] = await db
        .select()
        .from(financialAccounts)
        .where(
          and(
            eq(financialAccounts.userId, userId),
            eq(financialAccounts.plaidAccountId, pa.account_id),
          ),
        );

      const dbId = existing?.id ?? nanoid();
      plaidAccountIdToDbId[pa.account_id] = dbId;

      const balance = pa.balances.current ?? pa.balances.available ?? 0;
      const accountType = mapPlaidAccountType(pa.type, pa.subtype ?? "");

      const accountData = {
        id: dbId,
        userId,
        name: pa.name,
        type: accountType as any,
        balance,
        currency: (pa.balances.iso_currency_code ?? "USD").toUpperCase(),
        lastUpdated: new Date().toISOString(),
        fileIds: existing?.fileIds ?? [],
        plaidAccountId: pa.account_id,
        plaidItemId: itemId,
        source: "plaid" as const,
        accountNumber: pa.mask ?? null,
      };

      if (existing) {
        await db
          .update(financialAccounts)
          .set(accountData)
          .where(eq(financialAccounts.id, dbId));
      } else {
        await db.insert(financialAccounts).values(accountData);
      }
    }

    // Fetch up to 24 months of transactions
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 730 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const txResponse = await plaid.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
      options: { count: 500, offset: 0 },
    });

    const plaidTxs = txResponse.data.transactions;

    if (plaidTxs.length > 0) {
      // Get existing plaid transaction IDs to skip duplicates
      const existingTxs = await db
        .select({ plaidTransactionId: transactions.plaidTransactionId })
        .from(transactions)
        .where(
          and(
            eq(transactions.userId, userId),
            eq(transactions.fileId, `plaid:${itemId}`),
          ),
        );

      const existingPlaidTxIds = new Set(
        existingTxs
          .map((t) => t.plaidTransactionId)
          .filter((id): id is string => id !== null),
      );

      const newTxs = plaidTxs.filter(
        (t) => !existingPlaidTxIds.has(t.transaction_id),
      );

      if (newTxs.length > 0) {
        const rows = newTxs
          .map((pt) => {
            const accountDbId = plaidAccountIdToDbId[pt.account_id];
            if (!accountDbId) return null;

            return {
              id: nanoid(),
              userId,
              accountId: accountDbId,
              fileId: `plaid:${itemId}`,
              date: pt.date,
              description: pt.name,
              amount: Math.abs(pt.amount),
              type: (pt.amount > 0 ? "debit" : "credit") as "debit" | "credit",
              category: mapPlaidCategory(
                pt.personal_finance_category?.primary ?? "",
              ),
              pending: pt.pending,
              plaidTransactionId: pt.transaction_id,
              source: "plaid" as const,
            };
          })
          .filter((r): r is NonNullable<typeof r> => r !== null);

        if (rows.length > 0) {
          await db.insert(transactions).values(rows);
        }
      }
    }

    // Mark item as active
    await db
      .update(plaidItems)
      .set({
        status: "active",
        lastSync: new Date().toISOString(),
        error: null,
      })
      .where(eq(plaidItems.id, itemId));
  } catch (err) {
    console.error(`Plaid sync failed for item ${itemId}:`, err);
    await db
      .update(plaidItems)
      .set({
        status: "error",
        error: err instanceof Error ? err.message : "Sync failed",
      })
      .where(eq(plaidItems.id, itemId));
    throw err;
  }
}

export const plaidRouter = router({
  listItems: protectedProcedure.query(async ({ ctx }) => {
    return db
      .select()
      .from(plaidItems)
      .where(eq(plaidItems.userId, ctx.userId));
  }),

  createLinkToken: protectedProcedure.mutation(async ({ ctx }) => {
    const plaid = getPlaidClient();
    const response = await plaid.linkTokenCreate({
      user: { client_user_id: ctx.userId },
      client_name: "Budget",
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    });

    return { linkToken: response.data.link_token };
  }),

  exchangePublicToken: protectedProcedure
    .input(
      z.object({
        publicToken: z.string(),
        institutionId: z.string(),
        institutionName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const plaid = getPlaidClient();

      // Exchange public token for access token
      const exchangeResponse = await plaid.itemPublicTokenExchange({
        public_token: input.publicToken,
      });
      const accessToken = exchangeResponse.data.access_token;
      const itemId = exchangeResponse.data.item_id;

      // Store access token (server-only)
      await db.insert(plaidSecrets).values({
        itemId,
        userId: ctx.userId,
        accessToken,
      });

      // Save item metadata
      await db.insert(plaidItems).values({
        id: itemId,
        userId: ctx.userId,
        institutionId: input.institutionId || "",
        institutionName: input.institutionName || "Unknown Bank",
        lastSync: null,
        status: "pending",
      });

      // Sync initial data
      await syncPlaidItemData(ctx.userId, itemId, accessToken);

      return { itemId };
    }),

  syncItem: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const [item] = await db
        .select()
        .from(plaidItems)
        .where(
          and(
            eq(plaidItems.id, input.itemId),
            eq(plaidItems.userId, ctx.userId),
          ),
        );

      if (!item) throw new Error("Plaid item not found");

      // Get access token
      const [secret] = await db
        .select()
        .from(plaidSecrets)
        .where(eq(plaidSecrets.itemId, input.itemId));

      if (!secret) throw new Error("Plaid item credentials not found");

      await syncPlaidItemData(ctx.userId, input.itemId, secret.accessToken);
      return { ok: true };
    }),

  removeItem: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const [item] = await db
        .select()
        .from(plaidItems)
        .where(
          and(
            eq(plaidItems.id, input.itemId),
            eq(plaidItems.userId, ctx.userId),
          ),
        );

      if (!item) throw new Error("Plaid item not found");

      // Revoke access token at Plaid
      try {
        const [secret] = await db
          .select()
          .from(plaidSecrets)
          .where(eq(plaidSecrets.itemId, input.itemId));

        if (secret) {
          const plaid = getPlaidClient();
          await plaid.itemRemove({ access_token: secret.accessToken });
        }
      } catch {
        console.warn(`Failed to revoke Plaid access token for item ${input.itemId}`);
      }

      // Cascade delete handles plaidSecrets via FK
      await db.delete(plaidItems).where(eq(plaidItems.id, input.itemId));

      return { ok: true };
    }),
});
