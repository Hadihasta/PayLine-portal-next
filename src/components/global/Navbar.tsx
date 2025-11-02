import React from 'react'
import Image from 'next/image'
import { SidebarTriggerOut} from '@/components/ui/sidebar'



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
      <div className="flex  items-center h-[6vh] w-full border border-greyBorder bg-white px-4">
        <SidebarTriggerOut/>
        <div className="font-bold text-xl flex-none">{label}</div>
        <div className='flex flex-1 justify-end'>
        <div className="w-8 h-8   rounded-full overflow-hidden border border-gray-300">
          <Image
            src={src ? src : './asset/Template/Avatar.svg'}
            alt="profile-placeholder"
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
