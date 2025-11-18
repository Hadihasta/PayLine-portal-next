import React from 'react'
import UserRegistrationPage from '@/components/user-menu/registration/UserRegistrationPage'


export default async function Page({ params }: {   params: Promise<{ slug: string }> }) {
   const { slug } = await params;
  return (
    <>
      {/* <ViewMenuPage slug={slug}/> */}
      <UserRegistrationPage slug={slug}/>
    </>
  )
}
