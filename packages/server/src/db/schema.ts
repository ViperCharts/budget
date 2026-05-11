import {
  pgTable,
  text,
  integer,
  real,
  boolean,
  timestamp,
  jsonb,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";

// ── Auth tables (better-auth manages these, but we define them for Drizzle) ──

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const oauthAccounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// ── App tables ──

export const accountTypeEnum = pgEnum("account_type", [
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
]);

export const financialAccounts = pgTable("financial_accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: accountTypeEnum("type").notNull(),
  balance: real("balance").notNull().default(0),
  accountNumber: varchar("account_number", { length: 4 }),
  holderName: text("holder_name"),
  interestRate: real("interest_rate"),
  apr: real("apr"),
  apy: real("apy"),
  creditLimit: real("credit_limit"),
  cryptoSymbol: varchar("crypto_symbol", { length: 10 }),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  lastUpdated: text("last_updated").notNull(),
  fileIds: jsonb("file_ids").$type<string[]>().notNull().default([]),
  plaidAccountId: text("plaid_account_id"),
  plaidItemId: text("plaid_item_id"),
  source: varchar("source", { length: 10 }).default("manual"),
});

export const transactionTypeEnum = pgEnum("transaction_type", [
  "debit",
  "credit",
]);

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id")
    .notNull()
    .references(() => financialAccounts.id, { onDelete: "cascade" }),
  fileId: text("file_id").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
  amount: real("amount").notNull(),
  type: transactionTypeEnum("type").notNull(),
  category: text("category").notNull().default("Other"),
  notes: text("notes"),
  pending: boolean("pending").default(false),
  ignore: boolean("ignore").default(false),
  plaidTransactionId: text("plaid_transaction_id"),
  source: varchar("source", { length: 10 }).default("manual"),
});

export const fileStatusEnum = pgEnum("file_status", [
  "uploading",
  "processing",
  "ready",
  "error",
]);

export const fileFormatEnum = pgEnum("file_format", ["csv", "pdf", "unknown"]);

export const files = pgTable("files", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  format: fileFormatEnum("format").notNull(),
  status: fileStatusEnum("status").notNull().default("uploading"),
  size: integer("size").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
  statementYear: integer("statement_year"),
  statementMonth: integer("statement_month"),
  accountId: text("account_id"),
  storagePath: text("storage_path"),
  error: text("error"),
  extractedData: jsonb("extracted_data"),
});

export const userCategories = pgTable("user_categories", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: varchar("color", { length: 7 }).notNull(),
  emoji: text("emoji"),
});

export const plaidItems = pgTable("plaid_items", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  institutionId: text("institution_id").notNull().default(""),
  institutionName: text("institution_name").notNull().default("Unknown Bank"),
  lastSync: text("last_sync"),
  status: varchar("status", { length: 10 }).notNull().default("pending"),
  error: text("error"),
});

export const plaidSecrets = pgTable("plaid_secrets", {
  itemId: text("item_id")
    .primaryKey()
    .references(() => plaidItems.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token").notNull(),
});
