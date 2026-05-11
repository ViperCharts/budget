import { defineStore } from 'pinia'
import { trpc } from '@/lib/trpc'
import type { Account, AccountType } from '@/types'
import { nanoid } from '@/lib/nanoid'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
    loading: false,
  }),

  getters: {
    totalAssets(): number {
      const LIABILITY_TYPES = ['credit_card', 'loan', 'auto_loan', 'mortgage', 'personal_loan']
      return this.accounts
        .filter((a) => !LIABILITY_TYPES.includes(a.type))
        .reduce((sum, a) => sum + a.balance, 0)
    },
    totalLiabilities(): number {
      const LIABILITY_TYPES = ['credit_card', 'loan', 'auto_loan', 'mortgage', 'personal_loan']
      return this.accounts
        .filter((a) => LIABILITY_TYPES.includes(a.type))
        .reduce((sum, a) => sum + Math.abs(a.balance), 0)
    },
    netWorth(): number {
      return this.totalAssets - this.totalLiabilities
    },
    byId(): Record<string, Account> {
      return Object.fromEntries(this.accounts.map((a) => [a.id, a]))
    },
    byAccountNumber(): Record<string, Account> {
      const map: Record<string, Account> = {}
      for (const a of this.accounts) {
        if (a.accountNumber) map[a.accountNumber] = a
      }
      return map
    },
  },

  actions: {
    async fetch() {
      this.loading = true
      try {
        const rows = await trpc.accounts.list.query()
        this.accounts = rows.map(mapRowToAccount)
      } finally {
        this.loading = false
      }
    },

    async upsertAccount(account: Partial<Account> & { type: AccountType; name: string; balance: number }) {
      const id = account.id ?? nanoid()
      const data: Account = {
        id,
        name: account.name,
        type: account.type,
        balance: account.balance,
        currency: account.currency ?? 'USD',
        lastUpdated: new Date().toISOString(),
        fileIds: account.fileIds ?? [],
        ...(account.accountNumber !== undefined && { accountNumber: account.accountNumber }),
        ...(account.holderName !== undefined && { holderName: account.holderName }),
        ...(account.interestRate !== undefined && { interestRate: account.interestRate }),
        ...(account.apr !== undefined && { apr: account.apr }),
        ...(account.apy !== undefined && { apy: account.apy }),
        ...(account.creditLimit !== undefined && { creditLimit: account.creditLimit }),
        ...(account.cryptoSymbol !== undefined && { cryptoSymbol: account.cryptoSymbol }),
        ...(account.plaidAccountId !== undefined && { plaidAccountId: account.plaidAccountId }),
        ...(account.plaidItemId !== undefined && { plaidItemId: account.plaidItemId }),
        ...(account.source !== undefined && { source: account.source }),
      }

      await trpc.accounts.upsert.mutate({
        id,
        name: data.name,
        type: data.type,
        balance: data.balance,
        currency: data.currency,
        lastUpdated: data.lastUpdated,
        fileIds: data.fileIds,
        accountNumber: data.accountNumber ?? null,
        holderName: data.holderName ?? null,
        interestRate: data.interestRate ?? null,
        apr: data.apr ?? null,
        apy: data.apy ?? null,
        creditLimit: data.creditLimit ?? null,
        cryptoSymbol: data.cryptoSymbol ?? null,
        plaidAccountId: data.plaidAccountId ?? null,
        plaidItemId: data.plaidItemId ?? null,
        source: data.source ?? 'manual',
      })

      // Optimistic update
      const idx = this.accounts.findIndex((a) => a.id === id)
      if (idx >= 0) {
        this.accounts[idx] = data
      } else {
        this.accounts.push(data)
      }

      return data
    },

    async deleteAccount(id: string) {
      await trpc.accounts.delete.mutate({ id })
      this.accounts = this.accounts.filter((a) => a.id !== id)
    },

    async updateBalance(id: string, balance: number) {
      const account = this.accounts.find((a) => a.id === id)
      if (!account) return
      await this.upsertAccount({ ...account, balance })
    },
  },
})

function mapRowToAccount(row: Record<string, unknown>): Account {
  return {
    id: row.id as string,
    name: row.name as string,
    type: row.type as AccountType,
    balance: row.balance as number,
    currency: (row.currency as string) ?? 'USD',
    lastUpdated: row.lastUpdated as string,
    fileIds: (row.fileIds as string[]) ?? [],
    ...(row.accountNumber != null && { accountNumber: row.accountNumber as string }),
    ...(row.holderName != null && { holderName: row.holderName as string }),
    ...(row.interestRate != null && { interestRate: row.interestRate as number }),
    ...(row.apr != null && { apr: row.apr as number }),
    ...(row.apy != null && { apy: row.apy as number }),
    ...(row.creditLimit != null && { creditLimit: row.creditLimit as number }),
    ...(row.cryptoSymbol != null && { cryptoSymbol: row.cryptoSymbol as string }),
    ...(row.plaidAccountId != null && { plaidAccountId: row.plaidAccountId as string }),
    ...(row.plaidItemId != null && { plaidItemId: row.plaidItemId as string }),
    ...(row.source != null && { source: row.source as 'manual' | 'plaid' }),
  }
}
