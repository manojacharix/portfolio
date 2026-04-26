import Link from "next/link"
import Image from "next/image"
import work from "@/content/work.json"

const GRADS: Record<string, string> = {
  "litscreen":      "linear-gradient(135deg,#1a2a1a,#0d1f0d)",
  "zataak-se":      "linear-gradient(135deg,#2a1a00,#1a0d00)",
  "job-automation": "linear-gradient(135deg,#001a2a,#000d1a)",
  "vordo-ai":       "linear-gradient(135deg,#1a001a,#0d000d)",
}

const ICONS: Record<string, string> = {
  "litscreen":      "ph-brain",
  "zataak-se":      "ph-storefront",
  "job-automation": "ph-git-branch",
  "vordo-ai":       "ph-microphone",
}

export default function WorkIndex() {
  return (
    <div className="page-wrap" style={{ paddingTop: 60, paddingBottom: 60 }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div className="ma-fade-up" style={{
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ opacity: 0.4 }}>//</span> Work
        </div>
        <h1 className="ma-fade-up ma-delay-1" style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 72px)",
          fontWeight: 700, lineHeight: 0.96, letterSpacing: "-0.05em",
          color: "var(--text-1)", marginBottom: 16,
        }}>
          Things I&apos;ve shipped
          <span className="ma-blink" style={{
            display: "inline-block", width: 3, height: "0.8em",
            background: "var(--yellow)", marginLeft: 8, verticalAlign: "middle",
          }} />
        </h1>
        <p className="ma-fade-up ma-delay-2 page-sub-text" style={{
          fontSize: 16, color: "var(--text-2)", maxWidth: 480, lineHeight: 1.6,
        }}>
          AI products, payments, quick commerce, and ops tooling. All real decisions, real outcomes.
        </p>
      </div>

      {/* Grid */}
      <div className="work-grid">
        {work.map((p, i) => (
          <Link key={p.slug} href={`/work/${p.slug}`} style={{ textDecoration: "none" }}>
            <div className="project-card" style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", overflow: "hidden",
              boxShadow: "var(--shadow-md)",
            }}>
              {/* Image or gradient fallback */}
              <div style={{
                height: 200, position: "relative", overflow: "hidden",
                background: GRADS[p.slug] || "var(--surface2)",
                borderBottom: "1px solid var(--border)",
              }}>
                {p.hero_image ? (
                  <Image
                    src={p.hero_image}
                    alt={p.title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div style={{
                    width: "100%", height: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <i className={`ph-thin ${ICONS[p.slug] || "ph-cube"}`}
                      style={{ fontSize: 64, color: "rgba(38,192,248,0.15)" }} />
                  </div>
                )}
              </div>

              <div style={{ padding: 20 }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "var(--cyan)", marginBottom: 8,
                }}>
                  {p.category}
                </div>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600,
                  color: "var(--text-1)", marginBottom: 8, letterSpacing: "-0.01em",
                }}>
                  {p.title}
                </div>
                <div className="project-desc-text" style={{
                  fontSize: 13, color: "var(--text-2)", lineHeight: 1.55, marginBottom: 16,
                }}>
                  {p.summary}
                </div>

                {/* Metrics preview */}
                {p.metrics.length > 0 && (
                  <div style={{
                    display: "flex", gap: 16, flexWrap: "nowrap", overflow: "hidden",
                    marginBottom: 16, paddingBottom: 16,
                    borderBottom: "1px solid var(--border)",
                  }}>
                    {p.metrics.slice(0, 3).map(m => (
                      <div key={m.label}>
                        <div style={{
                          fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700,
                          color: "var(--cyan)", letterSpacing: "-0.02em", lineHeight: 1,
                        }}>
                          {m.value}
                        </div>
                        <div style={{
                          fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.06em",
                          textTransform: "uppercase", color: "var(--text-muted)", marginTop: 3,
                        }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  paddingTop: p.metrics.length > 0 ? 0 : 12,
                  borderTop: p.metrics.length > 0 ? "none" : "1px solid var(--border)",
                }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tags.slice(0, 2).map(tag => (
                      <span key={tag} style={{
                        fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.06em",
                        textTransform: "uppercase", padding: "3px 8px",
                        borderRadius: "var(--radius-sm)", border: "1px solid var(--border)",
                        color: "var(--text-muted)", background: "transparent",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <i className="ph-bold ph-arrow-right project-arrow"
                    style={{ fontSize: 14, color: "var(--cyan)", flexShrink: 0 }} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
