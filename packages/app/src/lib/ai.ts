import { createAnthropic } from '@ai-sdk/anthropic'
import { createOpenAI } from '@ai-sdk/openai'
import { generateObject, generateText } from 'ai'
import { z } from 'zod'
import type { AISettings, ExtractedFileData, AccountType } from '@/types'

function getModel(settings: AISettings) {
  if (settings.provider === 'anthropic') {
    const anthropic = createAnthropic({ apiKey: settings.apiKey })
    return anthropic(settings.model || 'claude-3-5-haiku-20241022')
  } else {
    const openai = createOpenAI({ apiKey: settings.apiKey })
    return openai(settings.model || 'gpt-4o-mini')
  }
}

const TransactionSchema = z.object({
  date: z.string().describe('Transaction date in ISO format YYYY-MM-DD'),
  description: z.string(),
  amount: z.number().describe('Absolute dollar amount'),
  type: z.enum(['debit', 'credit']).describe('debit = money out, credit = money in'),
  category: z.string().describe('Category like: Food, Transport, Housing, Entertainment, Healthcare, Shopping, Income, Transfer, Other'),
})

const ExtractedSchema = z.object({
  accountName: z.string().optional(),
  accountType: z.enum(['checking', 'savings', 'credit_card', 'loan', 'mortgage', 'investment', 'other']).optional(),
  accountNumber: z.string().optional().describe('Last 4 digits only'),
  statementDate: z.string().optional().describe('ISO date of statement period end'),
  openingBalance: z.number().optional(),
  closingBalance: z.number().optional(),
  interestRate: z.number().optional().describe('Annual percentage rate'),
  creditLimit: z.number().optional(),
  transactions: z.array(TransactionSchema),
})

export async function extractFromText(
  rawText: string,
  settings: AISettings,
): Promise<ExtractedFileData> {
  const model = getModel(settings)

  const { object } = await generateObject({
    model,
    schema: ExtractedSchema,
    prompt: `You are a financial data extraction assistant. Extract all information from this bank or credit card statement text.

Statement text:
---
${rawText.slice(0, 12000)}
---

Extract:
1. Account details (name, type, number last 4 digits, interest rate if credit card, credit limit)
2. Statement period dates
3. Opening and closing balances
4. ALL transactions with date, description, amount, whether it's a debit (money out) or credit (money in), and a category

For categories use: Food & Dining, Transportation, Housing & Utilities, Entertainment, Healthcare, Shopping, Income, Transfer, Savings, Fees & Interest, Other`,
  })

  return {
    accountName: object.accountName,
    accountType: object.accountType as AccountType | undefined,
    accountNumber: object.accountNumber,
    statementDate: object.statementDate,
    openingBalance: object.openingBalance,
    closingBalance: object.closingBalance,
    interestRate: object.interestRate,
    creditLimit: object.creditLimit,
    transactions: object.transactions.map((t) => ({
      date: t.date,
      description: t.description,
      amount: t.amount,
      type: t.type,
      category: t.category,
    })),
  }
}

const CategorizationSchema = z.object({
  categories: z.array(
    z.object({
      description: z.string(),
      category: z.string(),
    }),
  ),
})

export async function categorizeTransactions(
  descriptions: string[],
  settings: AISettings,
): Promise<Record<string, string>> {
  const model = getModel(settings)

  const { object } = await generateObject({
    model,
    schema: CategorizationSchema,
    prompt: `Categorize each of these transaction descriptions into one of:
Food & Dining, Transportation, Housing & Utilities, Entertainment, Healthcare, Shopping, Income, Transfer, Savings, Fees & Interest, Other

Descriptions:
${descriptions.map((d, i) => `${i + 1}. ${d}`).join('\n')}`,
  })

  const result: Record<string, string> = {}
  for (const item of object.categories) {
    result[item.description] = item.category
  }
  return result
}

export async function getFinancialTip(
  context: { totalSpending?: number; topCategory?: string; averageBalance?: number },
  settings: AISettings,
): Promise<string> {
  const model = getModel(settings)

  const { text } = await generateText({
    model,
    prompt: `Give one short, encouraging, personalized financial tip (1-2 sentences max) based on this context:
- Monthly spending: ${context.totalSpending ? `$${context.totalSpending.toFixed(2)}` : 'unknown'}
- Top spending category: ${context.topCategory || 'unknown'}
- Average balance: ${context.averageBalance ? `$${context.averageBalance.toFixed(2)}` : 'unknown'}

Be warm, specific, and actionable. Start directly with the tip.`,
  })

  return text
}
