import type { ServerResponseCode } from '../common'
import type { fiberAgent } from '../core'

export namespace FiberAgentService {
  interface ResponseBase {
    code: ServerResponseCode.Success
    error?: any
  }
  interface MessageResponse extends ResponseBase {
    message: string
  }
  export namespace Peer {
    export namespace List {
      export interface Response extends ResponseBase {
        result: Awaited<ReturnType<typeof fiberAgent.peer.list>>
      }
    }
    export namespace New {
      export type Response = MessageResponse
    }
    export namespace Delete {
      export type Response = MessageResponse
    }
  }

  export namespace Channel {
    export namespace List {
      export interface Response extends ResponseBase {
        result: Awaited<ReturnType<typeof fiberAgent.channel.list>>
      }
    }
    export namespace New {
      export type Response = MessageResponse
    }
    export namespace Delete {
      export type Response = MessageResponse
    }
  }

  export namespace Invoice {
    export namespace List {
      export interface Response extends ResponseBase {
        result: Awaited<ReturnType<typeof fiberAgent.invoice.list>>
      }
    }
    export namespace Issue {
      export interface Response extends ResponseBase {
        result: Awaited<ReturnType<typeof fiberAgent.invoice.issue>>
      }
    }

    export namespace Cancel {
      export type Response = MessageResponse
    }

    export namespace Archive {
      export type Response = MessageResponse
    }

    export namespace One {
      export interface Response extends ResponseBase {
        result: Awaited<ReturnType<typeof fiberAgent.invoice.get>>
      }
    }
  }

  export namespace Merchant {
    export namespace List {
      export interface Response extends ResponseBase {
        result: Awaited<ReturnType<typeof fiberAgent.merchant.list>>
      }
    }
    export namespace New {
      export type Response = MessageResponse
    }
  }

  export namespace Event {
    export namespace List {
      export interface Response extends ResponseBase {
        result: Awaited<ReturnType<typeof fiberAgent.event.getMany>>
      }
    }
  }

  export namespace Info {
    export namespace Overview {
      export interface Response extends ResponseBase {
        result: {
          local_node: Awaited<ReturnType<typeof fiberAgent.peer.getInfo>>
          local_balance: Record<
            string,
            {
              balance: string
              udt_info: {
                name: string | null
                script_hash: string
                code_hash: string
                hash_type: 'data' | 'type' | 'data1' | 'data2'
                args: string
              } | null
            }
          >
        }
      }
    }

    export namespace Admin {
      export interface Response extends ResponseBase {
        result: Awaited<ReturnType<typeof fiberAgent.account.getAdmin>>
      }
    }

    export namespace Channels {
      export interface Response extends ResponseBase {
        result: {
          balance: Record<'pending' | 'finalized', Awaited<ReturnType<typeof fiberAgent.channel.getBalance>>>
          count: Record<string, number>
        }
      }
    }

    export namespace Invoices {
      export interface Response extends ResponseBase {
        result: {
          count: Awaited<ReturnType<typeof fiberAgent.invoice.getCounts>>
        }
      }
    }

    export namespace Merchants {
      export interface Response extends ResponseBase {
        result: {
          count: Awaited<ReturnType<typeof fiberAgent.merchant.getCount>>
        }
      }
    }

    export namespace Finance {
      export interface Response extends ResponseBase {
        result: {
          channel: Awaited<ReturnType<typeof fiberAgent.channel.stats>>
          udt_info: Awaited<ReturnType<typeof fiberAgent.udtInfo.getMany>>
        }
      }
    }

    export namespace UdtInfo {
      export interface Response extends ResponseBase {
        result: Awaited<ReturnType<typeof fiberAgent.udtInfo.getMany>>
      }
    }
  }
}
