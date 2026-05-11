import { router } from "./trpc";
import { accountsRouter } from "./routers/accounts";
import { transactionsRouter } from "./routers/transactions";
import { filesRouter } from "./routers/files";
import { categoriesRouter } from "./routers/categories";
import { plaidRouter } from "./routers/plaid";

export const appRouter = router({
  accounts: accountsRouter,
  transactions: transactionsRouter,
  files: filesRouter,
  categories: categoriesRouter,
  plaid: plaidRouter,
});

export type AppRouter = typeof appRouter;
