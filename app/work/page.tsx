"use client"
import { useState } from "react"

const ALL_PROJECTS = [
  { tag: "AI Product",    title: "Intelligent Doc Assistant",  desc: "LLM-powered Q&A with citations. UX, backend, deploy.",       cat: "ai",     icon: "ph-brain",         grad: "linear-gradient(135deg,#011A23,#023345,#05678A)", ago: "2h ago" },
  { tag: "SaaS",          title: "Growth Analytics Platform",  desc: "Real-time metrics for indie SaaS. Wireframe to live, 3 wks.", cat: "saas",   icon: "ph-chart-line-up", grad: "linear-gradient(135deg,#190F00,#613A00,#935901)", ago: "5h ago" },
  { tag: "Design System", title: "Brand OS",                   desc: "Full design system + component library for a B2B startup.",   cat: "design",  icon: "ph-cube",          grad: "linear-gradient(135deg,#011A23,#040B11,#194E71)", ago: "1d ago" },
  { tag: "AI Product",    title: "Prompt Engineering Toolkit", desc: "Internal tooling for prompt iteration and version control.",  cat: "ai",     icon: "ph-lightning",     grad: "linear-gradient(135deg,#023345,#05678A,#079ACF22)", ago: "12h ago" },
  { tag: "SaaS",          title: "Onboarding Flow Engine",     desc: "No-code onboarding builder. Drag-and-drop + A/B testing.",   cat: "saas",   icon: "ph-rocket-launch", grad: "linear-gradient(135deg,#190F00,#331F00,#613A00)", ago: "2d ago" },
  { tag: "Branding",      title: "Identity Rebuild",           desc: "New brand identity for a fintech startup — logo to motion.", cat: "brand",  icon: "ph-palette",       grad: "linear-gradient(135deg,#040B11,#081A26,#11344B)", ago: "3d ago" },
]

const FILTERS = [
  { key: "all",    label: "All" },
  { key: "ai",     label: "AI Product" },
  { key: "saas",   label: "SaaS" },
  { key: "design", label: "Design System" },
  { key: "brand",  label: "Branding" },
]

export default function WorkIndex() {
  const [active, setActive] = useState("all")
  const filtered = active === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === active)

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 80px" }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ opacity: 0.4 }}>//</span> Work
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(40px, 5vw, 72px)",
          fontWeight: 700, lineHeight: 0.96,
          letterSpacing: "-0.05em", color: "var(--text-1)",
          marginBottom: 16,
        }}>
          Things I&apos;ve shipped
          <span style={{ display: "inline-block", width: 2, height: "0.85em", background: "var(--accent)", marginLeft: 6, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-2)", maxWidth: 480, lineHeight: 1.6, marginBottom: 28 }}>
          AI products, SaaS tools, design systems, brand rebuilds. All real, all shipped.
        </p>

        {/* Filter bar */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "7px 16px", borderRadius: 4, cursor: "pointer", transition: "all 0.15s",
                background: active === f.key ? "var(--accent)" : "transparent",
                border: active === f.key ? "1.5px solid var(--accent)" : "1.5px solid var(--border-md)",
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
          <div key={i} style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 12, overflow: "hidden",
            boxShadow: "var(--shadow-md)",
            transition: "border-color 0.2s, transform 0.2s",
            cursor: "pointer",
          }}>
            <div style={{ height: 180, background: p.grad, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" }}>
              <i className={`ph-thin ${p.icon}`} style={{ fontSize: 64, color: "rgba(38,192,248,0.2)" }} />
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 8 }}>
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
                  indexed {p.ago}
                </span>
                <i className="ph-bold ph-arrow-right" style={{ fontSize: 14, color: "var(--accent)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
