import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { router, protectedProcedure } from "../trpc";
import { db } from "../../db";
import { files, transactions } from "../../db/schema";
import { deleteFile } from "../../storage";

export const filesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return db.select().from(files).where(eq(files.userId, ctx.userId));
  }),

  create: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        format: z.enum(["csv", "pdf", "unknown"]),
        size: z.number(),
        uploadedAt: z.string(),
        storagePath: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await db.insert(files).values({
        ...input,
        userId: ctx.userId,
        status: "uploading",
        storagePath: input.storagePath ?? null,
      });
      return { id: input.id };
    }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["uploading", "processing", "ready", "error"]),
        storagePath: z.string().optional(),
        error: z.string().optional(),
        extractedData: z.any().optional(),
        statementYear: z.number().optional(),
        statementMonth: z.number().optional(),
        accountId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;
      const data: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) data[key] = value;
      }

      await db
        .update(files)
        .set(data)
        .where(and(eq(files.id, id), eq(files.userId, ctx.userId)));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Get the file to find storage path
      const [file] = await db
        .select()
        .from(files)
        .where(and(eq(files.id, input.id), eq(files.userId, ctx.userId)));

      if (!file) return;

      // Delete from storage
      if (file.storagePath) {
        try {
          await deleteFile(file.storagePath);
        } catch {
          // Ignore if not found
        }
      }

      // Delete associated transactions
      await db
        .delete(transactions)
        .where(
          and(
            eq(transactions.fileId, input.id),
            eq(transactions.userId, ctx.userId),
          ),
        );

      // Delete file record
      await db
        .delete(files)
        .where(and(eq(files.id, input.id), eq(files.userId, ctx.userId)));
    }),
});
