'use client'
import React from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'

interface MenuListProps {
  data: {
    id: string
    category: string
    image_url: string
    name: string
    price: string
    is_active: boolean
  }
  onAdd?: (id: string) => void
}

const MenuList = ({ data, onAdd }: MenuListProps) => {
  const { id, image_url, name, price ,is_active} = data

  return (
    <div className="w-[150px] rounded-xl shadow-md bg-white p-3 flex flex-col gap-2">
      {/* Image container */}
      <div className="w-full h-[90px] relative rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Name */}
      <div className="font-semibold text-sm text-gray-900">{name}</div>

      {/* Price + Add button */}
      <div className="flex justify-between items-center">
        <span className="font-bold text-green-600 text-sm">${price}</span>

        <button
          onClick={() => onAdd?.(id)}
          className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center active:scale-95 transition"
        >
          <Plus className="text-white" size={18} />
        </button>
      </div>
    </div>
  )
}

export default MenuList
