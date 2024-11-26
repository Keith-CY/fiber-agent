import type { Fiber } from '../types/fiber'
import type { Database } from '../db'
import { parsePeerAddr } from '../common'
import { RPC } from './rpc'

export class Peer {
  private _rpc: RPC
  private _db: Database

  constructor(uri: string, db: Database) {
    this._rpc = new RPC(uri)
    this._db = db
    this.upsertLocalNode()
  }

  public list() {
    return this._db.nodes.get_many()
  }

  public connect = async (address: string) => {
    const { rpcAddr } = parsePeerAddr(address)
    const peer = await this.getInfo(rpcAddr)
    if (!peer) {
      throw new Error(`Peer at ${address} is inaccessible`)
    }
    // returns nothing when succeed
    await this._rpc.post('connect_peer', [{ address }])
    await this._db.nodes.upsert({ ...peer, addresses: [address] }, false)
  }

  public disconnect = async (peerId: string) => {
    await this._rpc.post('disconnect_peer', [{ peer_id: peerId }])
    await this._db.nodes.remove(peerId)
  }

  public getInfo = async (remote?: string): Promise<Fiber.NodeInfo | null> => {
    const rpc = remote ? new RPC(remote) : this._rpc
    return rpc.post<Fiber.NodeInfo>('node_info', []).catch((e) => {
      console.error(e)
      return null
    })
  }

  public sync = async () => {
    for (const n of await this.list()) {
      const address = n.addresses.split(',')[0]
      if (!address) continue
      const { rpcAddr } = parsePeerAddr(address)
      const peer = await this.getInfo(rpcAddr)
      if (!peer) continue
      await this._db.nodes.upsert({ ...peer, addresses: [address] }, n.is_local)
    }
  }

  private upsertLocalNode = async () => {
    const local = await this.getInfo()
    if (!local) {
      throw new Error(`Fail to get local node info`)
    }
    const localNodes = await this.list().then((r) => r.filter((i) => i.is_local))
    for (const n of localNodes) {
      if (n.peer_id !== local.peer_id) {
        await this._db.nodes.remove(n.peer_id)
      }
    }
    for (const cfg of local.udt_cfg_infos) {
      const { script_hash } = await this._db.scripts.upsert(cfg.script)
      await this._db.udtCfgs.upsert(script_hash, cfg.name, true)
    }
    await this._db.nodes.upsert(local, true)
  }
}
