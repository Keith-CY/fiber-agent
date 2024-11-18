'use client'

import * as React from 'react'
import { Bot, GalleryVerticalEnd, Settings2, SquareTerminal } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'Demo',
    email: 'help@random-walk.co.jp',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Random Walk',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Fiber Agent',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
        },
        {
          title: 'Account',
          url: '/account',
        },
        {
          title: 'Orders',
          url: '/orders',
        },
        {
          title: 'Merchants',
          url: '/merchants',
        },
        {
          title: 'Settings',
          url: '/settings',
        },
      ],
    },
    {
      title: 'Fiber',
      url: '/fiber',
      icon: Bot,
      items: [
        {
          title: 'Local Node',
          url: '/local-node',
        },
        {
          title: 'Channels',
          url: '/channels',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
