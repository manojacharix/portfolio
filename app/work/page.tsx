import Link from "next/link"
import work from "@/content/work.json"

const GRADS = [
  "linear-gradient(135deg,#E1F6FE,#A6E5FC,#6DD5FA)",
  "linear-gradient(135deg,#FFF5E6,#FFD494,#FEA92A)",
  "linear-gradient(135deg,#D1E7F5,#75B6E0,#2980B9)",
]
const ICONS = ["ph-brain", "ph-chart-line-up", "ph-layout"]

export default function WorkIndex() {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 80px" }}>

      <div style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--cyan-200)" }}>//</span> Work
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,72px)", fontWeight: 700, lineHeight: 0.96, letterSpacing: "-0.04em", color: "var(--text-1)", marginBottom: 16 }}>
          Things I&apos;ve shipped<span style={{ display: "inline-block", width: 2, height: "0.85em", background: "var(--cyan-600)", marginLeft: 4, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
        </h1>
        <p style={{ fontSize: 16, color: "var(--cyan-800)", opacity: 0.7, maxWidth: 480, lineHeight: 1.6 }}>
          AI products, SaaS tools, design systems. All real, all shipped.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {work.map((item, i) => (
          <Link key={item.slug} href={`/work/${item.slug}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, overflow: "hidden",
              boxShadow: "var(--shadow-sm)",
              height: "100%", display: "flex", flexDirection: "column",
              transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
            }}>
              {/* Thumb */}
              <div style={{ height: 180, background: GRADS[i % GRADS.length], display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <i className={`ph-thin ${ICONS[i % ICONS.length]}`} style={{ fontSize: 64, color: "rgba(5,103,138,0.18)" }} />
                {item.metrics.length > 0 && (
                  <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)", borderRadius: 4, padding: "4px 10px", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--cyan-800)", letterSpacing: "0.06em" }}>
                    {item.metrics[0].value} {item.metrics[0].label}
                  </div>
                )}
              </div>
              {/* Body */}
              <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 8 }}>
                  {item.category}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--text-1)", marginBottom: 8, letterSpacing: "-0.01em" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: "var(--cyan-800)", opacity: 0.7, lineHeight: 1.55, marginBottom: 16, flex: 1 }}>
                  {item.headline}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 3, border: "1px solid var(--border-md)", color: "var(--cyan-700)", background: "var(--cyan-50)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                    agent-indexed · 2h ago
                  </span>
                  <i className="ph-bold ph-arrow-right" style={{ fontSize: 14, color: "var(--cyan-200)" }} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
