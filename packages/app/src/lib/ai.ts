import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import type { AISettings, ExtractedFileData, AccountType } from "@/types";
import { readFileAsBase64, readFileAsText } from "@/lib/csv";

function getModel(settings: AISettings) {
  if (settings.provider === "anthropic") {
    const anthropic = createAnthropic({ apiKey: settings.apiKey });
    return anthropic(settings.model || "claude-3-5-haiku-20241022");
  } else {
    const openai = createOpenAI({ apiKey: settings.apiKey });
    return openai(settings.model || "gpt-4o-mini");
  }
}

const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Housing & Utilities",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Income",
  "Transfer",
  "Savings",
  "Fees & Interest",
  "Other",
] as const;

const TransactionSchema = z.object({
  date: z.string().describe("Transaction date normalized to YYYY-MM-DD"),
  description: z
    .string()
    .describe("Original transaction description, lightly cleaned"),
  amount: z
    .number()
    .describe("Absolute (positive) dollar amount — never negative"),
  type: z
    .enum(["debit", "credit"])
    .describe(
      "debit = money out (purchases, withdrawals, fees); credit = money in (deposits, payments, refunds)"
    ),
  category: z.enum(CATEGORIES),
});

const ExtractedSchema = z.object({
  accountName: z
    .string()
    .optional()
    .describe('Bank or institution name, e.g. "Chase", "Bank of America"'),
  accountType: z
    .enum([
      "checking",
      "savings",
      "credit_card",
      "loan",
      "mortgage",
      "investment",
      "other",
    ])
    .optional(),
  accountNumber: z
    .string()
    .optional()
    .describe('Last 4 digits only, e.g. "4242"'),
  statementDate: z
    .string()
    .optional()
    .describe("Statement period end date in YYYY-MM-DD"),
  openingBalance: z.number().optional(),
  closingBalance: z.number().optional(),
  interestRate: z
    .number()
    .optional()
    .describe("APR as a percentage, e.g. 23.99 for 23.99%"),
  creditLimit: z.number().optional().describe("Dollar amount, e.g. 5000"),
  transactions: z.array(TransactionSchema),
});

const EXTRACTION_PROMPT = `You are a financial data extraction assistant. Extract all structured data from this bank or credit card statement.
Rules:
- Normalize all dates to YYYY-MM-DD format regardless of how they appear in the document
- Transaction amounts must always be positive numbers. Use the "type" field for direction:
  - debit = money leaving the account (purchases, withdrawals, fees, payments on a checking account)
  - credit = money entering the account (deposits, refunds, payments received, payments on a credit card)
- Extract EVERY individual transaction line item — do not skip any
- IMPORTANT: Do NOT extract account summary totals or aggregate rows. Ignore lines like "Purchases +$759.23", "Payment, Credits -$624.70", "Previous Balance", "Fees Charged", "Interest Charged", "Cash Advances", "Balance Transfers" — these are summary figures, not individual transactions
- Only extract rows that have a specific date, a specific merchant/description, and a specific dollar amount — these are the actual transactions
- For accountType: use "credit_card" for credit card statements, "checking" for checking/debit, "savings" for savings accounts
- Interest rate should be a number like 23.99 (not 0.2399) representing the APR percentage
- If a field is not present in the document, omit it entirely — do not guess or make up values
Categories (pick the single best match):
Food & Dining, Transportation, Housing & Utilities, Entertainment, Healthcare, Shopping, Income, Transfer, Savings, Fees & Interest, Other`;

function mapExtractedObject(
  object: z.infer<typeof ExtractedSchema>
): ExtractedFileData {
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
  };
}

/**
 * Extract financial data from plain text (used for CSV statements).
 */
export async function extractFromText(
  rawText: string,
  settings: AISettings
): Promise<ExtractedFileData> {
  const model = getModel(settings);

  const { object } = await generateObject({
    model,
    schema: ExtractedSchema,
    system: EXTRACTION_PROMPT,
    prompt: `Statement data:\n---\n${rawText.slice(0, 12000)}\n---`,
  });

  return mapExtractedObject(object);
}

/**
 * Extract financial data from a PDF file.
 * When using Anthropic, sends the PDF natively for accurate extraction.
 * Falls back to text extraction for OpenAI (limited accuracy).
 */
export async function extractFromPDF(
  file: File,
  settings: AISettings
): Promise<ExtractedFileData> {
  const model = getModel(settings);

  if (settings.provider === "anthropic") {
    const base64 = await readFileAsBase64(file);

    const { object } = await generateObject({
      model,
      schema: ExtractedSchema,
      messages: [
        {
          role: "user",
          content: [
            { type: "file", data: base64, mimeType: "application/pdf" },
            { type: "text", text: EXTRACTION_PROMPT },
          ],
        },
      ],
    });

    return mapExtractedObject(object);
  }

  // OpenAI fallback: read as text (PDFs are binary so quality will be limited)
  const rawText = await readFileAsText(file);
  return extractFromText(rawText, settings);
}

const CategorizationSchema = z.object({
  categories: z.array(
    z.object({
      description: z.string(),
      category: z.enum(CATEGORIES),
    })
  ),
});

export async function categorizeTransactions(
  descriptions: string[],
  settings: AISettings
): Promise<Record<string, string>> {
  const model = getModel(settings);

  const { object } = await generateObject({
    model,
    schema: CategorizationSchema,
    prompt: `Categorize each transaction description into one of:
${CATEGORIES.join(", ")}

Descriptions:
${descriptions.map((d, i) => `${i + 1}. ${d}`).join("\n")}`,
  });

  const result: Record<string, string> = {};
  for (const item of object.categories) {
    result[item.description] = item.category;
  }
  return result;
}

export async function getFinancialTip(
  context: {
    totalSpending?: number;
    topCategory?: string;
    averageBalance?: number;
  },
  settings: AISettings
): Promise<string> {
  const model = getModel(settings);

  const { text } = await generateText({
    model,
    prompt: `Give one short, encouraging, personalized financial tip (1-2 sentences max) based on this context:
- Monthly spending: ${
      context.totalSpending ? `$${context.totalSpending.toFixed(2)}` : "unknown"
    }
- Top spending category: ${context.topCategory || "unknown"}
- Average balance: ${
      context.averageBalance
        ? `$${context.averageBalance.toFixed(2)}`
        : "unknown"
    }

Be warm, specific, and actionable. Start directly with the tip.`,
  });

  return text;
}
