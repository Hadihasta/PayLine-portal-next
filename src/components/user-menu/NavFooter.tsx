'use client'
import React from 'react'
import { ChevronRight } from 'lucide-react'

const NavFooter = ({ onClickFooter }: { onClickFooter: () => void }) => {

  
  return (
    //  bg-linear-to-r from-greenPrimary to-greenHover
    <div className=" mt-auto min-h-[10vh] flex items-center justify-end px-3 shadow-[0_0_15px_4px_rgba(0,0,0,0.15)] ">
     {/* button direct to menu */}
      <div className="flex  h-full">
        <button     onClick={onClickFooter} className='bg-greenPrimary flex rounded-lg item p-2 '>
        <span className=' font-bold text-white'>Go To Menu</span>
        <ChevronRight />
        </button>
      </div>
    </div>
  )
}

export default NavFooter
