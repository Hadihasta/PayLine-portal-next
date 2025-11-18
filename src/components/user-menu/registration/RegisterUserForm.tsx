'use client'
import React, { useState, useEffect } from 'react'
import Button from '@/components/global/Button'
import clsx from 'clsx'
import { getMenuBySlug } from '@/services/menuService'
import type { GetMenuBySlugRes } from '@/services/menuService'
import Image from 'next/image'

interface getMenuBySlugProps {
  slug: string
  customerName : string
  setCustomerName  :(name : string) => void
}

const RegisterUserForm = (props: getMenuBySlugProps) => {
  // const [tableData, setTableData] = useState<GetMenuBySlugRes | null>(null)
const {customerName ,setCustomerName} = props
  const [tableNumber, setTableNumber] = useState('')

  const { slug } = props

  useEffect(() => {
    const getMasterMenu = async () => {
      try {
        const res = await getMenuBySlug(slug)
        console.log(res)
        // disini ada table number dan store id dan slug juga ada
        // setTableData(res)
        setTableNumber(res.table.table_number)
      } catch (error) {
        console.log(error)
      }
    }

    getMasterMenu()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center font-bold text-greenPrimary">Customer Information</div>
        <div className="relative">
          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className={clsx(
              'peer w-full  border rounded-lg px-4 pt-4 pb-2 font-bold text-greenPrimary text-sm outline-none transition-all',
              'border-gray-300 focus:border-greenPrimary focus:ring-1 focus:ring-greenPrimary'
            )}
          />

          <label
            htmlFor="customerName"
            className={clsx(
              'absolute left-3 bg-white px-1 text-xs transition-all duration-200 text-greenPrimary font-bold',
              customerName
                ? '-top-2 left-3 text-[11px] text-greenPrimary'
                : 'top-3.5 text-PlaceHolderGrey text-sm peer-placeholder-shown:translate-y-1',
              'peer-focus:-top-2 peer-focus:left-3 peer-focus:text-[11px] peer-focus:text-greenPrimary'
            )}
          >
            Name <span className="text-redDanger">*</span>
          </label>
        </div>

        <div className="relative">
          <label className="text-greenPrimary font-semibold ">Table Number</label>
          <input
            disabled
            id="tableNumber"
            type="text"
            className={clsx(
              'peer w-full border rounded-lg px-4 pt-3 pb-2 text-sm outline-none transition-all text-greenPrimary font-bold bg-gray-100 cursor-not-allowed',
              'border-gray-300 focus:border-greenPrimary focus:ring-1 focus:ring-greenPrimary'
            )}
            value={tableNumber}
          />
        </div>
        <div className='relative h-100 w-full mt-6'>
          <Image
            src="/asset/vektor/vektor-form-input-720.svg"
            alt="cashier"
            className="rounded-md  "
            fill
          />
        </div>
      </div>
    </>
  )
}

export default RegisterUserForm
