'use client'
import { getStoreByUserId, createStore } from '@/services/storeService'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import clsx from 'clsx'
import Button from '@/components/global/Button'
import { ToasterNotif } from '@/components/global/ToasterNotif'
import StoreTable from '@/components/store/Store-Table'


interface Store {
  id: string
  name: string
  created_at: string
  updated_at: string
}

const Page = () => {
  const [isHydrated, setIsHydrated] = useState(false)
  const [store, setStore] = useState<Store[]>([])
  // destructure useAuthStore
  const { token, user } = useAuthStore()
  const [storeName, setStoreName] = useState('')

  // tahap 1 useEffect (pastikan rehydrate succes dan restore zustand)
  //ambil dari lokal storage
  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true)
    })
    setIsHydrated(useAuthStore.persist.hasHydrated())
    return unsub
  }, [])

  // tahap 2 jalankan get store
  useEffect(() => {
    if (!isHydrated) return
    if (!user || !token) {
      console.log('User belum login, atau persist belum ada data')
      return
    }

    const getStore = async () => {
      try {
        const res = await getStoreByUserId(user.id)
        setStore(res.data.data)
      } catch (error) {
        console.error('Gagal ambil store:', error)
      }
    }
    getStore()
  }, [isHydrated, user, token])

  const handleSubmit = async () => {
    try {
      if (!user) {
        ToasterNotif('error', 'User not found. Please login again.', '#dc2626')
        return
      }

      if (storeName.trim() === '') {
        ToasterNotif('warning', `Store Name Cannot be Empty...`, '#dc2626')
        return
      } else {
        const payload = {
          user_id: Number(user?.id),
          name: storeName,
        }
        const res = await createStore(payload)
        // console.log(res)
        // setAuth(res.token, res.user)
        ToasterNotif('success', `Success Named Store As ${storeName}`, '#16a34a')

        const newStore = await getStoreByUserId(String(user.id))
        setStore(newStore.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="px-6 pt-10 flex flex-col ">
      {store.length === 0 ? (
        <>
          <div className="flex justify-center font-bold text-greenPrimary">Input Your Name</div>
          <div className="relative">
            <input
              id="storeName"
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className={clsx(
                'peer w-full border rounded-lg px-4 pt-5 pb-2 text-sm outline-none transition-all',
                'border-gray-300 focus:border-greenPrimary focus:ring-1 focus:ring-greenPrimary'
              )}
              placeholder=" "
            />
            <label
              htmlFor="storeName"
              className={clsx(
                'absolute left-3 bg-white px-1 text-xs transition-all duration-200',
                storeName
                  ? '-top-2 left-3 text-[11px] text-greenPrimary'
                  : 'top-3.5 text-PlaceHolderGrey text-sm peer-placeholder-shown:translate-y-1',
                'peer-focus:-top-2 peer-focus:left-3 peer-focus:text-[11px] peer-focus:text-greenPrimary'
              )}
            >
              Store Name
            </label>

            <Button
              color={'green'}
              label="Create Store"
              className={' mt-3 text-white font-bold'}
              onClick={handleSubmit}
            />
          </div>
        </>
      ) : (
        <>
       <StoreTable  id={store[0].id} name={store[0].name}/>
       {/* <div>{JSON.stringify(store[0].id)}</div> */}
        </>
      )}
    </div>
  )
}

export default Page
