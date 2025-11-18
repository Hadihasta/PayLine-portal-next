import React from 'react'
import Image from 'next/image'

const PaymentMethod = () => {
  return (
    <div className="p-2 border rounded-lg m-6 ">
      <div className=" font-bold text-greenPrimary ">Metode Pembayaran</div>
      <div className=" flex  gap-4 mt-2 ">
       <div className="w-50 flex justify-center items-center  rounded-lg border-2 border-greyBorder p-2 gap-2 bg-gray-100">
          <Image
            src="/asset/vektor/Online-Payment-720.svg"
            alt="Qr Payment"
            className="rounded-md "
            width={30}
            height={30}
          />
        <span className='font-semibold text-greenPrimary'>
        QR Payment

        </span>
        </div>
        <div className="w-50 flex justify-center items-center rounded-lg border-2 border-greenPrimary p-2 gap-2">
          <Image
            src="/asset/vektor/Cashier-720.svg"
            alt="cashier"
            className="rounded-md "
            width={30}
            height={30}
          />
         <span className='font-semibold text-greenPrimary'>
            Pay At Cashier
            </span>  
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
