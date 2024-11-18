import type { Fiber } from '../../types/fiber'
import { pgTable, text, char, varchar, timestamp, boolean, numeric } from 'drizzle-orm/pg-core'

export const nodes = pgTable('nodes', {
  peer_id: varchar({ length: 66 }).primaryKey(),
  version: varchar().notNull(),
  commit_hash: varchar({ length: 34 }).notNull(),
  public_key: char({ length: 66 }),
  node_name: text(),
  addresses: text().notNull(),
  chain_hash: char({ length: 66 }).notNull(),
  open_channel_auto_accept_min_ckb_funding_amount: numeric({ precision: 20 }), // u64
  auto_accept_channel_ckb_funding_amount: numeric({ precision: 20 }), // u64
  tlc_locktime_expiry_delta: varchar({ length: 18 }),
  tlc_min_value: varchar({ length: 18 }),
  tlc_max_value: varchar({ length: 18 }),
  tlc_fee_proportional_millionths: varchar({ length: 18 }),
  channel_count: numeric({ precision: 10 }), // u32
  pending_channel_count: numeric({ precision: 10 }), // u32
  peers_count: numeric({ precision: 6 }), // u32
  network_sync_status: varchar(),
  created_at: timestamp().notNull().defaultNow(),
  is_local: boolean().notNull().default(false),
})

export const fromFiberNode = (node: Fiber.NodeInfo, isLocal: boolean) => {
  return {
    version: node.version,
    commit_hash: node.commit_hash,
    public_Key: node.public_key,
    node_name: node.node_name,
    peer_id: node.peer_id,
    addresses: node.addresses.join(','),
    chain_hash: node.chain_hash,
    open_channel_auto_accept_min_ckb_funding_amount: node.open_channel_auto_accept_min_ckb_funding_amount,
    auto_accept_channel_ckb_funding_amount: node.auto_accept_channel_ckb_funding_amount,
    tlc_locktime_expiry_delta: node.tlc_locktime_expiry_delta,
    tlc_min_value: node.tlc_min_value,
    tlc_max_value: node.tlc_max_value,
    tlc_fee_proportional_millionths: node.tlc_fee_proportional_millionths,
    channel_count: node.channel_count,
    pending_channel_count: node.pending_channel_count,
    peers_count: node.peers_count,
    network_sync_status: node.network_sync_status,
    is_local: isLocal,
  }
}
