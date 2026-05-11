import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { router, protectedProcedure } from "../trpc";
import { db } from "../../db";
import { transactions } from "../../db/schema";

const transactionInput = z.object({
  id: z.string(),
  accountId: z.string(),
  fileId: z.string(),
  date: z.string(),
  description: z.string(),
  amount: z.number(),
  type: z.enum(["debit", "credit"]),
  category: z.string().default("Other"),
  notes: z.string().nullish(),
  pending: z.boolean().default(false),
  ignore: z.boolean().default(false),
  plaidTransactionId: z.string().nullish(),
  source: z.enum(["manual", "plaid"]).default("manual"),
});

export const transactionsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, ctx.userId));
  }),

  addBatch: protectedProcedure
    .input(z.array(transactionInput))
    .mutation(async ({ ctx, input }) => {
      if (input.length === 0) return;

      const rows = input.map((tx) => ({
        ...tx,
        userId: ctx.userId,
        notes: tx.notes ?? null,
        plaidTransactionId: tx.plaidTransactionId ?? null,
      }));

      await db
        .insert(transactions)
        .values(rows)
        .onConflictDoNothing({ target: transactions.id });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        category: z.string().optional(),
        ignore: z.boolean().optional(),
        notes: z.string().nullish(),
        description: z.string().optional(),
        amount: z.number().optional(),
        type: z.enum(["debit", "credit"]).optional(),
        date: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;
      const data: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) data[key] = value;
      }
      if (Object.keys(data).length === 0) return;

      await db
        .update(transactions)
        .set(data)
        .where(
          and(eq(transactions.id, id), eq(transactions.userId, ctx.userId)),
        );
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(transactions)
        .where(
          and(
            eq(transactions.id, input.id),
            eq(transactions.userId, ctx.userId),
          ),
        );
    }),

  deleteByFileId: protectedProcedure
    .input(z.object({ fileId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(transactions)
        .where(
          and(
            eq(transactions.fileId, input.fileId),
            eq(transactions.userId, ctx.userId),
          ),
        );
    }),
});
