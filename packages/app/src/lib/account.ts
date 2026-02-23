import type { Account, AccountType } from '@/types'

const TYPE_LABELS: Record<AccountType, string> = {
  checking: 'Checking',
  savings: 'Savings',
  credit_card: 'Credit Card',
  loan: 'Loan',
  mortgage: 'Mortgage',
  investment: 'Investment',
  other: 'Account',
}

export function accountTypeLabel(type: AccountType): string {
  return TYPE_LABELS[type] ?? 'Account'
}

/**
 * Returns a formatted display name for an account:
 * "{name} {type} **{last4}"   e.g. "US Bank Checking **4233"
 * Omits the ending if accountNumber is not set.
 */
export function formatAccountName(account: Account): string {
  const type = accountTypeLabel(account.type)
  const ending = account.accountNumber ? ` **${account.accountNumber}` : ''
  return `${account.name} ${type}${ending}`
}
