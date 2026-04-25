import Link from "next/link"
import Image from "next/image"
import HeroTerminal from "@/components/HeroTerminal"
import meta from "@/content/meta.json"
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

const PROJECTS = work.slice(0, 3)

const ABOUT_CARDS = [
  { icon: "ph-brain",         title: "AI-native thinking",    desc: "Every product decision starts with: what does the model know, and where does the human loop in?" },
  { icon: "ph-rocket-launch", title: "Ship-first philosophy", desc: "Perfect is the enemy of live. I bias toward shipping, measuring, iterating." },
  { icon: "ph-layout",        title: "Design that works",     desc: "Interfaces that feel right and convert better. Systems that don't fall apart at page two." },
]

const SKILLS = ["AI/ML Products", "Product Strategy", "Design Systems", "LLM Pipelines", "0-to-1 Builds", "Payments & Fintech"]

const STATS = [
  { num: "12", accent: "+",      label: "Products launched" },
  { num: "0",  accent: "→1",     label: "Full-stack process" },
  { num: "AI", accent: "-first", label: "Every decision" },
  { num: "1",  accent: "×",      label: "No agency overhead" },
]

export default function Home() {
  return (
    <div>

      {/* ── HERO ── */}
      <section className="page-wrap hero-grid">
        <div style={{ display: "flex", flexDirection: "column" }}>

          <div className="ma-fade-up" style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 28 }}>
            <div style={{ width: 28, height: 1.5, background: "var(--cyan)" }} />
            AI Product Manager
          </div>

          <h1 className="ma-fade-up ma-delay-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(52px,6.5vw,96px)", fontWeight: 700, lineHeight: 0.96, letterSpacing: "-0.05em", color: "var(--text-1)", maxWidth: 860, marginBottom: 30 }}>
            <span className="hero-dim-text" style={{ color: "rgba(255,255,255,0.22)" }}>I build</span><br />
            <span style={{ background: "linear-gradient(90deg, var(--cyan), var(--cyan-700))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>products.</span><br />
            Zero to shipped.
          </h1>

          <p className="ma-fade-up ma-delay-2 hero-sub-text" style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-2)", maxWidth: 480, marginBottom: 48 }}>
            {meta.subheadline}
          </p>

          <div className="ma-fade-up ma-delay-3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/work" className="btn-primary" style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", padding: "13px 26px", borderRadius: "var(--radius-md)", background: "var(--cyan)", color: "#fff", textDecoration: "none", boxShadow: "0 4px 20px rgba(38,192,248,0.3)", display: "inline-flex", alignItems: "center", gap: 10 }}>
              <i className="ph-bold ph-briefcase" style={{ fontSize: 14 }} /> See the work
            </Link>
            <Link href="/contact" className="btn-outline" style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", padding: "13px 26px", borderRadius: "var(--radius-md)", background: "transparent", color: "var(--cyan-700)", textDecoration: "none", border: "1.5px solid var(--border-md)", display: "inline-flex", alignItems: "center", gap: 10 }}>
              Contact <i className="ph-bold ph-arrow-right" style={{ fontSize: 14 }} />
            </Link>
          </div>
        </div>

        <div className="ma-fade-in ma-delay-3 hero-terminal-wrap">
          <HeroTerminal />
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="page-wrap stats-grid">
        {STATS.map((s, i) => (
          <div key={i} className={`ma-fade-up stat-cell`} style={{ animationDelay: `${i * 60}ms`, padding: "28px 0", borderRight: i < 3 ? `1px solid var(--border)` : "none", paddingRight: i < 3 ? 32 : 0, paddingLeft: i > 0 ? 32 : 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 38, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, color: "var(--text-1)", marginBottom: 6 }}>
              {s.num}<span style={{ color: "var(--cyan)" }}>{s.accent}</span>
            </div>
            <div className="stat-label-text" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginTop: 40, transition: "background 0.25s ease" }}>
        <div className="page-wrap about-grid" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--border-md)" }}>//</span> About
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--text-1)", marginBottom: 20 }}>
              Not just a PM.<br />A builder.
            </h2>
            <p className="about-body-text" style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-2)", marginBottom: 14 }}>
              I&apos;m Manoj, an AI product manager who doesn&apos;t stop at the PRD. I prototype in Figma, ship in code, and deploy before the meeting where we&apos;d normally &quot;discuss next steps.&quot;
            </p>
            <p className="about-body-text" style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-2)" }}>
              No hand-waving. No &quot;we&apos;ll figure out engineering later.&quot; Just product thinking with the receipts to back it up.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
              {SKILLS.map(s => (
                <span key={s} style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-md)", color: "var(--cyan-700)", background: "var(--cyan-100)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ABOUT_CARDS.map((c) => (
              <div key={c.title} className="about-card" style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 34, height: 34, borderRadius: 6, background: "var(--cyan-100)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className={`ph-bold ${c.icon}`} style={{ fontSize: 16, color: "var(--cyan)" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 3 }}>{c.title}</div>
                  <div className="about-card-desc-text" style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SELECTED WORK ── */}
      <div className="page-wrap" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--border-md)" }}>//</span> Selected Work
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--text-1)" }}>Things I&apos;ve shipped</div>
          </div>
          <Link href="/work" className="see-all-link" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cyan)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            All projects <i className="ph-bold ph-arrow-right" style={{ fontSize: 12 }} />
          </Link>
        </div>

        <div className="work-grid">
          {PROJECTS.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} style={{ textDecoration: "none" }}>
              <div className="project-card" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ height: 180, position: "relative", overflow: "hidden", background: GRADS[p.slug] || "var(--surface2)", borderBottom: "1px solid var(--border)" }}>
                  {p.hero_image ? (
                    <Image
                      src={p.hero_image}
                      alt={p.title}
                      fill
                      style={{ objectFit: "cover", objectPosition: "top" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className={`ph-thin ${ICONS[p.slug] || "ph-cube"}`} style={{ fontSize: 56, color: "rgba(38,192,248,0.15)" }} />
                    </div>
                  )}
                </div>
                <div style={{ padding: 18 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 8 }}>{p.category}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--text-1)", marginBottom: 6, letterSpacing: "-0.01em" }}>{p.title}</div>
                  <div className="project-desc-text" style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.5, marginBottom: 14 }}>{p.summary}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {p.tags.slice(0, 2).map(tag => (
                        <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 8px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <i className="ph-bold ph-arrow-right project-arrow" style={{ fontSize: 13, color: "var(--cyan)" }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
