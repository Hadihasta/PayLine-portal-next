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


interface itemCreateProps {
  name : string
  price : number
  category : string 
  is_active : boolean
  file:  File | null

}

export async function postItemCreate(payload : itemCreateProps) {
  try {
      //  console.log(payload , " <<<")
    const res = await axios.post(`item/create`, payload)
    return res
  } catch (err) {
    // console.error('getStoreByUserId gagal:', err)
    throw err
  }
}


