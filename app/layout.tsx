import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { CelestialBackground } from './components/CelestialBackground'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant'
})

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
})

export const metadata = {
  title: 'Aura & Éther | Sanctuaire Éditorial',
  description: 'Plateforme éditoriale spirituelle unifiée',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <CelestialBackground />
        {children}
      </body>
    </html>
  )
}