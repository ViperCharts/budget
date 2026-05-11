import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc/router";
import { createContext } from "./trpc/trpc";
import { auth } from "./auth";
import { saveFile } from "./storage";
import { getFilePath } from "./storage";
import { db } from "./db";
import { files, financialAccounts } from "./db/schema";
import { eq, and } from "drizzle-orm";

const app = new Hono();

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

// CORS
app.use(
  "*",
  cors({
    origin: clientUrl,
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

// Health check
app.get("/api/health", (c) => c.json({ ok: true }));

// better-auth routes
app.on(["GET", "POST"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

// File upload endpoint (multipart — can't go through tRPC)
app.post("/api/files/upload", async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const formData = await c.req.formData();
  const file = formData.get("file") as File | null;
  const fileId = formData.get("fileId") as string | null;

  if (!file || !fileId) {
    return c.json({ error: "file and fileId are required" }, 400);
  }

  const data = await file.arrayBuffer();
  const storagePath = await saveFile(session.user.id, fileId, file.name, data);

  return c.json({ storagePath });
});

// File download endpoint
app.get("/api/files/download/:userId/:filename", async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { userId, filename } = c.req.param();

  // Only allow users to download their own files
  if (userId !== session.user.id) {
    return c.json({ error: "Forbidden" }, 403);
  }

  try {
    const filePath = await getFilePath(`${userId}/${filename}`);
    const file = Bun.file(filePath);
    return new Response(file);
  } catch {
    return c.json({ error: "File not found" }, 404);
  }
});

// tRPC
app.use(
  "/api/trpc/*",
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: (_opts, c) => createContext(c),
  }),
);

const port = Number(process.env.PORT) || 3000;

export default {
  port,
  fetch: app.fetch,
};

console.log(`Server running at http://localhost:${port}`);
