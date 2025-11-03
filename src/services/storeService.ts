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



interface CreateStoreProps { 
    user_id : number
    name : string
}

export async function createStore(payload: CreateStoreProps){
  try {
    const res = await axios.post(`store/getby/`, payload)
    return res
  } catch (err) {
    // console.error('getStoreByUserId gagal:', err)
    throw err
  }
}
