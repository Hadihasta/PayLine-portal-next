import axios from "@/lib/axios"



export async function getAndCreateMenu(id: number) {
  try {
    const payload = {
        store_id : id
    }
    const res = await axios.post(`menu/create/`, payload)
    return res
  } catch (err) {
    // console.error('getStoreByUserId gagal:', err)
    throw err
  }
}

