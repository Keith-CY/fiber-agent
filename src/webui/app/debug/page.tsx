'use client'
import { useQuery } from '@tanstack/react-query'
import { ChannelStateName, Currency, InvoiceStatus } from '../../../common'
import {
  closeChannel,
  connectPeer,
  disconnectPeer,
  fetchChannels,
  fetchInvoices,
  fetchPeers,
  openChannel,
  cancelInvoice,
  newInvoice,
  archiveInvoice,
  fetchMerchants,
  addMerchant,
  fetchInfo,
} from '../common'

const REFETCH_INTERVAL = 10000

export default function Home() {
  const { data: infoData } = useQuery({
    queryKey: ['info'],
    queryFn: fetchInfo,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnMount: true,
  })

  const { data: invoicesData, refetch: refetchInvoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnMount: true,
  })
  const { data: channelsData, refetch: refetchChannels } = useQuery({
    queryKey: ['channels'],
    queryFn: fetchChannels,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnMount: true,
  })
  const { data: peersData, refetch: refetchPeers } = useQuery({
    queryKey: ['peers'],
    queryFn: fetchPeers,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnMount: true,
  })

  const { data: merchantsData, refetch: refetchMerchants } = useQuery({
    queryKey: ['merchants'],
    queryFn: fetchMerchants,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnMount: true,
  })

  const handleActionClick = async (e: React.SyntheticEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    const elm = e.target
    if (!(elm instanceof HTMLButtonElement)) {
      return
    }

    const { action, id } = elm.dataset
    try {
      switch (action) {
        case 'new-merchant': {
          const name = window.prompt('Merchant name')
          if (!name) {
            throw new Error('Name is required')
          }
          const description = window.prompt('Merchant description')
          if (!description) {
            throw new Error('description is required')
          }
          const contact = window.prompt('Merchant Contact')
          if (!contact) {
            throw new Error('contact is required')
          }
          const res = await addMerchant({
            name,
            description,
            contact,
          })
          window.alert(res.message)
          refetchMerchants()
          return
        }
        case 'new-invoice': {
          const amount = window.prompt('Amount', '20000000000')
          if (!amount) {
            throw new Error(`Amount is required`)
          }
          const currency = window.prompt('Currency', 'Fibt')
          if (!currency) {
            throw new Error(`Currency is required`)
          }
          const description = window.prompt('Description', 'description of the new invoice') ?? ''
          let preimage = window.prompt(
            'payment preimage, leave this empty if there is an order',
            `0x${Date.now().toString()}${'e'.repeat(51)}`,
          )
          let order: {
            merchantId: string
            quota?: string
            detail: { description: string }
          } = {
            merchantId: '',
            quota: undefined,
            detail: { description: '' },
          }
          if (!preimage) {
            const merchantId = window.prompt('Merchant ID')
            if (!merchantId) throw new Error('Merchant id is required')
            order.merchantId = merchantId

            order.quota = window.prompt('Quota') ?? undefined
            order.detail.description = window.prompt('Product Description') ?? ''
          }
          const res = await newInvoice(BigInt(amount), description, currency as Currency, preimage, order)
          window.alert(res.result.address)
          refetchInvoices()
          return
        }
        case 'cancel-invoice': {
          if (!id || typeof id !== 'string') {
            window.alert('Fail to get invoice id to cancel')
            return
          }
          const res = await cancelInvoice(id)
          window.alert(res.message)
          refetchInvoices()
          return
        }
        case 'archive-invoice': {
          if (!id || typeof id !== 'string') {
            window.alert('Fail to get invoice id to cancel')
            return
          }
          const res = await archiveInvoice(id)
          window.alert(res.message)
          refetchInvoices()
          return
        }
        case 'open-channel': {
          if (!id || typeof id !== 'string') {
            window.alert('Fail to get peer id to disconnect')
            return
          }
          const funding = window.prompt('Funding CKB', '6200000000')
          if (!funding) return
          const res = await openChannel(id, BigInt(funding))
          window.alert(res.message)
          refetchChannels()
          return
        }
        case 'close-channel': {
          if (!id || typeof id !== 'string') {
            window.alert('Fail to get channel id to close')
            return
          }
          const res = await closeChannel(id, 1000)
          window.alert(res.message)
          refetchChannels()
          return
        }
        case 'connect-peer': {
          const address = window.prompt(
            'P2P address of the peer',
            '/ip4/0.0.0.0/tcp/8230/p2p/Qmcg7Du8ktQuN8pPrd4w5hni4x6dxjrp6R67LKkUK63SaV',
          )
          if (!address) return
          const res = await connectPeer(address)
          window.alert(res.message)
          refetchPeers()
          return
        }
        case 'disconnect-peer': {
          if (!id || typeof id !== 'string') {
            window.alert('Fail to get peer id to disconnect')
            return
          }
          const res = await disconnectPeer(id)
          window.alert(res.message)
          refetchPeers()
          return
        }
        default: {
          // ignore
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        window.alert(e.message)
      }
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start" onClick={handleActionClick}>
        <div>
          <h4 className="font-bold text-2xl">On Chain Balance</h4>
          {infoData ? (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(infoData.result.channel.balance).map(([id, value]) => {
                    return (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{value}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-2xl">
            Invoices
            <button data-action="new-invoice">New Invoice</button>
          </h4>
          {invoicesData ? (
            <table>
              <thead>
                <tr>
                  <th>Payment Hash</th>
                  <th>Amount</th>
                  <th>Address</th>
                  <th>Payment Preimage</th>
                  <th>Description</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoicesData.result.map((i) => {
                  const fields = [
                    { key: 'paymentHash', value: i.payment_hash },
                    { key: 'amount', value: i.amount },
                    { key: 'address', value: i.address },
                    { key: 'preiamge', value: i.payment_preimage },
                    { key: 'description', value: i.description },
                    { key: 'timestamp', value: i.timestamp },
                    { key: 'status', value: i.status },
                  ]
                  return (
                    <tr key={i.payment_hash}>
                      {fields.map((field) => (
                        <td
                          key={field.key}
                          className="max-w-40 overflow-ellipsis overflow-hidden px-2 text-nowrap"
                          title={field.value?.toString()}
                        >
                          {field.value?.toString()}
                        </td>
                      ))}
                      <td title={JSON.stringify(i.order, null, 2)}>Hover to view oder</td>
                      {i.status === InvoiceStatus.Open ? (
                        <button data-action="cancel-invoice" data-id={i.payment_hash}>
                          Cancel
                        </button>
                      ) : (
                        <button data-action="archive-invoice" data-id={i.payment_hash}>
                          Archive
                        </button>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            'Loading Invoices'
          )}
        </div>
        {/***************/}

        <div>
          <h4 className="font-bold text-2xl">
            Merchants
            <button data-action="new-merchant">New Merchant</button>
          </h4>
          {merchantsData ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {merchantsData.result.map((m) => {
                  const fields = [
                    { key: 'id', value: m.id },
                    { key: 'name', value: m.name },
                    { key: 'description', value: m.description },
                    { key: 'contact', value: m.contact },
                  ]
                  return (
                    <tr key={m.id}>
                      {fields.map((field) => (
                        <td
                          key={field.key}
                          className="max-w-40 overflow-ellipsis overflow-hidden px-2 text-nowrap"
                          title={field.value?.toString()}
                        >
                          {field.value}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            'Loading Invoices'
          )}
        </div>
        {/***************/}
        <div>
          <h4 className="font-bold text-2xl">Channels</h4>
          {channelsData ? (
            <table>
              <thead>
                <tr>
                  <th>Channel ID</th>
                  <th>Peer ID</th>
                  <th>Token</th>
                  <th>Net</th>
                  <th>Local Balance</th>
                  <th>Remote Balance</th>
                  <th>State</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {channelsData.result.map((ch) => {
                  const fields = [
                    { key: 'id', value: ch.channel_id },
                    { key: 'peerId', value: ch.peer_id },
                    { key: 'token', value: ch.funding_udt_type_script_hash ?? 'ckb' },
                    { key: 'net', value: BigInt(ch.local_balance) - BigInt(ch.initial_local_balance) },
                    { key: 'localBalance', value: BigInt(ch.local_balance) },
                    { key: 'remoteBalance', value: BigInt(ch.remote_balance) },
                    { key: 'state', value: ch.state_name },
                  ]
                  return (
                    <tr key={ch.channel_id}>
                      {fields.map((field) => {
                        return (
                          <td
                            key={field.key}
                            className="max-w-40 overflow-ellipsis overflow-hidden px-2 text-nowrap"
                            title={field.value.toString()}
                          >
                            {field.value}
                          </td>
                        )
                      })}
                      <td>
                        {ch.state_name === ChannelStateName.ChannelReady ? (
                          <button data-action="close-channel" data-id={ch.channel_id}>
                            Close
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            'Loading Channels'
          )}
        </div>
        <div>
          <h4 className="font-bold text-2xl">
            Peers
            <button data-action="connect-peer">Connect a Peer</button>
          </h4>
          {peersData ? (
            <table>
              <thead>
                <tr>
                  <th>Is Local</th>
                  <th>Peer ID</th>
                  <th>Status</th>
                  <th>Channels</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {peersData.result.map((p) => {
                  const fields = [
                    { key: 'isLocal', value: p.is_local.toString() },
                    { key: 'peerId', value: p.peer_id },
                    { key: 'status', value: p.network_sync_status },
                    { key: 'channels', value: +(p.channel_count ?? 0) },
                  ]
                  return (
                    <tr key={p.peer_id}>
                      {fields.map((field) => {
                        return (
                          <td
                            key={field.key}
                            className="max-w-40 overflow-ellipsis overflow-hidden px-2 text-nowrap"
                            title={field.value?.toString()}
                          >
                            {field.value ?? ''}
                          </td>
                        )
                      })}
                      <td>
                        {p.is_local ? null : (
                          <div className="flex flex-col">
                            <button data-action="disconnect-peer" data-id={p.peer_id}>
                              Disconnect
                            </button>
                            <button data-action="open-channel" data-id={p.peer_id}>
                              Open Channel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            'Loading Peers'
          )}
        </div>
      </main>
    </div>
  )
}
