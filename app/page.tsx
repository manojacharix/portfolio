import Link from "next/link"
import meta from "@/content/meta.json"
import work from "@/content/work.json"
import HeroMac from "@/components/HeroTerminal"

export default function Home() {
  const featured = work.slice(0, 3)

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "80px 80px 60px",
        display: "grid",
        gridTemplateColumns: "1fr 460px",
        gap: 56,
        alignItems: "center",
        minHeight: "calc(100vh - 88px)",
      }}>
        {/* Left: text */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "var(--font-mono)", fontSize: 11,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--cyan-600)", marginBottom: 28,
            animation: "fadeUp 0.5s ease both",
          }}>
            <div style={{ width: 28, height: 1.5, background: "var(--cyan-600)" }} />
            AI Product Manager
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 5.5vw, 88px)",
            fontWeight: 700, lineHeight: 0.96,
            letterSpacing: "-0.05em", color: "var(--text-1)",
            marginBottom: 28,
            animation: "fadeUp 0.5s 0.1s ease both",
          }}>
            <span style={{ color: "rgba(1,13,20,0.22)" }}>I build</span><br />
            <span style={{
              background: "linear-gradient(90deg, var(--cyan-600), var(--cyan-700))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>products.</span><br />
            Zero to shipped.
          </h1>

          <p style={{
            fontSize: 17, lineHeight: 1.7, color: "var(--cyan-800)",
            maxWidth: 460, marginBottom: 44, opacity: 0.8,
            animation: "fadeUp 0.5s 0.2s ease both",
          }}>
            {meta.subheadline}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.5s 0.3s ease both" }}>
            <Link href="/work" style={{
              fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "13px 26px", borderRadius: 5, cursor: "pointer",
              background: "var(--cyan-600)", color: "#fff", textDecoration: "none",
              boxShadow: "0 4px 20px rgba(38,192,248,0.3)",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              See the work →
            </Link>
            <Link href="/contact" style={{
              fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "13px 26px", borderRadius: 5, cursor: "pointer",
              background: "transparent", color: "var(--cyan-700)", textDecoration: "none",
              border: "1.5px solid var(--border-md)",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              Init contact
            </Link>
          </div>
        </div>

        {/* Right: Mac WebGL */}
        <div style={{ height: 500, position: "relative" }}>
          <HeroMac />
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "0 80px 80px",
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        borderTop: "1px solid var(--border)",
      }}>
        {[
          { num: "0→1",  label: "Full-stack process" },
          { num: "89%",  label: "Efficiency gain, Litscreen" },
          { num: "20%",  label: "Engagement uplift, Zataak Se" },
          { num: "AI",   label: "Every product decision" },
        ].map((s, i) => (
          <div key={i} style={{
            padding: "28px 0",
            borderRight: i < 3 ? "1px solid var(--border)" : "none",
            paddingRight: i < 3 ? 32 : 0,
            paddingLeft: i > 0 ? 32 : 0,
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, letterSpacing: "-0.05em", color: "var(--text-1)", marginBottom: 5 }}>
              {s.num}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cyan-800)", opacity: 0.5 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── ABOUT STRIP ── */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 80px", display: "grid", gridTemplateColumns: "5fr 4fr", gap: 80, alignItems: "start" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--cyan-200)" }}>//</span> About
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--text-1)", marginBottom: 20 }}>
              Not just a PM.<br />A builder.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--cyan-800)", opacity: 0.8, marginBottom: 14 }}>
              I&apos;m Manoj — an AI product manager who doesn&apos;t stop at the PRD. I prototype in Figma, ship in code, and deploy before the meeting where we&apos;d normally &quot;discuss next steps.&quot;
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--cyan-800)", opacity: 0.8 }}>
              No hand-waving. No &quot;we&apos;ll figure out engineering later.&quot; Just product thinking with the receipts to back it up.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
              {["AI/ML Products","Product Strategy","Design Systems","LLM Pipelines","0-to-1 Builds","Payments & Fintech"].map(s => (
                <span key={s} style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "5px 12px", borderRadius: 3,
                  border: "1px solid var(--border-md)", color: "var(--cyan-700)", background: "var(--cyan-100)",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "ph-brain",         title: "AI-native thinking",    desc: "Every product decision starts with: what does the model know, and where does the human loop in?" },
              { icon: "ph-rocket-launch", title: "Ship-first philosophy", desc: "Perfect is the enemy of live. I bias toward shipping, measuring, iterating." },
              { icon: "ph-layout",        title: "Design that converts",  desc: "Interfaces that feel right and perform better. Systems that don't fall apart at page two." },
            ].map(c => (
              <div key={c.title} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 34, height: 34, borderRadius: 6, background: "var(--cyan-100)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className={`ph-bold ${c.icon}`} style={{ fontSize: 16, color: "var(--cyan-600)" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 3 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: "var(--cyan-800)", opacity: 0.65, lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SELECTED WORK ── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--cyan-200)" }}>//</span> Selected Work
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--text-1)" }}>Things I&apos;ve shipped</div>
          </div>
          <Link href="/work" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cyan-600)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            All projects →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {featured.map((item, i) => {
            const grads = [
              "linear-gradient(135deg,#E1F6FE,#A6E5FC,#6DD5FA)",
              "linear-gradient(135deg,#FFF5E6,#FFD494,#FEA92A)",
              "linear-gradient(135deg,#E1F6FE,#C4EEFD,#26C0F8)",
            ]
            return (
              <Link key={item.slug} href={`/work/${item.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", cursor: "pointer", boxShadow: "var(--shadow-sm)", transition: "all 0.2s" }}>
                  <div style={{ height: 160, background: grads[i % 3], display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="ph-thin ph-brain" style={{ fontSize: 56, color: "rgba(5,103,138,0.2)" }} />
                  </div>
                  <div style={{ padding: 18 }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan-600)", marginBottom: 8 }}>{item.category}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--text-1)", marginBottom: 6, letterSpacing: "-0.01em" }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "var(--cyan-800)", opacity: 0.7, lineHeight: 1.5, marginBottom: 14 }}>{item.headline}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>2024</span>
                      <span style={{ fontSize: 14, color: "var(--cyan-200)" }}>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
