import { createAuthClient } from "better-auth/vue";

const serverUrl = import.meta.env.VITE_SERVER_URL || "";

export const authClient = createAuthClient({
  baseURL: `${serverUrl}/api/auth`,
});
