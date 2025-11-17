import React from 'react'
import ViewMenuPage from '@/components/user-menu/ViewMenuPage'



export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  return (
    <div>
      <ViewMenuPage slug={slug}/>
    </div>
  )
}

