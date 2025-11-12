'use client'
import { useEffect, useState } from 'react'
import { getAndCreateMenu } from '@/services/menuService'
import { getItemByMenuId } from '@/services/itemService'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import AddMenu from './AddMenu'
import ListMenu from './ListMenu'
import { ListMenuProps } from './ListMenu'

const MenuPage = () => {
  const { user } = useAuthStore()
  const router = useRouter()
  //   untuk pastikan sudah di hydrate dari local belum ke zustand
  const [isHydrated, setIsHydrated] = useState(false)
  const [item, setItem] = useState<ListMenuProps[]>([])

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      // kalau sudah set jadi true
      setIsHydrated(true)
    })
    // kalo belum balikin nilai awal
    setIsHydrated(useAuthStore.persist.hasHydrated())
    return unsub
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    if (!user) {
      console.log('User belum login, atau persist belum ada data')
    }
    const getMenu = async () => {
      // create / get menu
      const InitMenu = await getAndCreateMenu(Number(user?.id))
      // console.log(InitMenu)

      if (InitMenu) {
        const menuId = Number(InitMenu?.data.id)
        // get item
        const getItemExist = async () => {
          const res = await getItemByMenuId(menuId)
          
          // console.log(res)
          setItem(res.data)

        }
        getItemExist()
      }
    }
    getMenu()
  }, [isHydrated, user,])
  //   jalankan setiap ishydrated dan user berubah

  return (
    <div className="p-6">
      <div className="flex justify-center font-bold text-greenPrimary mt-3">Add Item To the Menu</div>
      <div className="grid grid-cols-3 gap-4">
        <AddMenu data={user} />
        {item.map((menu) => (
          <ListMenu
            key={menu.id}
            {...menu}
          />
        ))}
      </div>
    </div>
  )
}

export default MenuPage
