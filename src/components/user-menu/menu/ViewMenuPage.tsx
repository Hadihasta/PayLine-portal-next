'use client'
import React, {  useEffect, useState } from 'react'
import { getMenuBySlug } from '@/services/menuService'
import MenuList from './MenuList'
import PaymentMethod from '../payment-method/PaymentMethod'

interface ViewMenuPageProps {
  slug: string
}

const ViewMenuPage = (props: ViewMenuPageProps) => {
  const [tableData, setTableData] = useState(null)
  const [menus, setMenus] = useState([])

  const { slug } = props

  useEffect(() => {
    const getMasterMenu = async () => {
      try {
        const res = await getMenuBySlug(slug)
        console.log(res.table)
        // disini ada table number dan store id dan slug juga ada
        setTableData(res.table)
      } catch (error) {
        console.log(error)
      }
    }

    getMasterMenu()
  }, [slug])

  return (
    <div className="p-6">
        <div>{JSON.stringify(tableData)}</div>
      <div className="flex justify-center font-bold text-greenPrimary">Menu</div>
    
      <MenuList />
      <PaymentMethod />
    </div>
  )
}

export default ViewMenuPage
