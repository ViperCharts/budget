// ─── Account Types ───────────────────────────────────────────────────────────

export type AccountType =
  | 'checking'
  | 'savings'
  | 'credit_card'
  | 'loan'
  | 'mortgage'
  | 'investment'
  | 'other'

export interface Account {
  id: string
  name: string
  type: AccountType
  balance: number
  /** For credit cards */
  interestRate?: number
  /** Credit limit for credit cards */
  creditLimit?: number
  currency: string
  lastUpdated: string // ISO date
  fileIds: string[]
}

// ─── Transaction Types ────────────────────────────────────────────────────────

export type TransactionType = 'debit' | 'credit'

export interface Transaction {
  id: string
  accountId: string
  fileId: string
  date: string // ISO date
  description: string
  amount: number
  type: TransactionType
  category: string
  notes?: string
  pending?: boolean
}

// ─── Category Types ───────────────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  color: string
  emoji?: string
  icon?: string
  budgetLimit?: number
  parentId?: string
  /** True for user-created categories (synced to Firestore) */
  isCustom?: boolean
}

// ─── Budget Types ─────────────────────────────────────────────────────────────

export interface BudgetItem {
  id: string
  categoryId: string
  monthlyLimit: number
  /** Year-Month: "2024-01" */
  period: string
}

// ─── File Types ───────────────────────────────────────────────────────────────

export type FileStatus = 'uploading' | 'processing' | 'ready' | 'error'
export type FileFormat = 'csv' | 'pdf' | 'unknown'

export interface BudgetFile {
  id: string
  name: string
  format: FileFormat
  status: FileStatus
  size: number
  uploadedAt: string // ISO date
  /** The year/month extracted from the statement */
  statementYear?: number
  statementMonth?: number
  accountId?: string
  /** Storage path in Firebase Storage */
  storagePath?: string
  /** Error message if status is 'error' */
  error?: string
  /** AI-extracted metadata */
  extractedData?: ExtractedFileData
}

export interface ExtractedFileData {
  accountName?: string
  accountType?: AccountType
  accountNumber?: string
  statementDate?: string
  openingBalance?: number
  closingBalance?: number
  transactions: Partial<Transaction>[]
  interestRate?: number
  creditLimit?: number
}

// ─── AI Types ────────────────────────────────────────────────────────────────

export type AIProvider = 'anthropic' | 'openai'

export interface AISettings {
  provider: AIProvider
  apiKey: string
  model: string
}

// ─── User Types ───────────────────────────────────────────────────────────────

export interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

// ─── Dashboard Types ──────────────────────────────────────────────────────────

export interface MonthlySpending {
  /** "2024-01" */
  period: string
  total: number
  byCategory: Record<string, number>
}

export interface NetWorthPoint {
  /** "2024-01" */
  period: string
  netWorth: number
  assets: number
  liabilities: number
}
