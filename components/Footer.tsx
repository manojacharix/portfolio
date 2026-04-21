import Link from "next/link"
import meta from "@/content/meta.json"

export default function Footer() {
  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      background: "var(--surface)",
      padding: "28px 80px",
      position: "relative", zIndex: 10,
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cyan-600)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan-600)", boxShadow: "0 0 6px var(--cyan-600)", animation: "pulse 2s ease-in-out infinite" }} />
            Autonomous agent active
          </div>
          <div style={{ fontSize: 12, color: "var(--cyan-800)", opacity: 0.65, maxWidth: 500, lineHeight: 1.5 }}>
            An <span style={{ color: "var(--cyan-600)" }}>autonomous agent</span> monitors Manoj&apos;s work and keeps this site current.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { href: "/work", label: "Work" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none" }}>
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
