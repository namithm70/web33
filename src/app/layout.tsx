import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DeFi App - Trade, Stake, Farm',
  description: 'Modern DeFi application for trading, staking, and farming',
}

// Create a simple theme for server-side rendering
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#10b981',
    },
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
