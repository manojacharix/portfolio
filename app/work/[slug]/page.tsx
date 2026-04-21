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
    <div className="max-w-3xl mx-auto px-6 py-20">
      {/* Header */}
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
        {item.category}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight mb-4">{item.title}</h1>
      <p className="text-xl text-zinc-500 mb-10">{item.headline}</p>

      {/* Metrics */}
      {item.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14 p-6 bg-zinc-50 rounded-xl">
          {item.metrics.map((m) => (
            <div key={m.label}>
              <p className="text-2xl font-semibold text-zinc-900">{m.value}</p>
              <p className="text-xs text-zinc-400 mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Body */}
      <div className="space-y-10 text-zinc-700 leading-relaxed">
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Problem</h2>
          <p>{item.problem}</p>
        </section>
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Approach</h2>
          <p>{item.approach}</p>
        </section>
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Outcome</h2>
          <p>{item.outcome}</p>
        </section>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-12">
        {item.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-100 text-zinc-500 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
