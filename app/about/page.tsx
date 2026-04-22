import Link from "next/link"
import about from "@/content/about.json"
import meta from "@/content/meta.json"

export default function About() {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 80px" }}>

      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--cyan-200)" }}>//</span> About
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,72px)", fontWeight: 700, lineHeight: 0.96, letterSpacing: "-0.04em", color: "var(--text-1)", marginBottom: 20 }}>
          Not just a PM.<br />A builder.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--cyan-800)", opacity: 0.8, maxWidth: 560 }}>
          {about.bio}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 80, alignItems: "start" }}>

        {/* Left col */}
        <div>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--cyan-800)", opacity: 0.75, marginBottom: 48 }}>
            {about.philosophy}
          </p>

          {/* Experience */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--cyan-200)" }}>//</span> Experience
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {about.experience.map((exp, i) => (
                <div key={exp.company} style={{
                  display: "flex", gap: 24,
                  padding: "24px 0",
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <div style={{ width: 80, flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.04em", paddingTop: 3 }}>
                    {exp.period}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--text-1)", marginBottom: 3 }}>{exp.role}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--cyan-600)", marginBottom: 10, letterSpacing: "0.06em" }}>{exp.company}</div>
                    <div style={{ fontSize: 14, color: "var(--cyan-800)", opacity: 0.7, lineHeight: 1.65 }}>{exp.summary}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            padding: 28, border: "1px solid var(--border-md)",
            borderRadius: 12, background: "var(--surface)",
            boxShadow: "var(--shadow-sm)",
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan-600)", boxShadow: "0 0 6px var(--cyan-600)", animation: "pulse 2s ease-in-out infinite" }} />
              Open to roles
            </div>
            <p style={{ fontSize: 15, color: "var(--cyan-800)", opacity: 0.8, marginBottom: 20, lineHeight: 1.6 }}>
              Actively looking for Product Manager and AI PM roles. If you&apos;re building something interesting, let&apos;s talk.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href={meta.calendly} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "11px 22px", borderRadius: 5,
                background: "var(--cyan-600)", color: "#fff", textDecoration: "none",
                boxShadow: "0 4px 16px rgba(38,192,248,0.25)",
              }}>
                Schedule a call
              </a>
              <Link href="/contact" style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "11px 22px", borderRadius: 5,
                background: "transparent", color: "var(--cyan-700)", textDecoration: "none",
                border: "1.5px solid var(--border-md)",
              }}>
                Send a message
              </Link>
            </div>
          </div>
        </div>

        {/* Right col */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

          {/* Skills */}
          <div style={{ padding: 24, border: "1px solid var(--border)", borderRadius: 12, background: "var(--surface)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--cyan-200)" }}>//</span> Skills
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {about.skills.map(s => (
                <span key={s} style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em",
                  padding: "5px 12px", borderRadius: 3,
                  border: "1px solid var(--border-md)", color: "var(--cyan-700)",
                  background: "var(--cyan-100)",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div style={{ padding: 24, border: "1px solid var(--border)", borderRadius: 12, background: "var(--surface)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--cyan-200)" }}>//</span> Tools
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {about.tools.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.07em",
                  padding: "5px 12px", borderRadius: 3,
                  border: "1px solid var(--border)", color: "var(--cyan-800)",
                  background: "transparent",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Resume */}
          <a href={meta.resume} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 24px", border: "1px solid var(--border)",
            borderRadius: 12, background: "var(--surface)", textDecoration: "none",
          }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>Resume</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--cyan-700)", letterSpacing: "0.06em" }}>VIEW PDF →</div>
            </div>
            <i className="ph-bold ph-file-pdf" style={{ fontSize: 24, color: "var(--cyan-400)" }} />
          </a>
        </div>
      </div>
    </div>
  )
}
