import { Nunito } from 'next/font/google'
import '@/style/globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import SidebarApp from '@/components/global/SidebarApp'

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
      <SidebarApp />
      <main className={`${nunito.variable} antialiased`}>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
