import { Nunito } from 'next/font/google'
import '@/style/globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import SidebarApp from '@/components/global/SidebarApp'
import Navbar from '@/components/global/Navbar'

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
    <SidebarProvider>
      {' '}
      <Navbar />
      <SidebarApp />
      <main className={`${nunito.variable} antialiased`}>{children}</main>
      {/* <SidebarTrigger /> */}
    </SidebarProvider>
  )
}
