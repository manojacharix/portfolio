import type { Metadata } from "next"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import AuroraBackground from "@/components/AuroraBackground"
import meta from "@/content/meta.json"
// Fonts are loaded via Google Fonts CDN — no next/font needed

export const metadata: Metadata = {
  title: `${meta.name} — ${meta.title}`,
  description: meta.headline,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
        <script src="https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js" async />
      </head>
      <body style={{ fontFamily: "var(--font-body)" }}>
        <AuroraBackground />
        <Nav />
        <main style={{ paddingTop: 88, position: "relative", zIndex: 10 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
