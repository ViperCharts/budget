import { describe, it, expect } from 'vitest'
import {
  filterTransactions,
  calculateCategorySpending,
  sumCategorySpending,
  sumIncome,
  sumExpenses,
  type CategoryMap,
} from './calculator'
import type { Transaction, Category } from '@/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _id = 0
function makeTx(overrides: Partial<Transaction> & { amount: number; type: 'debit' | 'credit' }): Transaction {
  return {
    id: `tx-${++_id}`,
    accountId: 'acc-1',
    fileId: 'file-1',
    date: '2024-01-15',
    description: 'Test transaction',
    category: 'Food',
    ...overrides,
  }
}

function makeCat(name: string, opts: Partial<Category> = {}): Category {
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    color: '#aabbcc',
    ...opts,
  }
}

function catMap(...cats: Category[]): CategoryMap {
  return Object.fromEntries(cats.map((c) => [c.name.toLowerCase(), c]))
}

// Commonly reused categories
const food = makeCat('Food')
const groceries = makeCat('Groceries')
const transfer = makeCat('Internal Transfer', { isInternalTransfer: true })
const income = makeCat('Income')

const defaultCats: CategoryMap = catMap(food, groceries, transfer, income)

// ─── filterTransactions ────────────────────────────────────────────────────────

describe('filterTransactions', () => {
  describe('internal transfers', () => {
    it('always excludes transactions in an internal-transfer category', () => {
      const txs = [
        makeTx({ amount: 500, type: 'debit', category: 'Internal Transfer' }),
        makeTx({ amount: 100, type: 'debit', category: 'Food' }),
      ]
      const result = filterTransactions(txs, defaultCats)
      expect(result).toHaveLength(1)
      expect(result[0].category).toBe('Food')
    })

    it('excludes internal transfers even when showIgnored=true', () => {
      const txs = [
        makeTx({ amount: 500, type: 'debit', category: 'Internal Transfer', ignore: true }),
      ]
      const result = filterTransactions(txs, defaultCats, { showIgnored: true })
      expect(result).toHaveLength(0)
    })

    it('does not exclude transactions whose category is not in the map', () => {
      // Unknown categories are not internal transfers
      const txs = [makeTx({ amount: 50, type: 'debit', category: 'Unknown Category' })]
      const result = filterTransactions(txs, defaultCats)
      expect(result).toHaveLength(1)
    })

    it('does not exclude transactions in categories where isInternalTransfer is false', () => {
      const txs = [makeTx({ amount: 50, type: 'debit', category: 'Food' })]
      const result = filterTransactions(txs, defaultCats)
      expect(result).toHaveLength(1)
    })

    it('includes internal transfers when excludeInternalTransfers=false', () => {
      const txs = [
        makeTx({ amount: 500, type: 'debit', category: 'Internal Transfer' }),
        makeTx({ amount: 100, type: 'debit', category: 'Food' }),
      ]
      const result = filterTransactions(txs, defaultCats, { excludeInternalTransfers: false })
      expect(result).toHaveLength(2)
    })

    it('still excludes internal transfers by default (excludeInternalTransfers defaults to true)', () => {
      const txs = [makeTx({ amount: 500, type: 'debit', category: 'Internal Transfer' })]
      expect(filterTransactions(txs, defaultCats)).toHaveLength(0)
      expect(filterTransactions(txs, defaultCats, {})).toHaveLength(0)
    })
  })

  describe('ignored transactions', () => {
    it('excludes ignored transactions by default (showIgnored=false)', () => {
      const txs = [
        makeTx({ amount: 50, type: 'debit', ignore: true }),
        makeTx({ amount: 30, type: 'debit' }),
      ]
      const result = filterTransactions(txs, defaultCats)
      expect(result).toHaveLength(1)
      expect(result[0].amount).toBe(30)
    })

    it('includes ignored transactions when showIgnored=true', () => {
      const txs = [
        makeTx({ amount: 50, type: 'debit', ignore: true }),
        makeTx({ amount: 30, type: 'debit' }),
      ]
      const result = filterTransactions(txs, defaultCats, { showIgnored: true })
      expect(result).toHaveLength(2)
    })

    it('treats undefined ignore as non-ignored', () => {
      const txs = [makeTx({ amount: 50, type: 'debit', ignore: undefined })]
      const result = filterTransactions(txs, defaultCats)
      expect(result).toHaveLength(1)
    })
  })

  describe('period filter', () => {
    it('only returns transactions matching the active period', () => {
      const txs = [
        makeTx({ amount: 50, type: 'debit', date: '2024-01-10' }),
        makeTx({ amount: 80, type: 'debit', date: '2024-02-05' }),
        makeTx({ amount: 30, type: 'debit', date: '2024-01-31' }),
      ]
      const result = filterTransactions(txs, defaultCats, { period: '2024-01' })
      expect(result).toHaveLength(2)
      result.forEach((t) => expect(t.date.startsWith('2024-01')).toBe(true))
    })

    it('returns no transactions when the period has no matches', () => {
      const txs = [makeTx({ amount: 50, type: 'debit', date: '2024-01-10' })]
      const result = filterTransactions(txs, defaultCats, { period: '2024-03' })
      expect(result).toHaveLength(0)
    })

    it('returns all transactions when period is not specified', () => {
      const txs = [
        makeTx({ amount: 50, type: 'debit', date: '2024-01-10' }),
        makeTx({ amount: 80, type: 'debit', date: '2024-02-05' }),
      ]
      const result = filterTransactions(txs, defaultCats)
      expect(result).toHaveLength(2)
    })
  })

  describe('search filter', () => {
    it('filters by description (case-insensitive)', () => {
      const txs = [
        makeTx({ amount: 50, type: 'debit', description: 'AMAZON PURCHASE' }),
        makeTx({ amount: 30, type: 'debit', description: 'Starbucks Coffee' }),
      ]
      const result = filterTransactions(txs, defaultCats, { search: 'amazon' })
      expect(result).toHaveLength(1)
      expect(result[0].description).toBe('AMAZON PURCHASE')
    })

    it('filters by category name (case-insensitive)', () => {
      const txs = [
        makeTx({ amount: 50, type: 'debit', category: 'Food' }),
        makeTx({ amount: 30, type: 'debit', category: 'Groceries' }),
      ]
      const result = filterTransactions(txs, defaultCats, { search: 'grocer' })
      expect(result).toHaveLength(1)
      expect(result[0].category).toBe('Groceries')
    })

    it('returns all transactions when search is empty string', () => {
      const txs = [
        makeTx({ amount: 50, type: 'debit' }),
        makeTx({ amount: 30, type: 'debit' }),
      ]
      const result = filterTransactions(txs, defaultCats, { search: '' })
      expect(result).toHaveLength(2)
    })

    it('matches on description OR category — either is sufficient', () => {
      const txs = [
        makeTx({ amount: 50, type: 'debit', description: 'starbucks', category: 'Food' }),
        makeTx({ amount: 30, type: 'debit', description: 'Groceries store', category: 'Food' }),
      ]
      // "food" matches the category of both, not the descriptions
      const result = filterTransactions(txs, defaultCats, { search: 'food' })
      expect(result).toHaveLength(2)
    })
  })

  describe('accountId filter', () => {
    it('only returns transactions for the given account', () => {
      const txs = [
        makeTx({ amount: 50, type: 'debit', accountId: 'acc-1' }),
        makeTx({ amount: 30, type: 'debit', accountId: 'acc-2' }),
        makeTx({ amount: 20, type: 'debit', accountId: 'acc-1' }),
      ]
      const result = filterTransactions(txs, defaultCats, { accountId: 'acc-1' })
      expect(result).toHaveLength(2)
      result.forEach((t) => expect(t.accountId).toBe('acc-1'))
    })
  })

  describe('category filter', () => {
    it('only returns transactions with the exact category name', () => {
      const txs = [
        makeTx({ amount: 50, type: 'debit', category: 'Food' }),
        makeTx({ amount: 30, type: 'debit', category: 'Groceries' }),
        makeTx({ amount: 20, type: 'debit', category: 'Food' }),
      ]
      const result = filterTransactions(txs, defaultCats, { category: 'Food' })
      expect(result).toHaveLength(2)
      result.forEach((t) => expect(t.category).toBe('Food'))
    })
  })

  describe('type filter', () => {
    it('only returns debit transactions when type="debit"', () => {
      const txs = [
        makeTx({ amount: 100, type: 'credit', category: 'Income' }),
        makeTx({ amount: 50, type: 'debit' }),
        makeTx({ amount: 80, type: 'debit' }),
      ]
      const result = filterTransactions(txs, defaultCats, { type: 'debit' })
      expect(result).toHaveLength(2)
      result.forEach((t) => expect(t.type).toBe('debit'))
    })

    it('only returns credit transactions when type="credit"', () => {
      const txs = [
        makeTx({ amount: 100, type: 'credit', category: 'Income' }),
        makeTx({ amount: 50, type: 'debit' }),
      ]
      const result = filterTransactions(txs, defaultCats, { type: 'credit' })
      expect(result).toHaveLength(1)
      expect(result[0].type).toBe('credit')
    })
  })

  describe('combined filters', () => {
    it('applies all active filters simultaneously', () => {
      const txs = [
        // Matches period + account + category
        makeTx({ amount: 50, type: 'debit', date: '2024-01-10', accountId: 'acc-1', category: 'Food' }),
        // Wrong period
        makeTx({ amount: 30, type: 'debit', date: '2024-02-05', accountId: 'acc-1', category: 'Food' }),
        // Wrong account
        makeTx({ amount: 20, type: 'debit', date: '2024-01-15', accountId: 'acc-2', category: 'Food' }),
        // Wrong category
        makeTx({ amount: 40, type: 'debit', date: '2024-01-20', accountId: 'acc-1', category: 'Groceries' }),
      ]
      const result = filterTransactions(txs, defaultCats, {
        period: '2024-01',
        accountId: 'acc-1',
        category: 'Food',
      })
      expect(result).toHaveLength(1)
      expect(result[0].amount).toBe(50)
    })

    it('excludes internal transfers even when they match all other filters', () => {
      const txs = [
        makeTx({
          amount: 500,
          type: 'debit',
          date: '2024-01-10',
          accountId: 'acc-1',
          category: 'Internal Transfer',
        }),
      ]
      const result = filterTransactions(txs, defaultCats, {
        period: '2024-01',
        accountId: 'acc-1',
      })
      expect(result).toHaveLength(0)
    })
  })

  describe('empty inputs', () => {
    it('returns empty array for empty transaction list', () => {
      expect(filterTransactions([], defaultCats)).toEqual([])
    })

    it('works with an empty category map (no internal transfers detected)', () => {
      const txs = [makeTx({ amount: 50, type: 'debit' })]
      const result = filterTransactions(txs, {})
      expect(result).toHaveLength(1)
    })
  })
})

// ─── calculateCategorySpending ────────────────────────────────────────────────

describe('calculateCategorySpending', () => {
  it('returns empty object for no transactions', () => {
    expect(calculateCategorySpending([])).toEqual({})
  })

  it('counts a single debit as positive spending', () => {
    const txs = [makeTx({ amount: 50, type: 'debit', category: 'Food' })]
    expect(calculateCategorySpending(txs)).toEqual({ Food: 50 })
  })

  it('accumulates multiple debits in the same category', () => {
    const txs = [
      makeTx({ amount: 30, type: 'debit', category: 'Food' }),
      makeTx({ amount: 20, type: 'debit', category: 'Food' }),
    ]
    expect(calculateCategorySpending(txs)).toEqual({ Food: 50 })
  })

  it('credits reduce net spending (refunds)', () => {
    const txs = [
      makeTx({ amount: 100, type: 'debit', category: 'Food' }),
      makeTx({ amount: 30, type: 'credit', category: 'Food' }),
    ]
    expect(calculateCategorySpending(txs)).toEqual({ Food: 70 })
  })

  it('omits category when credit exactly offsets debit (net = 0)', () => {
    const txs = [
      makeTx({ amount: 50, type: 'debit', category: 'Food' }),
      makeTx({ amount: 50, type: 'credit', category: 'Food' }),
    ]
    expect(calculateCategorySpending(txs)).toEqual({})
  })

  it('omits category when credits exceed debits (net < 0)', () => {
    const txs = [
      makeTx({ amount: 20, type: 'debit', category: 'Food' }),
      makeTx({ amount: 80, type: 'credit', category: 'Food' }),
    ]
    expect(calculateCategorySpending(txs)).toEqual({})
  })

  it('handles multiple categories independently', () => {
    const txs = [
      makeTx({ amount: 100, type: 'debit', category: 'Food' }),
      makeTx({ amount: 200, type: 'debit', category: 'Groceries' }),
      makeTx({ amount: 40, type: 'credit', category: 'Food' }),
    ]
    const result = calculateCategorySpending(txs)
    expect(result).toEqual({ Food: 60, Groceries: 200 })
  })

  it('preserves category name casing from the transaction', () => {
    const txs = [makeTx({ amount: 25, type: 'debit', category: 'Eating Out' })]
    const result = calculateCategorySpending(txs)
    expect(result['Eating Out']).toBe(25)
  })

  it('does NOT subtract ignored transactions — caller must pre-filter', () => {
    // calculateCategorySpending trusts its input; filtering is the caller's job
    const txs = [
      makeTx({ amount: 100, type: 'debit', category: 'Food' }),
      makeTx({ amount: 50, type: 'debit', category: 'Food', ignore: true }),
    ]
    // Without pre-filtering, ignored tx is included
    expect(calculateCategorySpending(txs)).toEqual({ Food: 150 })
  })
})

// ─── sumCategorySpending ──────────────────────────────────────────────────────

describe('sumCategorySpending', () => {
  it('returns 0 for empty object', () => {
    expect(sumCategorySpending({})).toBe(0)
  })

  it('sums all category amounts', () => {
    expect(sumCategorySpending({ Food: 100, Groceries: 200, Entertainment: 50 })).toBe(350)
  })

  it('handles a single category', () => {
    expect(sumCategorySpending({ Food: 75 })).toBe(75)
  })
})

// ─── sumIncome ────────────────────────────────────────────────────────────────

describe('sumIncome', () => {
  it('returns 0 for empty list', () => {
    expect(sumIncome([])).toBe(0)
  })

  it('sums only credit transactions', () => {
    const txs = [
      makeTx({ amount: 1000, type: 'credit', category: 'Income' }),
      makeTx({ amount: 500, type: 'credit', category: 'Income' }),
      makeTx({ amount: 200, type: 'debit' }),
    ]
    expect(sumIncome(txs)).toBe(1500)
  })

  it('ignores transactions with ignore=true even if type=credit', () => {
    const txs = [
      makeTx({ amount: 1000, type: 'credit', category: 'Income' }),
      makeTx({ amount: 500, type: 'credit', category: 'Income', ignore: true }),
    ]
    expect(sumIncome(txs)).toBe(1000)
  })

  it('returns 0 when all credits are ignored', () => {
    const txs = [
      makeTx({ amount: 1000, type: 'credit', ignore: true }),
      makeTx({ amount: 500, type: 'credit', ignore: true }),
    ]
    expect(sumIncome(txs)).toBe(0)
  })

  it('returns 0 when there are no credit transactions', () => {
    const txs = [makeTx({ amount: 50, type: 'debit' })]
    expect(sumIncome(txs)).toBe(0)
  })
})

// ─── sumExpenses ──────────────────────────────────────────────────────────────

describe('sumExpenses', () => {
  it('returns 0 for empty list', () => {
    expect(sumExpenses([])).toBe(0)
  })

  it('sums only debit transactions', () => {
    const txs = [
      makeTx({ amount: 50, type: 'debit' }),
      makeTx({ amount: 30, type: 'debit' }),
      makeTx({ amount: 1000, type: 'credit', category: 'Income' }),
    ]
    expect(sumExpenses(txs)).toBe(80)
  })

  it('ignores transactions with ignore=true even if type=debit', () => {
    const txs = [
      makeTx({ amount: 50, type: 'debit' }),
      makeTx({ amount: 200, type: 'debit', ignore: true }),
    ]
    expect(sumExpenses(txs)).toBe(50)
  })

  it('returns 0 when all debits are ignored', () => {
    const txs = [
      makeTx({ amount: 50, type: 'debit', ignore: true }),
      makeTx({ amount: 30, type: 'debit', ignore: true }),
    ]
    expect(sumExpenses(txs)).toBe(0)
  })

  it('returns 0 when there are no debit transactions', () => {
    const txs = [makeTx({ amount: 1000, type: 'credit', category: 'Income' })]
    expect(sumExpenses(txs)).toBe(0)
  })
})

// ─── Integration: ignored + internal transfers in spending calculations ────────

describe('spending calculation integration', () => {
  it('ignored transactions are excluded from category spending when pre-filtered', () => {
    const txs = [
      makeTx({ amount: 100, type: 'debit', category: 'Food' }),
      makeTx({ amount: 50, type: 'debit', category: 'Food', ignore: true }),
    ]
    // Simulate the store: filter first, then calculate
    const filtered = filterTransactions(txs, defaultCats)
    const spending = calculateCategorySpending(filtered)
    expect(spending).toEqual({ Food: 100 })
  })

  it('internal transfers are excluded from category spending when pre-filtered', () => {
    const txs = [
      makeTx({ amount: 1000, type: 'debit', category: 'Internal Transfer' }),
      makeTx({ amount: 200, type: 'debit', category: 'Food' }),
    ]
    const filtered = filterTransactions(txs, defaultCats)
    const spending = calculateCategorySpending(filtered)
    expect(spending).toEqual({ Food: 200 })
    expect(spending['Internal Transfer']).toBeUndefined()
  })

  it('totals bar is correct: income excludes ignored, expenses exclude ignored', () => {
    const txs = [
      makeTx({ amount: 2000, type: 'credit', category: 'Income' }),
      makeTx({ amount: 500, type: 'credit', category: 'Income', ignore: true }),
      makeTx({ amount: 300, type: 'debit', category: 'Food' }),
      makeTx({ amount: 100, type: 'debit', category: 'Food', ignore: true }),
    ]
    // Show all (including ignored) so they appear in the list, but totals must exclude them
    const filtered = filterTransactions(txs, defaultCats, { showIgnored: true })
    expect(filtered).toHaveLength(4) // ignored are shown in list
    expect(sumIncome(filtered)).toBe(2000)   // ignored credit excluded
    expect(sumExpenses(filtered)).toBe(300)  // ignored debit excluded
  })

  it('internal transfers do not appear in totals', () => {
    const txs = [
      makeTx({ amount: 5000, type: 'debit', category: 'Internal Transfer' }),
      makeTx({ amount: 300, type: 'debit', category: 'Food' }),
      makeTx({ amount: 2000, type: 'credit', category: 'Income' }),
    ]
    const filtered = filterTransactions(txs, defaultCats)
    expect(sumExpenses(filtered)).toBe(300)  // transfer not counted
    expect(sumIncome(filtered)).toBe(2000)
  })

  it('net spending total matches sum of filtered category spending', () => {
    const txs = [
      makeTx({ amount: 100, type: 'debit', category: 'Food' }),
      makeTx({ amount: 200, type: 'debit', category: 'Groceries' }),
      makeTx({ amount: 30, type: 'credit', category: 'Food' }),  // refund
      makeTx({ amount: 500, type: 'debit', category: 'Internal Transfer' }), // excluded
      makeTx({ amount: 40, type: 'debit', category: 'Food', ignore: true }), // excluded
    ]
    const filtered = filterTransactions(txs, defaultCats)
    const byCategory = calculateCategorySpending(filtered)
    const total = sumCategorySpending(byCategory)

    // Food: 100 - 30 = 70, Groceries: 200
    expect(byCategory).toEqual({ Food: 70, Groceries: 200 })
    expect(total).toBe(270)
  })
})
