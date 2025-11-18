'use client'
import React from 'react'

interface menuListProps {
  key: string
  data: {
    id: string
  category: string
  image_url: string
  name: string
  price: string
  is_active: boolean
  }
}

const MenuList = (props: menuListProps) => {
  const { id, category,image_url, name, price,is_active } = props.data
  return (
    <>
      <div>{name}</div>
    </>
  )
}

export default MenuList
