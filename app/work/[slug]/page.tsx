import Link from "next/link"
import { notFound } from "next/navigation"
import work from "@/content/work.json"
import CaseStudyImages from "@/components/CaseStudyImages"

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }))
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = work.find((w) => w.slug === slug)
  if (!item) notFound()

  const sections = [
    { key: "problem",       heading: "Problem",       body: item.problem },
    { key: "my_call",       heading: "My call",       body: item.my_call },
    { key: "what_i_shipped",heading: "What I shipped", body: item.what_i_shipped },
    { key: "outcome",       heading: "Outcome",       body: item.outcome },
    { key: "how_i_built_it",heading: "How I built it", body: item.how_i_built_it },
  ].filter(s => s.body)

  // Split sections: first two before images, rest after
  const beforeImages = sections.slice(0, 2)
  const afterImages  = sections.slice(2)

  return (
    <div className="page-wrap" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 900 }}>

      {/* Back */}
      <Link href="/work" className="back-link" style={{
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 40,
      }}>
        <i className="ph-bold ph-arrow-left" style={{ fontSize: 12 }} /> Back to work
      </Link>

      {/* Category */}
      <div className="ma-fade-up" style={{
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em",
        textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ opacity: 0.4 }}>//</span> {item.category}
      </div>

      {/* Title */}
      <h1 className="ma-fade-up ma-delay-1" style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,64px)",
        fontWeight: 700, lineHeight: 0.96, letterSpacing: "-0.04em",
        color: "var(--text-1)", marginBottom: 16,
      }}>
        {item.title}
      </h1>

      {/* Context line */}
      {item.context && (
        <div className="ma-fade-up ma-delay-1" style={{
          fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)",
          letterSpacing: "0.06em", marginBottom: 20,
        }}>
          {item.context}
        </div>
      )}

      {/* Headline */}
      <p className="ma-fade-up ma-delay-2" style={{
        fontSize: 18, lineHeight: 1.6, color: "var(--text-2)", marginBottom: 40, maxWidth: 640,
      }}>
        {item.headline}
      </p>

      {/* Metrics */}
      {item.metrics.length > 0 && (
        <div className="ma-fade-up ma-delay-3 cs-metrics" style={{ marginBottom: 56 }}>
          {item.metrics.map((m, i) => (
            <div key={m.label} className="cs-metric-cell" style={{
              borderRight: i < item.metrics.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700,
                letterSpacing: "-0.04em", color: "var(--cyan)", marginBottom: 6,
              }}>
                {m.value}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--text-muted)",
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* First two sections: Problem + My call */}
      {beforeImages.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 40, marginBottom: 56 }}>
          {beforeImages.map(s => (
            <div key={s.key} style={{ borderLeft: "2px solid var(--border-md)", paddingLeft: 24 }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "var(--cyan)", marginBottom: 12,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ opacity: 0.4 }}>//</span> {s.heading}
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--text-2)" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Hero image + inline image grid (client — supports lightbox) */}
      <CaseStudyImages
        heroImage={item.hero_image}
        heroAlt={`${item.title} hero`}
        images={item.images || []}
      />

      {/* Remaining sections: What I shipped, Outcome, How I built it */}
      {afterImages.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 40, marginBottom: 56 }}>
          {afterImages.map((s, i) => (
            <div key={s.key} style={{
              borderLeft: s.key === "how_i_built_it" ? "2px solid var(--border)" : "2px solid var(--border-md)",
              paddingLeft: 24,
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: s.key === "how_i_built_it" ? "var(--text-muted)" : "var(--cyan)",
                marginBottom: 12, display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ opacity: 0.4 }}>//</span> {s.heading}
                {s.key === "how_i_built_it" && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em",
                    background: "var(--surface2)", border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)", padding: "2px 8px", color: "var(--text-muted)",
                    textTransform: "uppercase",
                  }}>technical</span>
                )}
              </div>
              <p style={{
                fontSize: s.key === "how_i_built_it" ? 14 : 16,
                lineHeight: 1.85, color: "var(--text-2)",
              }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 8,
        paddingTop: 32, borderTop: "1px solid var(--border)",
      }}>
        {item.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em",
            textTransform: "uppercase", padding: "5px 12px", borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-md)", color: "var(--text-3)",
            background: "rgba(38,192,248,0.06)",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{
        marginTop: 64, display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <Link href="/work" style={{
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none",
          transition: "color 0.15s",
        }}>
          All work
        </Link>
        <Link href="/contact" className="ma-press btn-primary" style={{
          fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "11px 22px", borderRadius: "var(--radius-md)",
          background: "var(--cyan)", color: "#fff", textDecoration: "none",
          boxShadow: "0 4px 20px rgba(38,192,248,0.3)",
        }}>
          Contact
        </Link>
      </div>

    </div>
  )
}
