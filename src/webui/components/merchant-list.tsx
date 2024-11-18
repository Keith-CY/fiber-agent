import { useQuery } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { NewInvoiceDialog } from '@/components/new-invoice-dialog'
import { addMerchant, fetchMerchants, REFETCH_INTERVAL } from '@/app/common'

export const MerchantList = () => {
  const { data: merchantsData, refetch: refetchMerchants } = useQuery({
    queryKey: ['merchants'],
    queryFn: fetchMerchants,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnWindowFocus: true,
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
        case 'copy-id': {
          if (!id) {
            return
          }
          window.navigator.clipboard.writeText(id).then(() => {
            toast({
              description: 'Copied',
            })
          })
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
    <div className="w-full" onClick={handleActionClick}>
      <div className="text-right">
        <Button data-action="new-merchant">Add Merchant</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {merchantsData?.result.map((m) => {
            return (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell
                  className="text-nowrap overflow-hidden overflow-ellipsis max-w-24  md:max-w-60"
                  title={m.description ?? ''}
                >
                  {m.description}
                </TableCell>
                <TableCell title={m.contact ?? ''}>{m.contact}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <NewInvoiceDialog merchantId={m.id} />

                  <Button data-action="copy-id" data-id={m.id}>
                    Copy ID
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
