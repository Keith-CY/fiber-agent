'use client'
import { fetchAdmin } from '../common'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useQuery } from '@tanstack/react-query'
import { scriptToAddress } from '@nervosnetwork/ckb-sdk-utils'
import { CHAIN_TYPE } from '../../../common'

const REFETCH_INTERVAL = 10000

export default function Account() {
  const { data: adminData } = useQuery({
    queryKey: ['admin'],
    queryFn: fetchAdmin,
  })
  const script = adminData?.result.script
  const address = script
    ? scriptToAddress(
        {
          codeHash: script.code_hash,
          hashType: script.hash_type,
          args: script.args,
        },
        CHAIN_TYPE === 'mainnet',
      )
    : null

  return (
    <div className="w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Account</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex flex-col gap-8 items-center p-10">
        <div>Address and QR Code</div>
        <div className="grid grid-rows-3">
          <div>on chain balance</div>

          <div> local channels</div>
        </div>

        <div>local balance distribution</div>
      </main>
    </div>
  )
}
