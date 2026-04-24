import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import AuroraBackground from "@/components/AuroraBackground"
import meta from "@/content/meta.json"

const BASE_URL = "https://manojachari.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${meta.name} — AI Product Manager`,
    template: `%s | ${meta.name}`,
  },
  description: "Manoj Achari is an AI Product Manager who ships products 0 to 1 — design background, LLM pipelines, and full-stack thinking without the agency overhead.",
  keywords: ["AI Product Manager", "Product Manager", "LLM", "0-to-1", "Design Systems", "Fintech", "SaaS", "Manoj Achari"],
  authors: [{ name: meta.name, url: BASE_URL }],
  creator: meta.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: meta.name,
    title: `${meta.name} — AI Product Manager`,
    description: "AI PM who ships 0 to 1. Design background, LLM pipelines, full-stack thinking.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${meta.name} — AI Product Manager` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${meta.name} — AI Product Manager`,
    description: "AI PM who ships 0 to 1. Design background, LLM pipelines, full-stack thinking.",
    creator: "@x_achari",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: BASE_URL },
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
        <ThemeProvider>
          <AuroraBackground />
          <Nav />
          <main style={{ paddingTop: 88, position: "relative", zIndex: 10 }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
