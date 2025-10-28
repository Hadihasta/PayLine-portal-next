import axios from "@/lib/axios"


interface LoginPayload {
  username: string
  password: string
}

export async function login(payload: LoginPayload) {
  try {
    const res = await axios.post('/auth/login', payload)
    return res
  } catch (err) {
    console.error('Login gagal:', err)
    throw err
  }
}


interface RegisterPayload {
  name: string
  email: string
  phone_number: string
  username: string
  password: string
}


export async function registerAccount(payload: RegisterPayload) {
  try {
    const res = await axios.post('/auth/register', payload)
    return res.data
  } catch (err ) {

    throw err 
  }
}
