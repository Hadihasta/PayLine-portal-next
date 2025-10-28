import LoginForm from '@/components/auth/login/LoginForm'

// note: jangan taruh custom react hook agar tidak re render satu halaman penuh karena satu component
//  di update
export default function Home() {
  return (
    <>
      <LoginForm />
    </>
  )
}
