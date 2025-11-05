'use client'
import { useEffect, useState } from 'react'
import { getAndCreateMenu } from '@/services/menuService'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import AddMenu from './AddMenu'

const MenuPage = () => {
  const { user } = useAuthStore()
  const router = useRouter()
  //   untuk pastikan sudah di hydrate dari local belum ke zustand
  const [isHydrated, setIsHydrated] = useState(false)

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
      const InitMenu = await getAndCreateMenu(Number(user?.id))
      console.log(InitMenu)
    }
    getMenu()
  }, [isHydrated, user])
  //   jalankan setiap ishydrated dan user berubah

  return <div>
      <div className="flex justify-center font-bold text-greenPrimary mt-3">Add Item To the Menu</div>
    <AddMenu/>
  </div>
}

export default MenuPage
