import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Navbar } from '@/components/navbar'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { AlertDemo } from '@/components/alert'
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PubliclyBuild',
  description: 'The best way to build your SaaS in Public'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
    
          >
            <Analytics/>
            <ToastProvider />
            <AlertDemo />
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
