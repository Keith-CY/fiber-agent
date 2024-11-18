import type { ChannelStateName, Currency } from '../common/constants'
export namespace Fiber {
  interface CellDep {
    dep_type: string
    tx_hash: string
    index: string
  }

  export interface Script {
    code_hash: string
    hash_type: CKBComponents.ScriptHashType
    args: string
  }

  interface UdtCfgInfo {
    name: string
    script: Script
    auto_accept_amount: string
    cell_deps: Array<CellDep>
  }

  export interface Channel {
    channel_id: string
    peer_id: string
    funding_udt_type_script: Script | null
    is_public: boolean
    state: {
      state_name: ChannelStateName
      state_flags: string | Array<any>
    }
    local_balance: string
    remote_balance: string
    offered_tlc_balance: string
    received_tlc_balance: string
    created_at: string
  }

  export interface NodeInfo {
    version: string
    commit_hash: string
    public_key: string
    node_name: string | null
    peer_id: string
    addresses: Array<string>
    chain_hash: string
    open_channel_auto_accept_min_ckb_funding_amount: string
    auto_accept_channel_ckb_funding_amount: string
    tlc_locktime_expiry_delta: string
    tlc_min_value: string
    tlc_max_value: string
    tlc_fee_proportional_millionths: string
    channel_count: string
    pending_channel_count: string
    peers_count: string
    network_sync_status: string
    udt_cfg_infos: Array<UdtCfgInfo>
  }

  export interface GraphNode {
    alias: string
    addresses: Array<string>
    node_id: string
    timestamp: string
    chain_hash: string
    auto_accept_min_ckb_funding_amount: string
    udt_cfg_info: Array<UdtCfgInfo>
  }

  export interface GraphChannel {
    channel_outpoint: string
    funding_tx_block_number: string
    funding_tx_index: string
    node1: string
    node2: string
    last_update_timestamp: string | null
    created_timestamp: string
    node1_to_node2_fee_rate: null
    node2_to_node1_fee_rate: null
    capacity: string
    chain_hash: string
    udt_type_script: Script | null
  }

  export interface InvoiceData {
    timestamp: number
    payment_hash: string
    attrs: Array<any>
  }

  export interface Invoice {
    currency: Currency
    amount?: string
    signature?: string
    data?: InvoiceData
  }

  export interface NewInvoiceResult {
    invoice_address: string
    invoice: {
      currency: Currency
      amount: string
      signature: string
      data: {
        timestamp: string
        payment_hash: string
        attrs: Array<any>
      }
    }
  }

  export namespace Params {
    export interface NewInvoice {
      amount: bigint
      description?: string
      currency: Fiber.Currency
      expiry?: number
      fallbackAddress?: string
      finalCltv?: number
      finalExpiryDelta?: number
      udtTypeScript?: Script
      hashAlgorithm?: 'sha256'
      paymentPreimage: string
    }

    export interface NewChannel {
      peerId: string
      fundingAmount: bigint
    }
    export interface CloseChannel {
      channelId: string
      // closeScript: Script read from db
      feeRate?: number
      force?: boolean
    }

    export interface NewPayment {
      invoice?: string
    }

    export interface NewOrder {
      payment_hash: string
      merchant_id: string
      quota?: string
      detail?: object
    }

    export interface NewMerchant {
      name?: string
      contact?: string
      description?: string
    }
  }
}
