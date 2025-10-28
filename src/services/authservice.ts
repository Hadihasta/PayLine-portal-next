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
