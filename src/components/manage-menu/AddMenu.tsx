'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { getMenuByUserId } from '@/services/menuService'
import { postItemCreate } from '@/services/itemService'
import { AuthUser } from '@/store/authStore'

export interface AddMenuProps {
  data: AuthUser | null
}



const AddMenu: React.FC<AddMenuProps> = ({ data }) => {
  const [menuId,setMenuId] = useState<number>(0)

useEffect(() => {
  const getMenuId = async () => {
    if (!data?.id) return 
    try {
      const res = await getMenuByUserId(parseInt(data.id))
      setMenuId(res.data.id)
    } catch (error) {
      console.error(error)
    }
  }

  getMenuId()
}, [data]) 



  const [formData, setFormData] = useState({
    menu_id: String(menuId) || "0",
    name: '',
    price: 0,
    category: '',
    is_active: true,
    file: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    setFormData((prev) => ({ ...prev, file: file }))
  }

const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault() // cegah reload
  // sementara refetch dulu setelah penambahan item nanti dapat menggunakan tanstack dan fetch ketika auto focus atau setelah penambahan
  // bisa juga pakai web socket biar real time tapi di setup lewat backend
  if (!formData.file) {
    console.error("File belum dipilih!")
    return
  }

  try {
  
    const fd = new FormData()
    fd.append("menu_id", String(menuId))
    fd.append("name", formData.name)
    fd.append("price", String(formData.price))
    fd.append("category", formData.category)
    fd.append("is_active", String(formData.is_active))
    fd.append("file", formData.file) 

 
    const res = await postItemCreate(fd)
    console.log("Item berhasil dikirim:", res)

    
    setFormData({
      menu_id: String(menuId) || "0",
      name: "",
      price: 0,
      category: "",
      is_active: true,
      file: null,
    })

    if (res.status === 201) { 
      location.reload()
    }
  } catch (error) {
    console.error("Gagal upload item:", error)
  }
}

  return (
    <div className="">
      <Card className="max-w-lg mx-auto shadow-md rounded-2xl ">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Add New Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            // onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="name">Menu Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Fried Rice"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="e.g., 25000"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="e.g., Main Dish"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="file">Upload Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_active">Available</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))}
              />
            </div>

            <Button
            onClick={handleSubmit}
              type="submit"
              className="w-full mt-4"
            >
              Add to Menu
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddMenu
