import { pgTable, uuid, char, pgEnum, timestamp } from 'drizzle-orm/pg-core'
import { scripts } from './scripts'
import { AccountRole } from '../../common'

export const accountRoleEnum = pgEnum('account_role', Object.values(AccountRole) as [string, ...string[]])

export const accounts = pgTable('accounts', {
  id: uuid().primaryKey().defaultRandom(),
  script_hash: char({ length: 66 })
    .notNull()
    .references(() => scripts.script_hash, {
      onDelete: 'set null',
    }),
  role: accountRoleEnum().notNull(),
  created_at: timestamp().notNull().defaultNow(),
})
