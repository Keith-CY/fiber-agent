import { fetchEvents, fetchUdtInfo, REFETCH_INTERVAL } from '@/app/common'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { EventTopic, EventType } from '../../common'

export const EventList = () => {
  const { data: eventsData } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnWindowFocus: true,
  })

  const { data: udtData } = useQuery({
    queryKey: ['udt-info'],
    queryFn: fetchUdtInfo,
    refetchOnWindowFocus: true,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Topic</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Detail</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventsData?.result.list.map((e) => {
              let detail: string | null = null
              switch (e.topic) {
                case EventTopic.Invoice: {
                  switch (e.type) {
                    case EventType.New: {
                      // new invoice
                      const q = BigInt(e.quantity ?? 0).toLocaleString()
                      const tokenId = e.description
                      if (!tokenId) {
                        detail = `${q} CKB`
                        break
                      }
                      const tokenName = udtData?.result.find((i) => i.script_hash === tokenId)?.name
                      detail = `${q} ${tokenName}`

                      break
                    }
                    case EventType.Update: {
                      // invoice updated
                      detail = `Order ${e.target} ${e.description}`
                      break
                    }
                    default:
                      break
                  }
                  break
                }
                case EventTopic.Channel: {
                  switch (e.type) {
                    case EventType.New: {
                      // new channel
                      const q = BigInt(e.quantity ?? 0).toLocaleString()
                      const tokenId = e.description

                      if (tokenId) {
                        const tokenName = udtData?.result.find((i) => i.script_hash === tokenId)?.name
                        detail = `Local balance: ${q} ${tokenName}`
                        break
                      } else {
                        detail = `Local balance: ${q} CKB`
                        break
                      }
                    }
                    case EventType.Update: {
                      // channel updated
                      detail = `Channel ${e.target} ${e.description}`
                      break
                    }
                    default: {
                      break
                    }
                  }

                  break
                }
                case EventTopic.Peer: {
                  detail = e.description
                  break
                }
                case EventTopic.Merchant: {
                  if (e.type === EventType.New) {
                    detail = `Merchant id: ${e.description}`
                  }
                  break
                }
                case EventTopic.Account: {
                  detail = `Script hash: ${e.description}`

                  break
                }
              }
              return (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.topic}</TableCell>
                  <TableCell>{e.type}</TableCell>
                  <TableCell>{detail}</TableCell>
                  <TableCell className="text-right">{new Date(e.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
