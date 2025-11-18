import React from 'react'
import UserRegistrationPage from '@/components/user-menu/registration/UserRegistrationPage'


export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  return (
    <>
      {/* <ViewMenuPage slug={slug}/> */}
      <UserRegistrationPage slug={slug}/>
    </>
  )
}
