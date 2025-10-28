'use client'
import { useReducer, ChangeEvent } from 'react'
import Button from '@/component/global/Button'

interface RegisterForm {
  name: string
  email: string
  phone_number: string
  username: string
  password: string
}
type Action =
  | { type: 'reset' }
  | { type: 'setName'; value: RegisterForm['name'] }
  | { type: 'setEmail'; value: RegisterForm['email'] }
  | { type: 'setPhoneNumber'; value: RegisterForm['phone_number'] }
  | { type: 'setUsername'; value: RegisterForm['username'] }
  | { type: 'setPassword'; value: RegisterForm['password'] }

const initialState: RegisterForm = { name: '', email: '', phone_number: '', username: '', password: '' }

function stateReducer(state: RegisterForm, action: Action): RegisterForm {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'setName':
      return { ...state, name: action.value }
    case 'setEmail':
      return { ...state, email: action.value }
    case 'setPhoneNumber':
      return { ...state, phone_number: action.value }
    case 'setUsername':
      return { ...state, username: action.value }
    case 'setPassword':
      return { ...state, password: action.value }
    default:
      throw new Error('Unknown action')
  }
}

const RegisterForm = () => {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  const changeHandler = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    switch (key) {
      case 'name':
        console.log(e.target.value , 'from name')
        dispatch({ type: 'setName', value: e.target.value })
        break
      case 'email':
        console.log(e.target.value, 'from emaill')
        dispatch({ type: 'setEmail', value: e.target.value })
        break
      case 'phone_number':
        console.log(e.target.value)
        dispatch({ type: 'setPhoneNumber', value: e.target.value })
        break
      case 'username':
        console.log(e.target.value)
        dispatch({ type: 'setUsername', value: e.target.value })
        break
      case 'password':
        console.log(e.target.value)
        dispatch({ type: 'setPassword', value: e.target.value })
        break

      default:
        break
    }
  }


  const submitHandler = () => {
    console.log("fetch api" , state)
  }

  return (
    <>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start shadow-form p-[40px] w-[500px] rounded-[8px] ">
          <div>
            <div className="font-bold">Daftar Akun Payline</div>
          </div>

          <div
            id="form"
            className="w-full gap-3 flex flex-col"
          >
            <div className="flex flex-col gap-3 ">
              <span className="text-xs">
                Nama <span className="text-red-700 text-xs">*</span>
              </span>
              <input
                type="email"
                className="input-field"
                placeholder="Masukan Nama"
                value={state.name}
                onChange={(e) => changeHandler('name', e)}
              />
            </div>

            <div className="flex flex-col gap-3 ">
              <span className="text-xs">
                Alamat email <span className="text-red-700 text-xs">*</span>
              </span>
              <input
                type="email"
                className="input-field"
                placeholder="Masukan email"
                value={state.email}
                onChange={(e) => changeHandler('email', e)}
              />
            </div>

            <div className="flex flex-col gap-3 ">
              <span className="text-xs">
                Phone Number <span className="text-red-700 text-xs">*</span>
              </span>
              <input
                type="email"
                className="input-field"
                placeholder="Masukan email"
                value={state.phone_number}
                onChange={(e) => changeHandler('phone_number', e)}
              />
            </div>

            <div className="flex flex-col gap-3 ">
              <span className="text-xs">
                Username<span className="text-red-700 text-xs">*</span>
              </span>
              <input
                type="email"
                className="input-field"
                placeholder="Masukan email"
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


          <Button
          color={'yellow'}
          label="Masuk"
          className={'w-full '}
          onClick={submitHandler}
        />
          </div>

          {/* <div className="flex items-center w-full text-gray-400  text-xs">
          <div className="flex-1 h-px bg-[#E0E0E0]"></div>
          <span className="px-3">atau</span>
          <div className="flex-1 h-px bg-[#E0E0E0]"></div>
        </div> */}
        </main>
        {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer> */}
      </div>
    </>
  )
}

export default RegisterForm
