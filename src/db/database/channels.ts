import type { Fiber } from '../../core'
import { drizzle } from 'drizzle-orm/pglite'
import { count, desc, eq, getTableColumns, inArray, not, sql, sum } from 'drizzle-orm'
import * as schema from '../schema'
import { ChannelStateName, EventTopic, EventType } from '../../common'
import { Scripts } from './scripts'

export class Channels {
  private _db: ReturnType<typeof drizzle>
  private _scripts: Scripts

  constructor(db: ReturnType<typeof drizzle>, scripts: Scripts) {
    this._db = db
    this._scripts = scripts
  }

  public stats = async () => {
    const res = await this._db
      .select({
        local_balance: sql<string>`SUM(${schema.channels.local_balance})`,
        initial_local_balance: sql<string>`SUM(${schema.channels.initial_local_balance})`,
        state_name: schema.channels.state_name,
        funding_udt_type_script_hash: schema.channels.funding_udt_type_script_hash,
      })
      .from(schema.channels)
      .where(inArray(schema.channels.state_name, [ChannelStateName.ChannelReady, ChannelStateName.Closed]))
      .groupBy(schema.channels.state_name, schema.channels.funding_udt_type_script_hash)
    return res.reduce(
      (acc, cur) => {
        const id = cur.funding_udt_type_script_hash || 'CKB'
        const net = `${BigInt(cur.local_balance) - BigInt(cur.initial_local_balance)}`
        const local_balance = cur.local_balance ?? '0'

        const token = acc[id] ?? {}
        token[cur.state_name] = { local_balance, net }
        acc[id] = token
        return acc
      },
      {} as Record<string /* token */, Record<string /* state */, Record<'local_balance' | 'net', string>>>,
    )
  }

  public get_one = async (channel_id: string) => {
    return this._db
      .select({
        ...getTableColumns(schema.channels),
        udt: schema.udtCfgs,
      })
      .from(schema.channels)
      .leftJoin(schema.udtCfgs, eq(schema.udtCfgs.script_hash, schema.channels.funding_udt_type_script_hash))
      .where(eq(schema.channels.channel_id, channel_id))
      .limit(1)
      .then((res) => res[0])
  }

  public get_many = async () => {
    return this._db
      .select({
        ...getTableColumns(schema.channels),
        udt: schema.udtCfgs,
      })
      .from(schema.channels)
      .leftJoin(schema.udtCfgs, eq(schema.udtCfgs.script_hash, schema.channels.funding_udt_type_script_hash))
      .where(not(eq(schema.channels.state_name, ChannelStateName.Closed)))
      .orderBy(desc(schema.channels.timestamp))
  }

  public upsert = async (ch: Fiber.Channel) => {
    const ts = ch.funding_udt_type_script
    if (ts) {
      await this._scripts.upsert(ts)
    }
    const data = schema.fromFiberChannel(ch)
    const found = await this.get_one(ch.channel_id)
    if (!found) {
      const res = await this._db
        .insert(schema.channels)
        .values({ ...data, initial_local_balance: data.local_balance })
        .returning({
          funding_udt_type_script_hash: schema.channels.funding_udt_type_script_hash,
        })
      await this._db.insert(schema.events).values({
        topic: EventTopic.Channel,
        type: EventType.New,
        target: ch.channel_id,
        quantity: ch.local_balance,
        description: res[0].funding_udt_type_script_hash,
      })
    } else {
      const { channel_id, ...insert } = data
      await this._db.update(schema.channels).set(insert).where(eq(schema.channels.channel_id, channel_id))
    }
    return data
  }

  public update_state = async (channel_id: string, state_name: ChannelStateName) => {
    const res = await this._db
      .update(schema.channels)
      .set({ state_name })
      .where(eq(schema.channels.channel_id, channel_id))
      .returning({
        channel_id: schema.channels.channel_id,
        state_name: schema.channels.state_name,
        local_balance: schema.channels.local_balance,
      })

    await this._db.insert(schema.events).values({
      topic: EventTopic.Channel,
      type: EventType.Update,
      target: channel_id,
      description: state_name,
      quantity: res[0].local_balance,
    })

    return res
  }

  public get_balance = async (state_name: ChannelStateName) => {
    return this._db
      .select({
        funding_udt_type_script_hash: schema.channels.funding_udt_type_script_hash,
        local_balance: sum(schema.channels.local_balance),
        received_tlc_balance: sum(schema.channels.received_tlc_balance),
      })
      .from(schema.channels)
      .where(eq(schema.channels.state_name, state_name))
      .groupBy(schema.channels.funding_udt_type_script_hash)
  }

  public get_count = async () => {
    const res = await this._db
      .select({
        state: schema.channels.state_name,
        count: count(),
      })
      .from(schema.channels)
      .groupBy(schema.channels.state_name)

    return res.reduce(
      (acc, cur) => {
        acc[cur.state] = cur.count
        return acc
      },
      {} as Record<string, number>,
    )
  }
}
