import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'dr.agenda',
  description: 'Bootcamp SaaS de agendamentos para clínicas',
  icons: {
    icon: '/logo-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="dark antialiased">
        {children}
        <Toaster richColors theme="dark" position="bottom-center" />
      </body>
    </html>
  )
}
