import type { Metadata } from 'next'
import { PlayerProvider } from '@/contexts/PlayerContext'
import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyle } from '@/styles/global'

export const metadata: Metadata = {
  title: 'Baby Face 2025 - Movember Competition',
  description: 'Movember Baby Face Competition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <PlayerProvider>
            {children}
          </PlayerProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
