'use client'
import type { FC } from 'react'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { InvoiceStatus } from '../../common'
import { useQuery } from '@tanstack/react-query'
import { fetchInvoices, fetchUdtInfo, REFETCH_INTERVAL } from '@/app/common'
import { OrderActions } from './order-actions'

export const OrderList: FC<{ status: InvoiceStatus }> = ({ status }) => {
  const { data: invoicesData } = useQuery({
    queryKey: ['invoices', status],
    queryFn: () =>
      fetchInvoices({
        status_list: status,
      }),
    refetchInterval: REFETCH_INTERVAL,
    refetchOnWindowFocus: true,
  })

  const { data: udtData } = useQuery({
    queryKey: ['udt-info'],
    queryFn: fetchUdtInfo,
    refetchOnWindowFocus: true,
  })

  const totalPage = invoicesData ? Math.ceil(invoicesData.result.page.total / invoicesData.result.page.page_size) : 1

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Memo</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoicesData?.result.list.map((i) => {
          const tokenName = !i.udt_type_script_hash
            ? 'CKB'
            : udtData?.result.find((u) => u.script_hash === i.udt_type_script_hash)?.name
          const memo = JSON.stringify({
            merchant: i.order?.merchant_id,
            quota: i.order?.quota,
            detail: i.order?.detail,
          })
          return (
            <TableRow key={i.payment_hash}>
              <TableCell className="font-medium text-nowrap">{`${BigInt(i.amount).toLocaleString('en')} ${tokenName}`}</TableCell>
              <TableCell>{i.status}</TableCell>
              <TableCell>{i.description}</TableCell>
              <TableCell className="max-w-[200px] overflow-ellipsis overflow-hidden text-nowrap" title={memo}>
                {memo}
              </TableCell>
              <TableCell>{new Date(i.timestamp).toLocaleString()}</TableCell>
              <TableCell className="flex items-center gap-2 justify-end">
                <OrderActions address={i.address} paymentHash={i.payment_hash} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
      <TableCaption>{`Page ${invoicesData?.result.page.page_no} of ${totalPage}`}</TableCaption>
    </Table>
  )
}
