import React from 'react'

export  interface ListMenuProps {
  id: string
  menu_id: string
  name: string
  price: string
  image_url: string
  category: string
  is_active: string
}

const ListMenu: React.FC<ListMenuProps> = (props) => {
  const {  name, price, image_url, category, is_active } = props

  return (
    <div className="p-4 border rounded-lg">
      <img src={image_url} alt={name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <p className="text-gray-500">{category}</p>
      <p className="text-black font-bold">IDR.{price}</p>
      <p
        className={`text-sm ${
          is_active === 'true' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {is_active === 'true' ? 'Available' : 'Not Available'}
      </p>
    </div>
  )
}

export default ListMenu
