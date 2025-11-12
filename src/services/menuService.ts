import axios from "@/lib/axios"



export async function getAndCreateMenu(id: number) {
  try {
    const payload = {
        store_id : id
    }
    const res = await axios.post(`menu/create/`, payload)
    return res.data
  } catch (err) {
    // console.error('getStoreByUserId gagal:', err)
    throw err
  }
}




export async function getMenuByUserId(id: number) {
  try {
    
    const res = await axios.get(`menu/getby/${id}`)
    return res
  } catch (err) {
    // console.error('getStoreByUserId gagal:', err)
    throw err
  }
}

