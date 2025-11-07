import axios from "@/lib/axios"



export async function getItemByMenuId(id: number) {
  try {
    const res = await axios.get(`item/getby/?menu_id=${id}`)
    return res.data
  } catch (err) {
    // console.error('getStoreByUserId gagal:', err)
    throw err
  }
}



