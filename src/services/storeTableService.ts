import axios from '@/lib/axios'

export async function getStoreTableByStoreId(id: string) {
  try {
    const res = await axios.get(`/store-table/get-store-table-by/${id}`)
    return res.data.data
  } catch (err) {
    // console.error('getStoreByUserId gagal:', err)
    throw err
  }
}

interface createStoreTableProps {
  store_id: string
  table_number: string
}

export async function createStoreTable(payload: createStoreTableProps) {
  try {
 
    const res = await axios.post(`/store-table/create-table`, payload)
    return res
  } catch (error) {
    throw error
  }
}
