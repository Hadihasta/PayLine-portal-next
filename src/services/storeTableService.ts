import axios from "@/lib/axios"



export async function getStoreTableByStoreId(id: string) {
  try {
    const res = await axios.get(`/store-table/get-store-table-by/${id}`)
    return res  
  } catch (err) {
    // console.error('getStoreByUserId gagal:', err)
    throw err
  }
}



