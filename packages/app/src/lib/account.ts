import type { Account, AccountType } from '@/types'

const TYPE_LABELS: Record<AccountType, string> = {
  checking: 'Checking',
  savings: 'Savings',
  credit_card: 'Credit Card',
  auto_loan: 'Auto Loan',
  mortgage: 'Mortgage',
  personal_loan: 'Personal Loan',
  investment: 'Investment',
  roth_ira: 'Roth IRA',
  traditional_ira: 'Traditional IRA',
  roth_401k: 'Roth 401(k)',
  traditional_401k: 'Traditional 401(k)',
  crypto: 'Crypto Wallet',
  loan: 'Loan',
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

/** True for account types that carry a balance owed (debt) */
export function isLiability(type: AccountType): boolean {
  return ['credit_card', 'loan', 'auto_loan', 'mortgage', 'personal_loan'].includes(type)
}

/** True for retirement / tax-advantaged accounts */
export function isRetirement(type: AccountType): boolean {
  return ['roth_ira', 'traditional_ira', 'roth_401k', 'traditional_401k'].includes(type)
}
