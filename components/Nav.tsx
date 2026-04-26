"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import { useTheme } from "./ThemeProvider"
import meta from "@/content/meta.json"

export default function Nav() {
  const path = usePathname()
  const { theme, toggle } = useTheme()
  const isDark = theme === "dark"
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: "/",        label: "Home" },
    { href: "/work",    label: "Work" },
    { href: "/contact", label: "Contact" },
    { href: meta.resume, label: "Resume", external: true },
  ]

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
          <span className="agent-bar-text">Monitoring Manoj&apos;s work</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)", letterSpacing: "0.05em" }}>
          <span>sys.status: <span style={{ color: "var(--cyan)", fontWeight: 500 }}>NOMINAL</span></span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="nav-main" style={{
        position: "fixed", top: 28, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 60,
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
            width={100} height={17}
            className="nav-logo"
            style={{
              filter: isDark ? "brightness(0) invert(1)" : "brightness(0)",
              transition: "filter 0.25s ease",
            }}
          />
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop-links" style={{ alignItems: "center", gap: 4 }}>
          {navLinks.map(({ href, label, external }) => {
            const active = path === href
            return (
              <Link key={label} href={href} className="nav-link-item"
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                style={{
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

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Theme controls (hidden on mobile) */}
          <div className="nav-theme-controls">
            <i
              className={`ph-bold ${isDark ? "ph-moon" : "ph-sun"}`}
              style={{ fontSize: 13, color: isDark ? "var(--text-muted)" : "var(--cyan-800)", transition: "color 0.2s" }}
            />
            <button
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="theme-toggle"
            >
              <div className="theme-toggle-thumb" />
            </button>
            <Link href="/contact" className="nav-cta-btn nav-desktop-cta" style={{
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

          {/* Hamburger (mobile only) */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <i
              className={`ph-bold ${menuOpen ? "ph-x" : "ph-list"}`}
              style={{ fontSize: 22, color: "var(--text-2)" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`nav-mobile-menu${menuOpen ? "" : " closed"}`}>
        {navLinks.map(({ href, label, external }) => (
          <Link
            key={label}
            href={href}
            className={`nav-mobile-link${path === href ? " active" : ""}`}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        {/* Theme toggle row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", marginTop: 4, borderTop: "1px solid var(--border)" }}>
          <i
            className={`ph-bold ${isDark ? "ph-moon" : "ph-sun"}`}
            style={{ fontSize: 14, color: isDark ? "var(--text-muted)" : "var(--cyan-800)" }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", flex: 1 }}>
            {isDark ? "Dark mode" : "Light mode"}
          </span>
          <button onClick={toggle} aria-label="Toggle theme" className="theme-toggle">
            <div className="theme-toggle-thumb" />
          </button>
        </div>
      </div>
    </>
  )
}
