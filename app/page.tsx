import Link from "next/link"
import meta from "@/content/meta.json"
import work from "@/content/work.json"

export default function Home() {
  const featured = work.slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Hero */}
      <section className="py-28 md:py-36">
        <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-6">
          Product Manager · AI Product Manager
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 leading-tight mb-6">
          {meta.headline}
        </h1>
        <p className="text-lg text-zinc-500 max-w-xl mb-10">
          {meta.subheadline}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/work"
            className="px-5 py-2.5 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 transition-colors text-sm font-medium"
          >
            See my work
          </Link>
          <a
            href={meta.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium text-zinc-700"
          >
            Schedule a call
          </a>
        </div>
      </section>

      {/* Featured work */}
      <section className="pb-24">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-8">
          Selected Work
        </h2>
        <div className="grid gap-4">
          {featured.map((item) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-6 border border-zinc-100 rounded-xl hover:border-zinc-300 hover:bg-zinc-50 transition-all"
            >
              <div>
                <p className="text-xs text-zinc-400 mb-1">{item.category}</p>
                <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 mt-1">{item.headline}</p>
              </div>
              <span className="text-zinc-300 group-hover:text-zinc-500 text-lg shrink-0">→</span>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/work" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
            View all work →
          </Link>
        </div>
      </section>
    </div>
  )
}
