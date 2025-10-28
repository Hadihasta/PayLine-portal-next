import { Nunito } from 'next/font/google'
import '@/style/globals.css'
// import Navbar from '@/components/global/Navbar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import SidebarApp from '@/component/global/SidebarApp'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SidebarProvider>
        <SidebarApp />
        <main className={`${nunito.variable} antialiased`}>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  )
}
