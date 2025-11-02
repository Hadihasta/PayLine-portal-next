import React from 'react'

const page = () => {
  return (
    <div className="px-6 pt-10 flex flex-col ">
      <div className="flex justify-center font-bold text-greenPrimary">Create Table List for your store</div>
      <div className='mt-3'>
        <div className="border rounded-md shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 font-semibold">Table Number</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">QR STRUK</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{`Unknown`}</td>
                <td className="px-4 py-3">
                 {`GENERATE TABLE QR `}
                </td>
                <td className="px-4 py-3">{`GENERATE QR STRUK`}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end items-center p-3 bg-gray-50">
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">1</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
