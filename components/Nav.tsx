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
        transition: "background 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)", letterSpacing: "0.05em" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan)", animation: "pulse 2s ease-in-out infinite" }} />
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
        transition: "background 0.3s ease",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/manoj_logo_full.svg"
            alt={meta.name}
            width={120} height={20}
            style={{ filter: isDark ? "brightness(0) invert(1)" : "brightness(0)" }}
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
              <Link key={href} href={href} style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 400,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: active ? "var(--cyan)" : "var(--text-2)",
                background: active ? "var(--cyan-100)" : "none",
                padding: "6px 14px", borderRadius: 4, textDecoration: "none",
                transition: "all 0.15s",
              }}>
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right: theme toggle + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              width: 34, height: 34, borderRadius: 8,
              border: "1.5px solid var(--border-md)",
              background: "transparent", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--text-2)",
              transition: "all 0.2s",
            }}
          >
            <i
              className={`ph-bold ${isDark ? "ph-sun" : "ph-moon"}`}
              style={{ fontSize: 15, color: isDark ? "var(--yellow)" : "var(--cyan-800)" }}
            />
          </button>

          {/* Primary CTA */}
          <Link href="/contact" style={{
            fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
            letterSpacing: "0.08em", textTransform: "uppercase",
            background: "var(--cyan)", color: "#fff",
            padding: "8px 18px", borderRadius: 4, textDecoration: "none",
            boxShadow: "var(--shadow-cyan)",
            transition: "all 0.15s",
          }}>
            Init contact
          </Link>
        </div>
      </nav>
    </>
  )
}
