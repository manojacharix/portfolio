"use client"
import { useState } from "react"

const ALL_PROJECTS = [
  { tag: "AI Product",    title: "Intelligent Doc Assistant",  desc: "LLM-powered Q&A with citations. UX, backend, deploy.",       cat: "ai",     icon: "ph-brain",         grad: "linear-gradient(135deg,#E1F6FE,#A6E5FC,#6DD5FA)", year: "2024" },
  { tag: "SaaS",          title: "Growth Analytics Platform",  desc: "Real-time metrics for indie SaaS. Wireframe to live, 3 wks.", cat: "saas",   icon: "ph-chart-line-up", grad: "linear-gradient(135deg,#FFF5E6,#FFD494,#FEA92A)", year: "2024" },
  { tag: "Design System", title: "Brand OS",                   desc: "Full design system + component library for a B2B startup.",   cat: "design", icon: "ph-cube",          grad: "linear-gradient(135deg,#E1F6FE,#C4EEFD,#26C0F8)", year: "2023" },
  { tag: "AI Product",    title: "Prompt Engineering Toolkit", desc: "Internal tooling for prompt iteration and version control.",  cat: "ai",     icon: "ph-lightning",     grad: "linear-gradient(135deg,#E1F6FE,#A6E5FC,#079ACF)", year: "2024" },
  { tag: "SaaS",          title: "Onboarding Flow Engine",     desc: "No-code onboarding builder. Drag-and-drop + A/B testing.",   cat: "saas",   icon: "ph-rocket-launch", grad: "linear-gradient(135deg,#FFF5E6,#FFEBCC,#FEA92A)", year: "2023" },
  { tag: "Branding",      title: "Identity Rebuild",           desc: "New brand identity for a fintech startup. Logo to motion.",   cat: "brand",  icon: "ph-palette",       grad: "linear-gradient(135deg,#D1E7F5,#75B6E0,#2980B9)", year: "2023" },
]

const FILTERS = [
  { key: "all",    label: "All" },
  { key: "ai",     label: "AI Product" },
  { key: "saas",   label: "SaaS" },
  { key: "design", label: "Design System" },
  { key: "brand",  label: "Branding" },
]

const AGO = ["43m ago", "1h ago", "2h ago", "5h ago", "12h ago", "1d ago"]

export default function WorkIndex() {
  const [active, setActive] = useState("all")
  const filtered = active === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === active)

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 80px" }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div className="ma-fade-up" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ opacity: 0.4 }}>//</span> Work
        </div>
        <h1 className="ma-fade-up ma-delay-1" style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(40px, 5vw, 72px)",
          fontWeight: 700, lineHeight: 0.96,
          letterSpacing: "-0.05em", color: "var(--text-1)",
          marginBottom: 16,
        }}>
          Things I&apos;ve shipped
          <span className="ma-blink" style={{ display: "inline-block", width: 3, height: "0.8em", background: "var(--yellow)", marginLeft: 8, verticalAlign: "middle" }} />
        </h1>
        <p className="ma-fade-up ma-delay-2" style={{ fontSize: 16, color: "var(--text-2)", maxWidth: 480, lineHeight: 1.6, marginBottom: 28 }}>
          AI products, SaaS tools, design systems, brand rebuilds. All real, all shipped.
        </p>

        {/* Filter bar */}
        <div className="ma-fade-up ma-delay-3" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "7px 16px", borderRadius: "var(--radius-md)", cursor: "pointer", transition: "all 0.15s",
                background: active === f.key ? "var(--yellow)" : "transparent",
                border: active === f.key ? "1.5px solid var(--yellow)" : "1.5px solid var(--border-md)",
                color: active === f.key ? "#fff" : "var(--text-2)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {filtered.map((p, i) => (
          <div key={i} className="ma-hover-lift" style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", overflow: "hidden",
            boxShadow: "var(--shadow-md)",
            transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
            cursor: "pointer",
          }}>
            <div style={{ height: 180, background: p.grad, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <i className={`ph-thin ${p.icon}`} style={{ fontSize: 64, color: "rgba(5,103,138,0.2)" }} />
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--yellow)", marginBottom: 8 }}>
                {p.tag}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--text-1)", marginBottom: 8, letterSpacing: "-0.01em" }}>
                {p.title}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.55, marginBottom: 16 }}>
                {p.desc}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--cyan)", display: "inline-block", opacity: 0.5 }} />
                  indexed {AGO[i % AGO.length]}
                </span>
                <i className="ph-bold ph-arrow-right" style={{ fontSize: 14, color: "var(--cyan)", transition: "transform 0.15s" }} />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
