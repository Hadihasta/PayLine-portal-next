import React from 'react'
import Image from 'next/image'
import { SidebarTrigger } from '@/components/ui/sidebar'
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
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
]

// navbar props interface
interface NavbarProps {
  label?: string
  src?: string
}

// gunakan label untuk judul navbar
// gunakan src untuk gambar profil, jika tidak ada gunakan gambar default
const Navbar = ({ label, src }: NavbarProps) => {
  return (
 <>
      <div className="flex justify-between items-center h-[6vh] w-full border border-greyBorder bg-white px-4">
        <div className="font-bold text-xl">{label}</div>

        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={src ? src : './asset/Template/Avatar.svg'}
            alt="profile-placeholder"
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </>
  )
}

export default Navbar
