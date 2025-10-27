import LoginForm from '@/component/login/LoginForm'

// note: jangan taruh custom react hook agar tidak re render satu halaman penuh karena satu component
//  di update
export default function Home() {
  return (
    <>
      <LoginForm />
    </>
  )
}
