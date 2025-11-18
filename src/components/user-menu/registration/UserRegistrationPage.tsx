'use client'

import React, { useState, useEffect } from 'react'
import RegisterUserForm from './RegisterUserForm'
import NavFooter from '../NavFooter'
import { registerUser } from '@/services/authservice'
import PaymentMethod from '../payment-method/PaymentMethod'

interface getMenuBySlugProps {
  slug: string
}

const UserRegistrationPage = (props: getMenuBySlugProps) => {
  const [customerName, setCustomerName] = useState('')
  const [validator, setValidator] = useState(false)
  const { slug } = props

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
      // const res = await registerUser(customerName)
      console.log(customerName)
    } catch (error) {
      console.log(error)
    }

    // di sini kamu bisa ambil state dari RegisterUserForm pakai lifting state
    // atau pakai useRef untuk input name
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
      {/* <PaymentMethod/> */}
    </div>
  )
}

export default UserRegistrationPage
