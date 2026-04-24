"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import meta from "@/content/meta.json"

export default function Nav() {
  const path = usePathname()

  return (
    <>
      {/* Agent status bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 28,
        background: "rgba(255,255,255,0.92)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--cyan-800)", letterSpacing: "0.05em" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan-600)", boxShadow: "0 0 6px var(--cyan-600)", animation: "pulse 2s ease-in-out infinite" }} />
          <span style={{ color: "var(--cyan-600)", fontWeight: 500 }}>AGENT ONLINE</span>
          <span style={{ color: "var(--cyan-700)", opacity: 0.5 }}>·</span>
          <span>Monitoring Manoj&apos;s work</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--cyan-800)", letterSpacing: "0.05em" }}>
          <span>sys.status: <span style={{ color: "var(--cyan-600)", fontWeight: 500 }}>NOMINAL</span></span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 28, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 56px", height: 60,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image src="/manoj_logo_full.svg" alt={meta.name} width={120} height={20} style={{ filter: "brightness(0)" }} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[
            { href: "/", label: "Home" },
            { href: "/work", label: "Work" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 400,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: path === href ? "var(--cyan-600)" : "var(--cyan-800)",
              background: path === href ? "var(--cyan-100)" : "none",
              padding: "6px 14px", borderRadius: 4, textDecoration: "none",
              transition: "all 0.15s",
            }}>
              {label}
            </Link>
          ))}
        </div>
        <Link href="/contact" style={{
          fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
          letterSpacing: "0.08em", textTransform: "uppercase",
          background: "var(--cyan-600)", color: "#fff",
          padding: "8px 18px", borderRadius: 4, textDecoration: "none",
          boxShadow: "0 0 16px rgba(38,192,248,0.25)",
          transition: "all 0.15s",
        }}>
          Init contact
        </Link>
      </nav>
    </>
  )
}
