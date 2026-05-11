import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src/trpc/router";

const serverUrl = import.meta.env.VITE_SERVER_URL || "";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${serverUrl}/api/trpc`,
      fetch(url, options) {
        return fetch(url, { ...options, credentials: "include" });
      },
    }),
  ],
});
