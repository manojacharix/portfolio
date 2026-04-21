import Link from "next/link"
import meta from "@/content/meta.json"

export default function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur border-b border-zinc-100">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-zinc-900 tracking-tight">
          {meta.name}
        </Link>
        <div className="flex items-center gap-6 text-sm text-zinc-600">
          <Link href="/work" className="hover:text-zinc-900 transition-colors">Work</Link>
          <Link href="/about" className="hover:text-zinc-900 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-zinc-900 transition-colors">Contact</Link>
          <a
            href={meta.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-zinc-900 text-white rounded-md hover:bg-zinc-700 transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  )
}
