import type { Metadata } from "next"
import Link from "next/link"
import about from "@/content/about.json"
import meta from "@/content/meta.json"

export const metadata: Metadata = {
  title: "About",
  description: `${meta.name} is an AI Product Manager with a design background. Built Litscreen (AI research tool), led product at Zataak Se (payments, quick commerce), and ships end-to-end without agency overhead.`,
  alternates: { canonical: "https://manojachari.com/about" },
  openGraph: {
    title: `About — ${meta.name}`,
    description: "AI PM. Former founding designer. Shipped Litscreen, led payments product at Zataak Se. Now targeting AI PM and PM roles.",
    url: "https://manojachari.com/about",
  },
}

export default function About() {
  return (
    <div className="page-wrap" style={{ paddingTop: 60, paddingBottom: 60 }}>

      <div style={{ marginBottom: 64 }}>
        <div className="ma-fade-up" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ opacity: 0.4 }}>//</span> About
        </div>
        <h1 className="ma-fade-up ma-delay-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,72px)", fontWeight: 700, lineHeight: 0.96, letterSpacing: "-0.04em", color: "var(--text-1)", marginBottom: 20 }}>
          Not just a PM.<br />A builder.
        </h1>
        <p className="ma-fade-up ma-delay-2 page-sub-text" style={{ fontSize: 17, lineHeight: 1.75, color: "var(--text-2)", maxWidth: 560 }}>
          {about.bio}
        </p>
      </div>

      <div className="about-page-grid">

        {/* Left */}
        <div>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-2)", marginBottom: 48 }}>
            {about.philosophy}
          </p>

          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ opacity: 0.4 }}>//</span> Experience
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {about.experience.map((exp, i) => (
                <div key={exp.company} style={{
                  display: "flex", gap: 24, padding: "24px 0",
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <div style={{ width: 80, flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.04em", paddingTop: 3 }}>
                    {exp.period}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--text-1)", marginBottom: 3 }}>{exp.role}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--cyan)", marginBottom: 10, letterSpacing: "0.06em" }}>{exp.company}</div>
                    <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>{exp.summary}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open to roles */}
          <div style={{ padding: 28, border: "1px solid var(--border-md)", borderRadius: "var(--radius-lg)", background: "var(--surface)", boxShadow: "var(--shadow-cyan)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <div className="ma-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", flexShrink: 0 }} />
              Open to roles
            </div>
            <p style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 20, lineHeight: 1.6 }}>
              Actively looking for Product Manager and AI PM roles. If you&apos;re building something interesting, let&apos;s talk.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={meta.calendly} target="_blank" rel="noopener noreferrer" className="ma-press btn-primary" style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "11px 22px", borderRadius: "var(--radius-md)",
                background: "var(--cyan)", color: "#fff", textDecoration: "none",
                boxShadow: "0 4px 20px rgba(38,192,248,0.3)",
              }}>
                Schedule a call
              </a>
              <Link href="/contact" className="btn-outline" style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "11px 22px", borderRadius: "var(--radius-md)",
                background: "transparent", color: "var(--text-2)", textDecoration: "none",
                border: "1.5px solid var(--border-md)",
              }}>
                Send a message
              </Link>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          <div style={{ padding: 24, border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--surface)", transition: "border-color 0.25s ease" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ opacity: 0.4 }}>//</span> Skills
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {about.skills.map(s => (
                <span key={s} style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase",
                  padding: "5px 12px", borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-md)", color: "var(--text-2)",
                  background: "rgba(38,192,248,0.06)",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div style={{ padding: 24, border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--surface)", transition: "border-color 0.25s ease" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ opacity: 0.4 }}>//</span> Tools
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {about.tools.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase",
                  padding: "5px 12px", borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)", color: "var(--text-3)",
                  background: "transparent",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <a href={meta.resume} target="_blank" rel="noopener noreferrer" className="about-card" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 24px", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", background: "var(--surface)", textDecoration: "none",
          }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>Resume</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--cyan)", letterSpacing: "0.06em" }}>VIEW PDF →</div>
            </div>
            <i className="ph-bold ph-file-pdf" style={{ fontSize: 24, color: "var(--text-muted)" }} />
          </a>

        </div>
      </div>
    </div>
  )
}
