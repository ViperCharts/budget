import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { router, protectedProcedure } from "../trpc";
import { db } from "../../db";
import { userCategories } from "../../db/schema";

export const categoriesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return db
      .select()
      .from(userCategories)
      .where(eq(userCategories.userId, ctx.userId));
  }),

  add: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        color: z.string(),
        emoji: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await db.insert(userCategories).values({
        id: input.id,
        userId: ctx.userId,
        name: input.name,
        color: input.color,
        emoji: input.emoji ?? null,
      });
      return { id: input.id };
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        color: z.string().optional(),
        emoji: z.string().optional(),
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
        .update(userCategories)
        .set(data)
        .where(
          and(
            eq(userCategories.id, id),
            eq(userCategories.userId, ctx.userId),
          ),
        );
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(userCategories)
        .where(
          and(
            eq(userCategories.id, input.id),
            eq(userCategories.userId, ctx.userId),
          ),
        );
    }),
});
