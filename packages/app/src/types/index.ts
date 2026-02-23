// ─── Account Types ───────────────────────────────────────────────────────────

export type AccountType =
  | "checking"
  | "savings"
  | "credit_card"
  | "loan"
  | "mortgage"
  | "investment"
  | "other";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  /** Last 4 digits of account number, used for deduplication */
  accountNumber?: string;
  /** Name of the account holder */
  holderName?: string;
  /** For credit cards */
  interestRate?: number;
  /** Credit limit for credit cards */
  creditLimit?: number;
  currency: string;
  lastUpdated: string; // ISO date
  fileIds: string[];
}

// ─── Transaction Types ────────────────────────────────────────────────────────

export type TransactionType = "debit" | "credit";

export interface Transaction {
  id: string;
  accountId: string;
  fileId: string;
  date: string; // ISO date
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  notes?: string;
  pending?: boolean;
}

// ─── Category Types ───────────────────────────────────────────────────────────

export interface Category {
  id: string;
  /** Category label — plain text only, no emoji embedded */
  name: string;
  /** Hex color string, e.g. "#f59e0b" */
  color: string;
  /** Single emoji character representing the category, e.g. "🛒" */
  emoji?: string;
  budgetLimit?: number;
  parentId?: string;
  /** True for user-created categories (synced to Firestore) */
  isCustom?: boolean;
  description?: string;
  /**
   * True for the built-in "Internal Transfer" category.
   * Transactions in this category represent money moving between the user's
   * own accounts (e.g. checking → savings, credit-card payment) and should
   * be excluded from spending/budget calculations.
   */
  isInternalTransfer?: boolean;
}

// ─── Budget Types ─────────────────────────────────────────────────────────────

export interface BudgetItem {
  id: string;
  categoryId: string;
  monthlyLimit: number;
  /** Year-Month: "2024-01" */
  period: string;
}

// ─── File Types ───────────────────────────────────────────────────────────────

export type FileStatus = "uploading" | "processing" | "ready" | "error";
export type FileFormat = "csv" | "pdf" | "unknown";

export interface BudgetFile {
  id: string;
  name: string;
  format: FileFormat;
  status: FileStatus;
  size: number;
  uploadedAt: string; // ISO date
  /** The year/month extracted from the statement */
  statementYear?: number;
  statementMonth?: number;
  accountId?: string;
  /** Storage path in Firebase Storage */
  storagePath?: string;
  /** Error message if status is 'error' */
  error?: string;
  /** AI-extracted metadata */
  extractedData?: ExtractedFileData;
}

export interface ExtractedFileData {
  accountName?: string;
  accountType?: AccountType;
  accountNumber?: string;
  /** Account holder's full name */
  holderName?: string;
  statementDate?: string;
  openingBalance?: number;
  closingBalance?: number;
  transactions: Partial<Transaction>[];
  interestRate?: number;
  creditLimit?: number;
}

// ─── AI Types ────────────────────────────────────────────────────────────────

export type AIProvider = "anthropic" | "openai";

export interface AISettings {
  provider: AIProvider;
  apiKey: string;
  model: string;
}

// ─── User Types ───────────────────────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// ─── Dashboard Types ──────────────────────────────────────────────────────────

export interface MonthlySpending {
  /** "2024-01" */
  period: string;
  total: number;
  byCategory: Record<string, number>;
}

export interface NetWorthPoint {
  /** "2024-01" */
  period: string;
  netWorth: number;
  assets: number;
  liabilities: number;
}
