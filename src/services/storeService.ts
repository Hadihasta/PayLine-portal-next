import axios from "@/lib/axios"



export async function getStoreByUserId(id: string) {
  try {
    const res = await axios.get(`store/getby/${id}`)
    return res
  } catch (err) {
    // console.error('getStoreByUserId gagal:', err)
    throw err
  }
}
