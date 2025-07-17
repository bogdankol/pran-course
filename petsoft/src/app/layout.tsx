import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'PetSoft - Pet daycare software',
  description: `Take care of people's pets responsibly with PetSoft`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className='text-lg text-zinc-900 bg-bg1 min-h-screen'
      >
        {children}
      </body>
    </html>
  )
}
