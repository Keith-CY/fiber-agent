'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { fastPay, fetchInvoice, fetchUdtInfo } from '../common'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

export default function PayInvoice() {
  const search = useSearchParams()
  const paymentHash = search.get('payment_hash')
  const { data: invoiceData } = useQuery({
    queryKey: ['invoice', paymentHash],
    queryFn: () => (paymentHash ? fetchInvoice(paymentHash) : undefined),
    enabled: !!paymentHash,
    refetchOnWindowFocus: true,
  })

  const { data: udtData } = useQuery({
    queryKey: ['udt-info'],
    queryFn: fetchUdtInfo,
    refetchOnWindowFocus: true,
  })

  if (!invoiceData) {
    return (
      <div className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="ml-1" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Tools</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Fast Pay</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-col gap-8 items-center p-10">Loading</main>
      </div>
    )
  }

  const tokenId = invoiceData.result.udt_type_script_hash
  const tokenName = tokenId ? udtData?.result.find((u) => u.script_hash === tokenId)?.name : 'CKB'
  const amount = `${invoiceData.result.amount} ${tokenName}`
  const description = invoiceData.result.description

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.stopPropagation()
    e.preventDefault()
    const elm = e.currentTarget
    const rpcAddr = elm['rpc']?.value
    if (!paymentHash || !rpcAddr) return
    const confirm = window.confirm(`Confirm to pay ${amount} for payment hash ${paymentHash}`)
    if (!confirm) {
      toast({ description: 'Payment cancelled' })
      return
    }
    try {
      const res = await fastPay(paymentHash, rpcAddr)
      console.log(res)
      toast({
        title: 'Payment sent',
        description: (
          <pre className="mt-2 rounded-md bg-slate-950 p-4 text-wrap break-all">
            <code className="text-white">{JSON.stringify(res.result)}</code>
          </pre>
        ),
      })
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: 'Payment failed',
          description: (
            <pre className="mt-2 rounded-md bg-slate-950 p-4 text-wrap break-all">
              <code className="text-white">{e.message}</code>
            </pre>
          ),
        })
      }
    }
  }

  return (
    <div className="w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Tools</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Fast Pay</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex flex-col gap-8 items-center p-10">
        <Card>
          <CardHeader>
            <CardTitle>{`Fast Pay`}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="w-[340px] break-all">
                <span>Pay</span>
                <b className="px-1">{amount}</b>
                <span>{`for payment hash ${paymentHash}`}</span>
                <br />
                <b className="mt-2">{`Status: ${invoiceData.result.status}`}</b>
              </div>
              <Input placeholder="RPC of payer node" id="rpc" />
              <Button type="submit">Pay</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
