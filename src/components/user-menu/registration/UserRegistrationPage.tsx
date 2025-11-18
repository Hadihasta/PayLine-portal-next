'use client'

import React , {useState}from 'react'
import RegisterUserForm from './RegisterUserForm'
import PaymentMethod from '../payment-method/PaymentMethod'
import NavFooter from '../NavFooter'


interface getMenuBySlugProps {
  slug: string
}


const UserRegistrationPage = (props: getMenuBySlugProps) => {
    const [customerName, setCustomerName] = useState("");
    const { slug } = props


    
  const handleSubmitUser = () => {
    console.log("Triggered from NavFooter!" , customerName)

    // di sini kamu bisa ambil state dari RegisterUserForm pakai lifting state
    // atau pakai useRef untuk input name
  }

  return (
    <div className='flex flex-col min-h-screen'>
    <div className='p-6  grow '>
        <RegisterUserForm 
          slug={slug} 
          customerName={customerName}
          setCustomerName={setCustomerName}
        />
    </div> 
    {/* component go to menu ===> */}
    
    <NavFooter  onClickFooter={handleSubmitUser} />
      {/* <PaymentMethod/> */}
    </div>
  )
}

export default UserRegistrationPage
