'use client'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OrderList } from '@/components/order-list'
import { InvoiceStatus } from '../../../common'

export default function Orders() {
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
              <BreadcrumbPage>Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex flex-col gap-8 items-center p-10">
        <div>unpaid amount: coming soon</div>
        <Tabs defaultValue="open" className="w-full">
          <TabsList>
            <TabsTrigger value="open">Open Orders</TabsTrigger>
            <TabsTrigger value="paid">Paid Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="open">
            <OrderList status={InvoiceStatus.Open} />
          </TabsContent>
          <TabsContent value="paid">
            <OrderList status={InvoiceStatus.Paid} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
