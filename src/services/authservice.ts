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
    // console.error('Login gagal:', err)
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


export interface ErrorResponse {
  error: string
  message?: string
}


export async function registerAccount(payload: RegisterPayload) {
  try {
    const res = await axios.post('/auth/register', payload)
    return res.data
  } catch (err ) {
    throw err 
  }
}

export async function registerUser(name: string ) {
  try {
    const payload = { 
      name
    }
    const res = await axios.post('/auth/register-user', payload)
    return res.data
  } catch (err ) {
    throw err 
  }
}
