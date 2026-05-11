import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { router, protectedProcedure } from "../trpc";
import { db } from "../../db";
import { financialAccounts } from "../../db/schema";

const accountTypeValues = [
  "checking",
  "savings",
  "credit_card",
  "auto_loan",
  "mortgage",
  "personal_loan",
  "investment",
  "roth_ira",
  "traditional_ira",
  "roth_401k",
  "traditional_401k",
  "crypto",
  "loan",
  "other",
] as const;

const upsertInput = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(accountTypeValues),
  balance: z.number(),
  currency: z.string().default("USD"),
  lastUpdated: z.string(),
  fileIds: z.array(z.string()).default([]),
  accountNumber: z.string().nullish(),
  holderName: z.string().nullish(),
  interestRate: z.number().nullish(),
  apr: z.number().nullish(),
  apy: z.number().nullish(),
  creditLimit: z.number().nullish(),
  cryptoSymbol: z.string().nullish(),
  plaidAccountId: z.string().nullish(),
  plaidItemId: z.string().nullish(),
  source: z.enum(["manual", "plaid"]).default("manual"),
});

export const accountsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return db
      .select()
      .from(financialAccounts)
      .where(eq(financialAccounts.userId, ctx.userId));
  }),

  upsert: protectedProcedure.input(upsertInput).mutation(async ({ ctx, input }) => {
    const existing = await db
      .select()
      .from(financialAccounts)
      .where(
        and(
          eq(financialAccounts.id, input.id),
          eq(financialAccounts.userId, ctx.userId),
        ),
      );

    const data = {
      ...input,
      userId: ctx.userId,
      accountNumber: input.accountNumber ?? null,
      holderName: input.holderName ?? null,
      interestRate: input.interestRate ?? null,
      apr: input.apr ?? null,
      apy: input.apy ?? null,
      creditLimit: input.creditLimit ?? null,
      cryptoSymbol: input.cryptoSymbol ?? null,
      plaidAccountId: input.plaidAccountId ?? null,
      plaidItemId: input.plaidItemId ?? null,
    };

    if (existing.length > 0) {
      await db
        .update(financialAccounts)
        .set(data)
        .where(
          and(
            eq(financialAccounts.id, input.id),
            eq(financialAccounts.userId, ctx.userId),
          ),
        );
    } else {
      await db.insert(financialAccounts).values(data);
    }

    return data;
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(financialAccounts)
        .where(
          and(
            eq(financialAccounts.id, input.id),
            eq(financialAccounts.userId, ctx.userId),
          ),
        );
    }),

  updateBalance: protectedProcedure
    .input(z.object({ id: z.string(), balance: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .update(financialAccounts)
        .set({ balance: input.balance, lastUpdated: new Date().toISOString() })
        .where(
          and(
            eq(financialAccounts.id, input.id),
            eq(financialAccounts.userId, ctx.userId),
          ),
        );
    }),
});
