import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "hono";
import { auth } from "../auth";

export interface TRPCContext {
  userId: string | null;
  honoContext: Context;
  [key: string]: unknown;
}

export async function createContext(c: Context): Promise<TRPCContext> {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  return {
    userId: session?.user?.id ?? null,
    honoContext: c,
  };
}

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be signed in to perform this action",
    });
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});
