'use client'
import React, { useEffect, useState } from 'react'
import Button from '../global/Button'
import { getStoreTableByStoreId, createStoreTable } from '@/services/storeTableService'
import Modal from '../global/Modal'

export interface StoreTableProps {
  id: string
  name: string
}

interface masterTableProps {
  id: string
  qr_code: string
  table_number: string
  store_id: string
}

const StoreTable: React.FC<StoreTableProps> = (props) => {
  const [masterTable, setMasterTable] = useState([])
  const { id, name } = props

  const getMasterTable = async () => {
    try {
      // master data table
      const res = await getStoreTableByStoreId(id)
      setMasterTable(res)
      // console.log(res, ' get the table ')
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getMasterTable()
  }, [id])

  const handleCreateTable = async () => {
    try {
      const payload = {
        store_id: id,
        table_number: String(masterTable.length + 1),
      }
      const res = await createStoreTable(payload)
      console.log(res , " <<< ")
      getMasterTable()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex justify-center font-bold text-greenPrimary">Table Management</div>
      <div className="mt-3">
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
              {masterTable.map((item: masterTableProps, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{item.table_number}</td>
                  <td className="px-4 py-3">
                    {/* {item.qr_code} */}

                    <Modal/>
                  </td>
                  <td className="px-4 py-3">{`GENERATE QR STRUK | DUMMY`}</td>
                </tr>
              ))}
              {/* <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{`Unknown`}</td>
                <td className="px-4 py-3">{`GENERATE TABLE QR `}</td>
                <td className="px-4 py-3">{`GENERATE QR STRUK`}</td>
              </tr> */}
            </tbody>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Button
                    color={'green'}
                    label="+ Add new table"
                    className={''}
                    onClick={handleCreateTable}
                  ></Button>
                </td>
                <td className="px-4 py-3">
                  {/* diambil dari props  */}
                  {/* <div>{JSON.stringify(props)}</div> */}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end items-center p-3 bg-gray-50">
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">1</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreTable
