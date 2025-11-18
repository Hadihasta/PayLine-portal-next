import React from 'react'
import ViewMenuPage from '@/components/user-menu/menu/ViewMenuPage';



export default async function Page({ params }: {   params: Promise<{ slug: string }> }) {
   const { slug } = await params;
  return (
    <>
      <ViewMenuPage slug={slug}/>
    </>
  )
}
