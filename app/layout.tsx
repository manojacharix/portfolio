import type { Metadata } from "next"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import meta from "@/content/meta.json"

export const metadata: Metadata = {
  title: `${meta.name} — ${meta.title}`,
  description: meta.headline,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js" async />
      </head>
      <body>
        <Nav />
        <main style={{ paddingTop: 88, position: "relative", zIndex: 10 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
