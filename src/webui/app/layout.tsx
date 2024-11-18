'use client'

import { useState } from 'react'
import localFont from 'next/font/local'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './globals.css'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SidebarProvider>
            <AppSidebar />
            {children}
            {/* <SidebarInset>{children}</SidebarInset> */}
          </SidebarProvider>
          <Toaster />
        </body>
      </html>
    </QueryClientProvider>
  )
}
