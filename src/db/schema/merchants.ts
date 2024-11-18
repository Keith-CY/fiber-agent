import { pgTable, text, uuid, varchar, timestamp } from 'drizzle-orm/pg-core'

export const merchants = pgTable('merchants', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }),
  contact: varchar({ length: 255 }),
  description: text(),
  created_at: timestamp().notNull().defaultNow(),
})
