"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useTheme } from "./ThemeProvider"
import meta from "@/content/meta.json"

export default function Nav() {
  const path = usePathname()
  const { theme, toggle } = useTheme()
  const isDark = theme === "dark"

  return (
    <>
      {/* Agent status bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 28,
        background: "var(--nav-bar-bg)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)", letterSpacing: "0.05em" }}>
          <div className="ma-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan)", flexShrink: 0 }} />
          <span style={{ color: "var(--cyan)", fontWeight: 500 }}>AGENT ONLINE</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Monitoring Manoj&apos;s work</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)", letterSpacing: "0.05em" }}>
          <span>sys.status: <span style={{ color: "var(--cyan)", fontWeight: 500 }}>NOMINAL</span></span>
        </div>
      </div>

      {/* Main nav */}
      <nav style={{
        position: "fixed", top: 28, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 56px", height: 60,
        background: "var(--nav-bg)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/manoj_logo_full.svg"
            alt={meta.name}
            width={120} height={20}
            style={{
              filter: isDark ? "brightness(0) invert(1)" : "brightness(0)",
              transition: "filter 0.25s ease",
            }}
          />
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[
            { href: "/",        label: "Home" },
            { href: "/work",    label: "Work" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => {
            const active = path === href
            return (
              <Link key={href} href={href} className="nav-link-item" style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 400,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: active ? "var(--cyan)" : "var(--text-2)",
                background: active ? (isDark ? "rgba(38,192,248,0.1)" : "rgba(38,192,248,0.12)") : "none",
                padding: "6px 14px", borderRadius: 4, textDecoration: "none",
                transition: "all 0.15s",
              }}>
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right: toggle pill + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Theme icon */}
          <i
            className={`ph-bold ${isDark ? "ph-moon" : "ph-sun"}`}
            style={{ fontSize: 13, color: isDark ? "var(--text-muted)" : "var(--cyan-800)", transition: "color 0.2s" }}
          />
          {/* Pill toggle */}
          <button
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="theme-toggle"
          >
            <div className="theme-toggle-thumb" />
          </button>

          {/* Primary CTA */}
          <Link href="/contact" className="nav-cta-btn" style={{
            fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
            letterSpacing: "0.08em", textTransform: "uppercase",
            background: "var(--cyan)", color: "#fff",
            padding: "8px 18px", borderRadius: "var(--radius-md)", textDecoration: "none",
            boxShadow: "0 0 16px rgba(38,192,248,0.25)",
            transition: "all 0.15s",
          }}>
            Contact
          </Link>
        </div>
      </nav>
    </>
  )
}
