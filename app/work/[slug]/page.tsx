import Link from "next/link"
import { notFound } from "next/navigation"
import work from "@/content/work.json"

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }))
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = work.find((w) => w.slug === slug)
  if (!item) notFound()

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 48px" }}>

      <Link href="/work" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 40, transition: "color 0.15s" }}>
        <i className="ph-bold ph-arrow-left" style={{ fontSize: 12 }} /> Back to work
      </Link>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ opacity: 0.4 }}>//</span> {item.category}
      </div>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, lineHeight: 0.96, letterSpacing: "-0.04em", color: "var(--text-1)", marginBottom: 20 }}>
        {item.title}
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--text-2)", marginBottom: 48, maxWidth: 600 }}>
        {item.headline}
      </p>

      {/* Metrics */}
      {item.metrics.length > 0 && (
        <div style={{
          display: "grid", gridTemplateColumns: `repeat(${item.metrics.length}, 1fr)`,
          gap: 0, marginBottom: 56,
          border: "1px solid var(--border)", borderRadius: 12,
          background: "var(--surface)", overflow: "hidden",
        }}>
          {item.metrics.map((m, i) => (
            <div key={m.label} style={{
              padding: "24px 28px",
              borderRight: i < item.metrics.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--accent)", marginBottom: 6 }}>
                {m.value}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {[
          { heading: "Problem",  body: item.problem },
          { heading: "Approach", body: item.approach },
          { heading: "Outcome",  body: item.outcome },
        ].map(s => (
          <div key={s.heading} style={{ borderLeft: "2px solid var(--border-md)", paddingLeft: 24 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ opacity: 0.4 }}>//</span> {s.heading}
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-2)" }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 56, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
        {item.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "5px 12px", borderRadius: 3,
            border: "1px solid var(--border-md)", color: "var(--text-3)",
            background: "rgba(38,192,248,0.06)",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{ marginTop: 64, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/work" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", textDecoration: "none" }}>
          ← All work
        </Link>
        <Link href="/contact" style={{
          fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "11px 22px", borderRadius: 5,
          background: "var(--accent)", color: "#fff", textDecoration: "none",
          boxShadow: "var(--shadow-accent)",
        }}>
          Init contact →
        </Link>
      </div>

    </div>
  )
}
