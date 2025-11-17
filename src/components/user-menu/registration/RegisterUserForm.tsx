'use client'
import React , { useState} from 'react'
import Button from '@/components/global/Button'
import clsx from 'clsx'

const RegisterUserForm = () => {
    const [storeName, setStoreName] = useState('')
  return (
      <>
          <div className="flex justify-center font-bold text-greenPrimary">Give Your Store Name</div>
          <div className="relative">
            <input
              id="storeName"
              type="text"
               value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className={clsx(
                'peer w-full border rounded-lg px-4 pt-5 pb-2 text-sm outline-none transition-all',
                'border-gray-300 focus:border-greenPrimary focus:ring-1 focus:ring-greenPrimary'
              )}
              placeholder=" "
            />
            <label
              htmlFor="storeName"
              className={clsx(
                'absolute left-3 bg-white px-1 text-xs transition-all duration-200',
                storeName
                  ? '-top-2 left-3 text-[11px] text-greenPrimary'
                  : 'top-3.5 text-PlaceHolderGrey text-sm peer-placeholder-shown:translate-y-1',
                'peer-focus:-top-2 peer-focus:left-3 peer-focus:text-[11px] peer-focus:text-greenPrimary'
              )}
            >
              Store Name
            </label>

            <Button
              color={'green'}
              label="Create Store"
              className={' mt-3 text-white font-bold'}
            //   onClick={handleSubmit}
            />
          </div>
        </>
  )
}

export default RegisterUserForm