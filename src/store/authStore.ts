import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  role: string
  fullName?: string
  email?: string
}

interface AuthState {
  token: string | null
  user: AuthUser | null
  setAuth: (token: string, user: AuthUser | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => {
        localStorage.setItem('token', token)
  // console.log(" setAuth called:", { token, user })
        set({ token, user })
      },
      logout: () => {
        localStorage.removeItem('token')
        set({ token: null, user: null })
      },
    }),
    {
      // simpan di local storage dengan nama yang unique auth storage
      name: 'auth-storage',
      // onRehydrateStorage: () => (state) => {
      //   // console.log("rehydrated dari localStorage:", state)
      //   // cara ambil dan gunakan local storage dari  zustand yang sudah di hydration =====> 
      //    // const localStorageItem = localStorage.getItem("auth-storage");
      // },
    }
  )
)
