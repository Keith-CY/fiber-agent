import type { Fiber } from '../types/fiber'
import type { Database } from '../db'
import { RPC } from './rpc'
import { AccountRole, ChannelStateName, DEFAULT_FEE_RATE } from '../common'

export class Channel {
  private _rpc: RPC
  private _db: Database

  constructor(uri: string, db: Database) {
    this._rpc = new RPC(uri)
    this._db = db
  }

  public stats = async () => {
    return this._db.channels.stats()
  }

  public list = () => {
    return this._db.channels.get_many()
  }

  public getBalance = (stateName: ChannelStateName) => {
    return this._db.channels.get_balance(stateName)
  }

  public getCounts = async () => {
    return this._db.channels.get_count()
  }

  public open = async (params: Fiber.Params.NewChannel) => {
    const res = await this._rpc.post<{ temporary_channel_id: string }>('open_channel', [
      {
        peer_id: params.peerId,
        funding_amount: `0x${params.fundingAmount.toString(16)}`,
      },
    ])
    // unnucessary to sync because there's a period for confirmation
    return res.temporary_channel_id
  }

  public close = async (params: Fiber.Params.CloseChannel) => {
    const { channelId: id, feeRate = DEFAULT_FEE_RATE, force = false } = params
    const admin = await this._db.accounts.get_one(AccountRole.Admin)
    if (!admin) {
      throw new Error('Set admin before close the channel')
    }
    const { script_hash, ...closeScript } = await this._db.scripts.get_one(admin.script_hash)
    await this._rpc.post<null>('shutdown_channel', [
      {
        channel_id: id,
        force,
        fee_rate: `0x${feeRate.toString(16)}`,
        close_script: closeScript,
      },
    ])
    // unnucessary to sync because there's a period for confirmation
  }

  public removeTlc = async (channelId: string, tlcId: string, reason: string | number) => {
    await this._rpc.post('remove_tlc', [
      {
        channel_id: channelId,
        tlc_id: tlcId,
        reason,
      },
    ])
    // unnucessary to sync because there's a period for confirmation
  }

  public sync = async () => {
    const listFromNode = await this._rpc
      .post<{ channels: Array<Fiber.Channel> }>('list_channels', [{ limit: null, after: null }])
      .then((res) => res?.channels ?? [])
      .catch((e) => {
        console.error(`Failed to fetch channels from node, error ${e}`)
        return []
      })

    let listFromDb = await this.list()

    if (listFromNode.length) {
      for (const ch of listFromNode) {
        await this._db.channels.upsert(ch)
        listFromDb = listFromDb.filter((i) => i.channel_id !== ch.channel_id)
      }
    }

    if (listFromDb.length) {
      for (const ch of listFromDb) {
        await this._db.channels.update_state(ch.channel_id, ChannelStateName.Closed)
      }
    }
  }
}
