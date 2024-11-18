'use client'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchFinance, REFETCH_INTERVAL } from '../common'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Net, NetLabel } from './net'
import { EventList } from '@/components/event-list'

export default function Dashboard() {
  const { data: financeData } = useQuery({
    queryKey: ['info'],
    queryFn: fetchFinance,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnWindowFocus: true,
  })

  const nets = useMemo(() => {
    const _nets = new Map<
      NetLabel /*state*/,
      Map<
        string /* token id */,
        {
          name: string | null
          net: bigint
        }
      >
    >([[NetLabel.Total, new Map<string, { name: string | null; net: bigint }>()]])

    if (!financeData?.result) return _nets

    const { udt_info, channel } = financeData.result

    Object.entries(channel).forEach(([tokenId, stateSet]) => {
      const tokenName =
        (tokenId.startsWith('0x') ? udt_info.find((u) => u.script_hash === tokenId)?.name : tokenId) ?? null
      Object.entries(stateSet).forEach(([state, { net }]) => {
        const netByToken =
          _nets.get(state as any) ??
          new Map<
            string /* token id */,
            {
              name: string
              net: bigint
            }
          >()
        netByToken.set(tokenId, { name: tokenName, net: BigInt(net) })
        _nets.set(state as any, netByToken)

        // update total
        const _total = _nets.get(NetLabel.Total)!
        const netInTotal = _total.get(tokenId) ?? {
          name: tokenName,
          net: BigInt(0),
        }
        netInTotal.net += BigInt(net)
        _total.set(tokenId, netInTotal)
        _nets.set(NetLabel.Total, _total)
      })
    })
    return _nets
  }, [financeData])

  return (
    <div className="w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex flex-col gap-8 items-center p-10">
        <div className="w-full grid grid-cols-3 gap-10">
          {nets.entries().map(([state, tokens]) => {
            return <Net key={state} label={state} tokens={Array.from(tokens)} />
          })}
        </div>
        <div className="w-full">
          <EventList />
        </div>
      </main>
    </div>
  )
}
