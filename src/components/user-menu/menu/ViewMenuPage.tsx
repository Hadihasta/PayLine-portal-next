'use client'
import React, { useEffect, useState } from 'react'
import { getMenuBySlug } from '@/services/menuService'

interface ViewMenuPageProps {
  slug: string
}

const ViewMenuPage = (props: ViewMenuPageProps) => {
  const [tableData, setTableData] = useState(null)

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
  }, [])

  return (
    <>
      <div>ViewMenuPage</div>
      <div>{slug}</div>
    </>
  )
}

export default ViewMenuPage
