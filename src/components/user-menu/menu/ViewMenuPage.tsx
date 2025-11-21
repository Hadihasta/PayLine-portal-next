'use client'
import React, { useEffect, useState } from 'react'
import { getMenuBySlug } from '@/services/menuService'
import MenuList from './MenuList'
import PaymentMethod from '../payment-method/PaymentMethod'

interface menuListProps {
  id: string
  category: string
  image_url: string
  name: string
  price: string
  is_active: boolean
}

interface ViewMenuPageProps {
  slug: string
}

const ViewMenuPage = (props: ViewMenuPageProps) => {
  const [tableData, setTableData] = useState(null)
  const [menus, setMenus] = useState<menuListProps[]>([])

  const { slug } = props

  useEffect(() => {
    const getMasterMenu = async () => {
      try {
        const res = await getMenuBySlug(slug)

        setMenus(res.menus.items)
        setTableData(res.table)
        console.log(res.menus.items)
      } catch (error) {
        console.log(error)
      }
    }

    getMasterMenu()
  }, [slug])

  return (
    <div className="p-6">
      {/* <div>{JSON.stringify(menus)}</div> */}
      <div className="flex justify-center font-bold text-greenPrimary">Menu</div>
      <div>Catergory bar here later</div>
     <div className="grid grid-cols-2 gap-4">
  {menus.map((menu) => (
    <MenuList key={menu.id} data={menu} />
  ))}
</div>


      <PaymentMethod />
    </div>
  )
}

export default ViewMenuPage
