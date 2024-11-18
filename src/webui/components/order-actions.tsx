'use client'
import type { FC } from 'react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/hooks/use-toast'

export const OrderActions: FC<{
  address: string
  paymentHash: string
}> = ({ address, paymentHash }) => {
  const handleCopy = () => {
    window.navigator.clipboard.writeText(address).then(() => {
      toast({
        description: 'Copied',
      })
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Share</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Share</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopy}>Copy Address</DropdownMenuItem>
        <DropdownMenuItem>
          <Link target="_blank" href={`/payment?${new URLSearchParams({ payment_hash: paymentHash })}`}>
            Fast Pay
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
