import React from 'react'
import RegisterUserForm from './RegisterUserForm'
import PaymentMethod from '../payment-method/PaymentMethod'


interface getMenuBySlugProps {
  slug: string
}


const UserRegistrationPage = (props: getMenuBySlugProps) => {
    const { slug } = props

  return (
    <div>
    <div className='p-6 '>
      <RegisterUserForm   slug={slug} />
    </div> 
      <PaymentMethod/>
    </div>
  )
}

export default UserRegistrationPage
