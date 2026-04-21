import meta from "@/content/meta.json"

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 mt-24 py-10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
        <span>© {new Date().getFullYear()} {meta.name}</span>
        <div className="flex gap-6">
          <a href={meta.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 transition-colors">LinkedIn</a>
          <a href={`mailto:${meta.email}`} className="hover:text-zinc-700 transition-colors">Email</a>
          <a href={meta.calendly} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 transition-colors">Schedule a call</a>
        </div>
      </div>
    </footer>
  )
}
