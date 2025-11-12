import axios from '@/lib/axios'

export async function getItemByMenuId(id: number) {
  try {
    const res = await axios.get(`item/getby/?menu_id=${id}`)
    return res.data
  } catch (err) {
    // console.error('getStoreByUserId gagal:', err)
    throw err
  }
}

export async function postItemCreate(formData: FormData) {
  try {
    const res = await axios.post('item/create', formData, {
      // headers: {
      //      Authorization: `Bearer ${token}`,
      // },
    })
    return res.data
  } catch (err) {
    console.error('Error create item:', err)
    throw err
  }
}
