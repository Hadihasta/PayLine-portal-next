'use client'
import Button from '@/components/global/Button'
import { useRouter } from 'next/navigation'
import { useReducer, ChangeEvent } from 'react'
import { login } from '@/services/authservice'
import { ToasterNotif } from '@/components/global/ToasterNotif'
import { AxiosError } from 'axios'
import { ErrorResponse } from '@/services/authservice'
import { useAuthStore } from '@/store/authStore'

interface LoginForm {
  username: string
  password: string
}

type Action =
  | { type: 'reset' }
  | { type: 'setUsername'; value: LoginForm['username'] }
  | { type: 'setPassword'; value: LoginForm['password'] }

const initialState: LoginForm = { username: '', password: '' }

function stateReducer(state: LoginForm, action: Action): LoginForm {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'setUsername':
      return { ...state, username: action.value }
    case 'setPassword':
      return { ...state, password: action.value }

    default:
      throw new Error('Unknown action')
  }
}

const LoginForm = () => {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  // Zustand
  const setAuth = useAuthStore((state) => state.setAuth)

  const router = useRouter()

  const redirectPageHandler = () => {
    router.push('/register')
  }

  const changeHandler = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    switch (key) {
      case 'username':
        dispatch({ type: 'setUsername', value: e.target.value })
        break
      case 'password':
        dispatch({ type: 'setPassword', value: e.target.value })
        break
      default:
        break
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await login(state)
      if (res.status === 200) {
        const message = res.data.message
        ToasterNotif('success', `${message && 'Successfully Logged In!'} `, '#16a34a')
        const response =  res.data
        // console.log(response)
        // role masih belum menentukan mau di push kemana need improvement
        setAuth(response.token, response.user)
            router.push('/dashboard')
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'isAxiosError' in error) {
        const err = error as AxiosError<ErrorResponse>
        if (err.response?.status === 401) {
          // console.log(err)
          ToasterNotif('warning', `${err.response?.data?.error} `, '#dc2626')
        }
        if (err.response?.status === 401) {
          ToasterNotif('warning', `${err.response?.data?.error} `, '#dc2626')
        } else {
          ToasterNotif('warning', `something goes wrong... `, '#dc2626')
        }
      }
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start shadow-form p-[40px] w-[500px] rounded-[8px] ">
        <div>
          <div className="font-bold">Masuk Ke Portal Payline</div>
          <div className="text-sm">
            Belum punya akun?{' '}
            <button
              onClick={redirectPageHandler}
              className="text-greenPrimary underline underline-offset-1 cursor-pointer"
            >
              Daftar menggunakan email
            </button>
          </div>
        </div>

        <div
          id="form"
          className="w-full gap-3 flex flex-col"
        >
          <div className="flex flex-col gap-3 ">
            <span className="text-xs">
              Username<span className="text-red-700 text-xs">*</span>
            </span>
            <input
              type="email"
              className="input-field"
              placeholder="Masukan Username"
              value={state.username}
              onChange={(e) => changeHandler('username', e)}
            />
          </div>

          <div className="flex flex-col gap-3 ">
            <span className="text-xs">
              Kata sandi <span className="text-red-700 text-xs">*</span>
            </span>
            <input
              type="password"
              className="input-field"
              placeholder="Masukan kata sandi"
              value={state.password}
              onChange={(e) => changeHandler('password', e)}
            />
          </div>

          <div className="text-greenPrimary text-xs cursor-pointer hover:font-bold">Lupa kata sandi?</div>
        </div>

        <Button
          color={'yellow'}
          label="Masuk"
          className={'w-full '}
          onClick={handleSubmit}
        />

        <div className="flex items-center w-full text-gray-400  text-xs">
          <div className="flex-1 h-px bg-[#E0E0E0]"></div>
          <span className="px-3">atau</span>
          <div className="flex-1 h-px bg-[#E0E0E0]"></div>
        </div>

        <button className="button-outline hover:bg-gray-50">Masuk dengan link via email</button>
        <button className="button-outline hover:bg-gray-50">Masuk dengan Google</button>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer> */}
    </div>
  )
}

export default LoginForm
