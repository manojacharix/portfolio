import Link from "next/link"
import meta from "@/content/meta.json"

export default function Footer() {
  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      background: "var(--surface)",
      position: "relative", zIndex: 10,
      transition: "background 0.25s ease, border-color 0.25s ease",
    }}>
      <div className="footer-wrap" style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 28, paddingBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cyan)", display: "flex", alignItems: "center", gap: 8 }}>
            <div className="ma-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", flexShrink: 0 }} />
            Autonomous agent active
          </div>
          <div className="about-body-text" style={{ fontSize: 12, color: "var(--text-2)", maxWidth: 500, lineHeight: 1.5 }}>
            Manoj is deep in ongoing projects. An{" "}
            <span style={{ color: "var(--cyan)" }}>autonomous agent</span>{" "}
            monitors his latest work and keeps this site current.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { href: "/work",    label: "Work" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="footer-nav-item" style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "var(--text-muted)", textDecoration: "none",
              }}>
                {label}
              </Link>
            ))}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
            © {new Date().getFullYear()} {meta.name}
          </div>
        </div>

      </div>
    </div>
  )
}
