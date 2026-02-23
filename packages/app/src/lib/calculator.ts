import type { Transaction, Category } from '@/types'
import { dateToPeriod } from './currency'

/**
 * Category lookup map: lowercased category name → Category.
 * Matches the shape of `useCategoriesStore().byName`.
 */
export type CategoryMap = Record<string, Category>

export interface TransactionFilters {
  /** Only include transactions from this period ("YYYY-MM"). */
  period?: string
  /** Search string matched (case-insensitive) against description and category name. */
  search?: string
  /** Restrict to a single account by ID. */
  accountId?: string
  /** Restrict to a single category by exact name. */
  category?: string
  /** Restrict to "debit" (expense) or "credit" (income) transactions. */
  type?: 'debit' | 'credit'
  /**
   * When true, ignored transactions are included in the output list so they can
   * be rendered in the UI (e.g. with a strikethrough style).
   *
   * Ignored transactions are NEVER counted in `sumIncome` / `sumExpenses`
   * regardless of this flag.
   *
   * Defaults to false.
   */
  showIgnored?: boolean
  /**
   * When true (default), transactions whose category is marked `isInternalTransfer`
   * are removed from the result. Set to false in the transaction list view where
   * internal transfers should be visible.
   *
   * Defaults to true.
   */
  excludeInternalTransfers?: boolean
}

/**
 * Filter a list of transactions.
 *
 * By default:
 * - Internal-transfer categories are excluded (set `excludeInternalTransfers: false` to show them).
 * - Ignored transactions are excluded (set `showIgnored: true` to show them).
 *
 * Optional filters: period, search text, account, category, type.
 */
export function filterTransactions(
  transactions: Transaction[],
  categories: CategoryMap,
  filters: TransactionFilters = {},
): Transaction[] {
  const {
    period,
    search,
    accountId,
    category,
    type,
    showIgnored = false,
    excludeInternalTransfers = true,
  } = filters
  const s = search?.toLowerCase() ?? ''

  return transactions.filter((t) => {
    const cat = categories[t.category.toLowerCase()]
    if (excludeInternalTransfers && cat?.isInternalTransfer) return false
    if (t.ignore && !showIgnored) return false
    if (s && !t.description.toLowerCase().includes(s) && !t.category.toLowerCase().includes(s))
      return false
    if (accountId && t.accountId !== accountId) return false
    if (category && t.category !== category) return false
    if (type && t.type !== type) return false
    if (period && dateToPeriod(t.date) !== period) return false
    return true
  })
}

/**
 * Calculate net spending by category name from a list of transactions.
 *
 * - Debit transactions contribute positively (spending).
 * - Credit transactions contribute negatively (refunds that reduce net spending).
 * - Categories where credits exceed debits (net ≤ 0) are omitted from the result.
 *
 * The input should be a pre-filtered list with internal transfers and ignored
 * transactions already removed (e.g. the output of `filterTransactions` with
 * default options).
 */
export function calculateCategorySpending(
  transactions: Transaction[],
): Record<string, number> {
  const byCategory: Record<string, number> = {}
  for (const tx of transactions) {
    const delta = tx.type === 'debit' ? tx.amount : -tx.amount
    byCategory[tx.category] = (byCategory[tx.category] ?? 0) + delta
  }
  // Drop categories where refunds exceed spending (net ≤ 0)
  for (const cat of Object.keys(byCategory)) {
    if (byCategory[cat] <= 0) delete byCategory[cat]
  }
  return byCategory
}

/**
 * Sum total net spending across all category buckets.
 */
export function sumCategorySpending(byCategory: Record<string, number>): number {
  return Object.values(byCategory).reduce((s, v) => s + v, 0)
}

/**
 * Sum total income from a transaction list.
 * Only counts credit transactions; always skips ignored transactions.
 */
export function sumIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'credit' && !t.ignore)
    .reduce((s, t) => s + t.amount, 0)
}

/**
 * Sum total expenses from a transaction list.
 * Only counts debit transactions; always skips ignored transactions.
 */
export function sumExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'debit' && !t.ignore)
    .reduce((s, t) => s + t.amount, 0)
}
