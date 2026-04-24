import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Manoj Achari. No sales funnel — just a direct line to an AI PM who moves fast.",
  alternates: { canonical: "https://manojachari.com/contact" },
  openGraph: {
    title: "Contact — Manoj Achari",
    description: "Reach out directly. No 5-step form, no waiting room.",
    url: "https://manojachari.com/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
