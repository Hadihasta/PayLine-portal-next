'use client'

import React, { useState, useEffect } from 'react'
import RegisterUserForm from './RegisterUserForm'
import NavFooter from '../NavFooter'
import { useAuthStore } from '@/store/authStore'
import { registerUser } from '@/services/authservice'
import { useRouter } from 'next/navigation'


interface getMenuBySlugProps {
  slug: string
}

const UserRegistrationPage = (props: getMenuBySlugProps) => {
  const [customerName, setCustomerName] = useState('')
  const [validator, setValidator] = useState(false)
  const { slug } = props

  // zustand
  const setAuth = useAuthStore((state) => state.setAuth)
  
  const router = useRouter()
  
 

  useEffect(() => {
    if (customerName.trim() !== '') {
      setValidator(false)
    }
  }, [customerName])

  const handleSubmitUser = async () => {
    if (customerName.trim() === '') {
      setValidator(true)
      return
    }
    try {
      const res = await registerUser(customerName)
      setAuth(res.token, res.data)
      console.log(res)
      if(res.status === 201){ 
           router.push(`/menu/order/${slug}`)
      }
     
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6  grow ">
        <RegisterUserForm
          slug={slug}
          customerName={customerName}
          setCustomerName={setCustomerName}
          validator={validator}
        />
      </div>
      <NavFooter onClickFooter={handleSubmitUser} />
    </div>
  )
}

export default UserRegistrationPage
