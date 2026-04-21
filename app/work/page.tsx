import Link from "next/link"
import work from "@/content/work.json"

export default function WorkIndex() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Work</h1>
      <p className="text-zinc-500 mb-12">Case studies focused on product thinking, AI, and impact.</p>

      <div className="grid gap-4">
        {work.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-6 border border-zinc-100 rounded-xl hover:border-zinc-300 hover:bg-zinc-50 transition-all"
          >
            <div>
              <p className="text-xs text-zinc-400 mb-1">{item.category}</p>
              <h2 className="font-semibold text-zinc-900 group-hover:text-zinc-700">{item.title}</h2>
              <p className="text-sm text-zinc-500 mt-1">{item.headline}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-100 text-zinc-500 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-zinc-300 group-hover:text-zinc-500 text-lg shrink-0">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
