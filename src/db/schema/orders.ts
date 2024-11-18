import type { Fiber } from '../../core'
import { pgTable, uuid, char, numeric, json, timestamp } from 'drizzle-orm/pg-core'
import { invoices } from './invoices'
import { merchants } from './merchants'

export const orders = pgTable('orders', {
  id: uuid().primaryKey().defaultRandom(),
  quota: numeric({ precision: 10 }),
  detail: json(),
  created_at: timestamp().notNull().defaultNow(),
  payment_hash: char({ length: 66 })
    .references(() => invoices.payment_hash, { onDelete: 'cascade' })
    .notNull(),
  merchant_id: uuid()
    .references(() => merchants.id)
    .notNull(),
})

export const fromOrder = ({ quota, ...order }: Fiber.Params.NewOrder) => {
  return { ...order, quota: quota ? `0x${BigInt(quota).toString(16)}` : null }
}
