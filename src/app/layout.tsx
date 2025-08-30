import ClientThemeProvider from '../components/ClientThemeProvider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DeFi App - Trade, Stake, Farm',
  description: 'Modern DeFi application for trading, staking, and farming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  )
}
