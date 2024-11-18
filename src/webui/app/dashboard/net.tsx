import type { FC } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export enum NetLabel {
  Total = 'TOTAL',
  ChannelReady = 'CHANNEL_READY',
  CLOSED = 'CLOSED',
}
export interface NetProps {
  label: NetLabel
  tokens: Array<
    [
      string /* token id */,
      {
        name: string | null
        net: bigint
      },
    ]
  >
}
const getCardMeta = (label: NetLabel) => {
  switch (label) {
    case NetLabel.Total:
      return {
        label: 'Total Nets',
        description: 'Includes pending and finalized nets',
      }
    case NetLabel.ChannelReady:
      return {
        label: 'Pending Nets',
        description: 'Nets locked in channels',
      }
    case NetLabel.CLOSED:
      return {
        label: 'Finalized Nets',
        description: 'Nets been claimed from channels',
      }
    default: {
      return { label, description: '' }
    }
  }
}
export const Net: FC<NetProps> = ({ label, tokens }) => {
  const meta = getCardMeta(label)
  return (
    <Card>
      <CardHeader>
        <CardTitle>{meta.label}</CardTitle>
        <CardDescription>{meta.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Token</TableHead>
              <TableHead className="text-right">Net</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map(([tokenId, { name, net }]) => {
              return (
                <TableRow key={tokenId}>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell className="text-right">{net.toLocaleString('en')}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
