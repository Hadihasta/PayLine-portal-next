import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const items = [
  {
    title: 'Store',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Manage Menu',
    url: '/manage-menu',
    icon: Inbox,
  },
  // {
  //   title: 'Calendar',
  //   url: '#',
  //   icon: Calendar,
  // },
  // {
  //   title: 'Search',
  //   url: '#',
  //   icon: Search,
  // },
  // {
  //   title: 'Settings',
  //   url: '#',
  //   icon: Settings,
  // },
]

const SidebarApp = () => {
  return (
      <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarGroup className='px-5 '>
          <div className="flex justify-between items-center">
               {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
            <div className='font-bold text-greenPrimary'>PAYLINE APP</div>
          </div>
       
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} >
                      <item.icon />
                      <span className='font-bold'>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SidebarApp
