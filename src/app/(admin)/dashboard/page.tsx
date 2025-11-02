'use client'
import { getStoreByUserId } from '@/services/storeService'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'

const Page = () => {
  const [isHydrated, setIsHydrated] = useState(false)
  const [store, setStore] = useState([])
  // destructure useAuthStore
  const { token, user } = useAuthStore()

  // tahap 1 useEffect (pastikan rehydrate succes dan restore zustand)
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
        console.log('User dan Token sudah siap:', user, token)
        const res = await getStoreByUserId(user.id)
        setStore(res.data)
      } catch (error) {
        console.error('Gagal ambil store:', error)
      }
    }
    getStore()
  }, [isHydrated, user, token])

  return (
    <div className="px-6 pt-10 flex flex-col ">
     {store.length > 1 ? <>
        <div className="flex justify-center font-bold text-greenPrimary">Create Table List for your store</div>
        <div className="mt-3">
          <div className="border rounded-md shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 font-semibold">Table Number</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">QR STRUK</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{`Unknown`}</td>
                  <td className="px-4 py-3">{`GENERATE TABLE QR `}</td>
                  <td className="px-4 py-3">{`GENERATE QR STRUK`}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end items-center p-3 bg-gray-50">
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">1</button>
            </div>
          </div>
        </div>
      </> :
      <>
        <div className="flex justify-center font-bold text-greenPrimary">Give Your Store Name</div>
      </>
      }
    </div>
  )
}

export default Page
