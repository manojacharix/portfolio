"use client"
import { useState } from "react"
import meta from "@/content/meta.json"

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now opens mailto — can wire to an API later
    const subject = encodeURIComponent(`Message from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`)
    window.open(`mailto:${meta.email}?subject=${subject}&body=${body}`)
    setSent(true)
  }

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

      {/* Left: heading + social links */}
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--cyan-200)" }}>//</span> Contact
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,72px)", fontWeight: 700, lineHeight: 0.96, letterSpacing: "-0.04em", color: "var(--text-1)", marginBottom: 20 }}>
          Got something<br />to <span style={{ color: "var(--cyan-600)" }}>build?</span>
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--cyan-800)", opacity: 0.75, maxWidth: 400, marginBottom: 48 }}>
          No sales funnel, no 5-step form. Just me — and I&apos;m fast.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Schedule a call", sub: "Pick a time that works", href: meta.calendly, icon: "ph-calendar-blank", external: true },
            { label: "LinkedIn", sub: "Connect or message me", href: meta.linkedin, icon: "ph-linkedin-logo", external: true },
            { label: meta.email, sub: "Direct email", href: `mailto:${meta.email}`, icon: "ph-envelope-simple", external: false },
          ].map(item => (
            <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px", border: "1px solid var(--border)",
              borderRadius: 8, background: "var(--surface)", textDecoration: "none",
              transition: "border-color 0.15s, box-shadow 0.15s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, background: "var(--cyan-100)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className={`ph-bold ${item.icon}`} style={{ fontSize: 16, color: "var(--cyan-600)" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, color: "var(--text-1)" }}>{item.label}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.04em" }}>{item.sub}</div>
                </div>
              </div>
              <i className="ph-bold ph-arrow-right" style={{ fontSize: 14, color: "var(--cyan-200)" }} />
            </a>
          ))}
        </div>
      </div>

      {/* Right: contact form */}
      <div style={{ padding: 36, border: "1px solid var(--border-md)", borderRadius: 16, background: "var(--surface)", boxShadow: "var(--shadow-md)" }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <i className="ph-bold ph-check-circle" style={{ fontSize: 48, color: "var(--cyan-600)", display: "block", marginBottom: 16 }} />
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--text-1)", marginBottom: 8 }}>Transmitted.</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--cyan-700)", letterSpacing: "0.06em" }}>Agent received it. I&apos;ll be in touch.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan-600)", boxShadow: "0 0 6px var(--cyan-600)", animation: "pulse 2s ease-in-out infinite" }} />
              Send a message
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[
                { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan-700)", display: "block", marginBottom: 8 }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{
                      width: "100%", background: "var(--bg)", border: "1.5px solid var(--border)",
                      borderRadius: 5, padding: "12px 14px",
                      fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-1)",
                      outline: "none",
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan-700)", display: "block", marginBottom: 8 }}>
                What are you building?
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tell me about the product, the problem, where you're stuck. Specific is better."
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                style={{
                  width: "100%", background: "var(--bg)", border: "1.5px solid var(--border)",
                  borderRadius: 5, padding: "12px 14px",
                  fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-1)",
                  outline: "none", resize: "vertical",
                }}
              />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", marginTop: 6, letterSpacing: "0.04em" }}>
                // No NDAs required to start a conversation
              </div>
            </div>

            <button type="submit" style={{
              fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "13px 28px", borderRadius: 5, cursor: "pointer", border: "none",
              background: "var(--cyan-600)", color: "#fff",
              boxShadow: "0 4px 20px rgba(38,192,248,0.3)",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              <i className="ph-bold ph-paper-plane-tilt" /> Transmit
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
