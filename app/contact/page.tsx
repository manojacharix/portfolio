"use client"
import { useState } from "react"
import meta from "@/content/meta.json"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`)
    window.open(`mailto:${meta.email}?subject=${subject}&body=${body}`)
    setSent(true)
  }

  const inputStyle = {
    width: "100%",
    background: "var(--surface2)",
    border: "1.5px solid var(--border-md)",
    borderRadius: "var(--radius-md)", padding: "13px 16px",
    fontFamily: "var(--font-body)", fontSize: 15,
    color: "var(--text-1)", outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  } as const

  const labelStyle = {
    fontFamily: "var(--font-mono)", fontSize: 10,
    letterSpacing: "0.12em", textTransform: "uppercase" as const,
    color: "var(--text-muted)", display: "block", marginBottom: 8,
  }

  return (
    <div className="page-wrap" style={{ paddingTop: 60, paddingBottom: 60, maxWidth: 760 }}>

      <div className="ma-fade-up" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ opacity: 0.4 }}>//</span> Contact
      </div>

      <h1 className="ma-fade-up ma-delay-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,64px)", fontWeight: 700, lineHeight: 0.96, letterSpacing: "-0.04em", color: "var(--text-1)", marginBottom: 16 }}>
        Got something<br />to <span style={{ color: "var(--cyan)" }}>build?</span>
      </h1>

      <p className="ma-fade-up ma-delay-2 page-sub-text" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--text-2)", maxWidth: 480, marginBottom: 48 }}>
        No sales funnel, no 5-step form, no &quot;our team will get back to you.&quot; Just me. I&apos;m actually fast.
      </p>

      {sent ? (
        <div className="ma-scale-in" style={{ textAlign: "center", padding: "60px 0" }}>
          <i className="ph-bold ph-check-circle" style={{ fontSize: 56, color: "var(--yellow)", display: "block", marginBottom: 20 }} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--text-1)", marginBottom: 10 }}>Transmitted.</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--cyan)", letterSpacing: "0.06em" }}>Agent received it. I&apos;ll be in touch.</div>
        </div>
      ) : (
        <form className="ma-fade-up ma-delay-3" onSubmit={handleSubmit}>
          <div className="contact-form-row">
            {[
              { label: "Name",  key: "name",  type: "text",  placeholder: "Your name" },
              { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
            ].map(f => (
              <div key={f.key}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  type={f.type} required placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className="form-input-field"
                  style={inputStyle}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={labelStyle}>What are you building?</label>
            <textarea
              required rows={5}
              placeholder="Tell me about the product, the problem, where you're stuck. Specific is better."
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              className="form-input-field"
              style={{ ...inputStyle, resize: "vertical" }}
            />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", marginTop: 6, letterSpacing: "0.04em" }}>
              // No NDAs required to start a conversation
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <button type="submit" className="ma-press" style={{
              fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "13px 28px", borderRadius: "var(--radius-md)", cursor: "pointer", border: "none",
              background: "var(--cyan)", color: "#fff",
              boxShadow: "0 4px 20px rgba(38,192,248,0.3)",
              display: "inline-flex", alignItems: "center", gap: 10,
              transition: "all 0.2s",
            }}>
              <i className="ph-bold ph-paper-plane-tilt" /> Transmit
            </button>
          </div>
        </form>
      )}

      {/* Social links */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 48, paddingTop: 36, borderTop: "1px solid var(--border)" }}>
        {[
          { label: "Email",       icon: "ph-envelope",      href: `mailto:${meta.email}` },
          { label: "LinkedIn",    icon: "ph-linkedin-logo", href: meta.linkedin },
          { label: "Resume",      icon: "ph-file-pdf",      href: meta.resume },
          { label: "Twitter / X", icon: "ph-twitter-logo",  href: "https://x.com/x_achari" },
          { label: "GitHub",      icon: "ph-github-logo",   href: "https://github.com/manojacharix" },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link-item" style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 18px", border: "1.5px solid var(--border-md)", borderRadius: "var(--radius-md)",
            color: "var(--text-2)", fontFamily: "var(--font-mono)", fontSize: 11,
            letterSpacing: "0.06em", textDecoration: "none",
            background: "none",
          }}>
            <i className={`ph-bold ${s.icon}`} style={{ fontSize: 15 }} />
            {s.label}
          </a>
        ))}
      </div>

    </div>
  )
}
