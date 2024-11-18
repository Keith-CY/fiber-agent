import { char, pgEnum, pgTable, text, numeric, timestamp } from 'drizzle-orm/pg-core'
import { scripts } from './scripts'
import { Fiber } from '../../core'
import { scriptToHash } from '@nervosnetwork/ckb-sdk-utils'
import { Currency, InvoiceStatus } from '../../common'

export const currencyEnum = pgEnum('currency', Object.values(Currency) as [string, ...string[]])
export const invoiceStatusEnum = pgEnum('invoice_status', Object.values(InvoiceStatus) as [string, ...string[]])

export const invoices = pgTable('invoices', {
  payment_hash: char({ length: 66 }).primaryKey(),
  address: text().notNull(),
  currency: currencyEnum().notNull(),
  amount: numeric({ precision: 39 }).notNull(),
  description: text(),
  udt_type_script_hash: char({ length: 66 }).references(() => scripts.script_hash, {
    onDelete: 'no action',
  }),
  payment_preimage: char({ length: 66 }).notNull(),
  timestamp: timestamp().notNull(),
  status: invoiceStatusEnum().default(InvoiceStatus.Open).notNull(),
  created_at: timestamp().notNull().defaultNow(),
})

export const fromFiberInvoice = (params: Fiber.Params.NewInvoice, result: Fiber.NewInvoiceResult) => {
  const scriptHash = params.udtTypeScript
    ? scriptToHash({
        codeHash: params.udtTypeScript.code_hash,
        hashType: params.udtTypeScript.hash_type as CKBComponents.ScriptHashType,
        args: params.udtTypeScript.args,
      })
    : null
  return {
    address: result.invoice_address,
    currency: params.currency,
    amount: `0x${params.amount.toString(16)}`,
    description: params.description,
    payment_preimage: params.paymentPreimage,
    timestamp: new Date(+result.invoice.data.timestamp),
    payment_hash: result.invoice.data.payment_hash,
    udt_type_script_hash: scriptHash,
  }
}
