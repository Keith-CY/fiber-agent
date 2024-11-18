import { pgTable, char } from 'drizzle-orm/pg-core'
import { nodes } from './nodes'
import { scripts } from './scripts'

export const nodesUdtCfgs = pgTable('nodes-udt-cfgs', {
  node_id: char({ length: 66 })
    .references(() => nodes.peer_id)
    .notNull(),
  udt_cfg_script_hash: char({ length: 66 })
    .references(() => scripts.script_hash)
    .notNull(),
})
