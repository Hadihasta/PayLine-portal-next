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
  // useEffect(()=> {
  //   const getMenuId = async() => {
  //     try {
  //         const res = await getMenuByUserId()
  //     } catch (error) {

  //     }
  //   }
  //   console.log('fetch to get menu id ')
  // },[])

  const [formData, setFormData] = useState({
    menu_id: 0,
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
    try {
      //  console.log('Form data siap dikirim:', formData)
      const res = await postItemCreate(formData)
      console.log(res, ' <<<< ')
      // TODO: panggil API create menu di sini (misal ke /api/menus)
      // jangan lupa reset form
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="">
      {JSON.stringify(data)}
      <Card className="max-w-lg mx-auto shadow-md rounded-2xl ">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Add New Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
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
