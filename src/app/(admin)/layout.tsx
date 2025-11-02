import { Nunito } from 'next/font/google'
import '@/style/globals.css'
import { SidebarProvider, SidebarTrigger, SidebarTriggerOut } from '@/components/ui/sidebar'
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
    <>
      <SidebarProvider defaultOpen={false}>
        <SidebarApp />
        <SidebarTriggerOut />
        <div className='flex flex-col grow'>
        <Navbar label={`Payline`} />
        <main className={`${nunito.variable} antialiased grow`}>{children}</main>

        </div>
      </SidebarProvider>
    </>
  )
}
