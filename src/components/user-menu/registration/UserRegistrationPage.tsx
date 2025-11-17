import React from 'react'
import RegisterUserForm from './RegisterUserForm'


interface getMenuBySlugProps {
  slug: string
}


const UserRegistrationPage = (props: getMenuBySlugProps) => {
    const { slug } = props

  return (
    <div className='p-6 '>
      <RegisterUserForm   slug={slug} />
    </div> 
  )
}

export default UserRegistrationPage
