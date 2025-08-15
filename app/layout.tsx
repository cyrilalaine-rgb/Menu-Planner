import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Menu Planner - Dîner",
  description: "Générez des menus du soir adaptés (sportif, viande, poisson, végé) selon le nombre de personnes.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <Theme accentColor="crimson" radius="large" scaling="100%">
          {children}
        </Theme>
      </body>
    </html>
  )
}
