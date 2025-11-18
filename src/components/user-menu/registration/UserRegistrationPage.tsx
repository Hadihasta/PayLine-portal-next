import React from 'react'
import RegisterUserForm from './RegisterUserForm'
import PaymentMethod from '../payment-method/PaymentMethod'
import NavFooter from '../NavFooter'


interface getMenuBySlugProps {
  slug: string
}


const UserRegistrationPage = (props: getMenuBySlugProps) => {
    const { slug } = props

  return (
    <div className='flex flex-col min-h-screen'>
    <div className='p-6  grow '>
      <RegisterUserForm   slug={slug} />
    </div> 
    {/* component go to menu ===> */}
    
    <NavFooter />
      {/* <PaymentMethod/> */}
    </div>
  )
}

export default UserRegistrationPage
