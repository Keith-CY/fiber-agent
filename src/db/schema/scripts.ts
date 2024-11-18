import { type Fiber } from '../../core'
import { char, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core'
import { scriptToHash } from '@nervosnetwork/ckb-sdk-utils'

export const hashTypeEnum = pgEnum('hash_type', ['data', 'data1', 'data2', 'type'])

export const scripts = pgTable('scripts', {
  script_hash: char({ length: 66 }).primaryKey(),
  code_hash: char({ length: 66 }).notNull(),
  hash_type: hashTypeEnum().notNull(),
  args: varchar().notNull(),
})

export const fromScript = (s: Fiber.Script) => {
  return {
    ...s,
    script_hash: scriptToHash({ codeHash: s.code_hash, hashType: s.hash_type, args: s.args }),
  }
}
