import type { Fiber } from '../../types/fiber'
import { pgTable, char, varchar, timestamp, boolean, pgEnum, numeric } from 'drizzle-orm/pg-core'
import { scriptToHash } from '@nervosnetwork/ckb-sdk-utils'
import { ChannelStateName } from '../../common'

export const channelStateNameEnum = pgEnum(
  'channel_state_name',
  Object.values(ChannelStateName) as [string, ...string[]],
)

export const channels = pgTable('channels', {
  channel_id: char({ length: 66 }).primaryKey(),
  peer_id: char({ length: 64 }).notNull(),
  is_public: boolean().notNull(),
  funding_udt_type_script_hash: char({ length: 66 }),
  state_name: channelStateNameEnum().notNull(),
  state_flags: varchar({ length: 255 }),
  initial_local_balance: numeric({ precision: 39 }).notNull(), // u128
  local_balance: numeric({ precision: 39 }).notNull(), // u128
  remote_balance: numeric({ precision: 39 }).notNull(), // u128
  offered_tlc_balance: numeric({ precision: 39 }).notNull(), // u128
  received_tlc_balance: numeric({ precision: 39 }).notNull(), // u128
  timestamp: timestamp().notNull(),
  created_at: timestamp().notNull().defaultNow(),
})

export const fromFiberChannel = (channel: Fiber.Channel) => {
  const ts = channel.funding_udt_type_script
  return {
    channel_id: channel.channel_id,
    peer_id: channel.peer_id,
    is_public: !!channel.is_public,
    funding_udt_type_script_hash: ts
      ? scriptToHash({
          codeHash: ts.code_hash,
          hashType: ts.hash_type,
          args: ts.args,
        })
      : null,
    state_name: channel.state.state_name,
    state_flags: Array.isArray(channel.state.state_flags)
      ? channel.state.state_flags.join(',')
      : channel.state.state_flags,
    local_balance: channel.local_balance,
    remote_balance: channel.remote_balance,
    offered_tlc_balance: channel.offered_tlc_balance,
    received_tlc_balance: channel.received_tlc_balance,
    timestamp: new Date(+channel.created_at),
  }
}
