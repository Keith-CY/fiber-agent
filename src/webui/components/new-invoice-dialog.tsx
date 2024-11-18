import { useEffect, useState, type FC } from 'react'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { fetchUdtInfo, newInvoice } from '@/app/common'
import { Currency } from '../../common'
import { ToastAction } from '@radix-ui/react-toast'
import { Copy, Receipt } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

const FormSchema = z.object({
  amount: z.string(),
  token: z.string(),
  currency: z.enum([Currency.Fibt, Currency.Fibb, Currency.Fibd]),
  description: z.string().optional(),
  quota: z.string().optional(),
  memo: z.string().optional(),
})

export const NewInvoiceDialog: FC<{ merchantId: string }> = ({ merchantId }) => {
  const [open, setOpen] = useState(false)

  const { data: udtInfoData } = useQuery({
    queryKey: ['udt-info'],
    queryFn: fetchUdtInfo,
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: '20000000000',
      token: 'CKB',
      currency: Currency.Fibt,
      description: `Description of the order #${Date.now()}`,
      memo: `Memo of the order #${Date.now()}`,
    },
  })

  useEffect(() => {
    if (!open) form.reset()
  }, [open, form])

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const order = {
      quota: values.quota?.toString(),
      merchantId,
      detail: {
        description: values.memo ?? '',
      },
    }
    let udtTypeScript
    if (values.token !== 'CKB') {
      const udt = udtInfoData?.result.find((u) => u.script_hash === values.token)
      if (!udt) {
        toast({
          description: 'Selected UDT not found',
        })
        return
      }
      udtTypeScript = {
        code_hash: udt.code_hash,
        hash_type: udt.hash_type,
        args: udt.args,
      }
    }

    try {
      const res = await newInvoice(
        BigInt(values.amount),
        values.description ?? '',
        values.currency,
        null,
        order,
        udtTypeScript,
      )
      const { address, paymentHash } = res.result
      setOpen(false)
      toast({
        title: 'Order is created and invoice address',
        description: (
          <pre className="mt-2 rounded-md bg-slate-950 p-4 text-wrap break-all">
            <code className="text-white">{address}</code>
          </pre>
        ),
        action: (
          <ToastAction altText="Share" className="flex flex-col gap-2">
            <Button
              onClick={() =>
                window.navigator.clipboard.writeText(address).then(() => {
                  toast({ description: 'Copied' })
                })
              }
            >
              <Copy />
            </Button>
            <Button>
              <Link href={`/payment?payment_hash=${paymentHash}`} target="_blank">
                <Receipt />
              </Link>
            </Button>
          </ToastAction>
        ),
      })
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: 'Fail to create the order',
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>New Invoice</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Order</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Amount" {...field} />
                    </FormControl>
                    <FormDescription>The token amount of the order</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the token" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CKB">CKB</SelectItem>
                        {udtInfoData?.result.map((u) => (
                          <SelectItem key={u.script_hash} value={u.script_hash}>
                            {u.name ?? u.script_hash}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>The currency of the token</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Currency).map((c) => (
                          <SelectItem key={c} value={c} disabled={c !== Currency.Fibt}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>The currency of the token</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Description" {...field} />
                    </FormControl>
                    <FormDescription>Description of the order</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quota"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quota</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Quota" {...field} />
                    </FormControl>
                    <FormDescription>The quota of the order</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="memo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Memo</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Memo" {...field} />
                    </FormControl>
                    <FormDescription>Memo for the order</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogTrigger asChild>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                  Submit
                </Button>
              </DialogTrigger>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
