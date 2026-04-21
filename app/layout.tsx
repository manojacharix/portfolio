import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import meta from "@/content/meta.json"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${meta.name} — ${meta.title}`,
  description: meta.headline,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-white text-zinc-900 antialiased`}>
        <Nav />
        <main className="pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
