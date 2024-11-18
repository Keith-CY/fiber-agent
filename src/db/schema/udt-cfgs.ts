import { pgTable, varchar, char } from 'drizzle-orm/pg-core'
import { scripts } from './scripts'

export const udtCfgs = pgTable('udt-cfgs', {
  script_hash: char({ length: 66 })
    .primaryKey()
    .references(() => scripts.script_hash),
  name: varchar({ length: 255 }),
})
