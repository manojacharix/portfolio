import meta from "@/content/meta.json"

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight mb-4">Let's talk</h1>
      <p className="text-zinc-500 mb-12">
        I'm actively looking for Product Manager and AI PM roles. If you're building something interesting, I'd love to hear about it.
      </p>

      <div className="space-y-4">
        <a
          href={meta.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-5 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all group"
        >
          <div>
            <p className="font-medium text-zinc-900">Schedule a call</p>
            <p className="text-sm text-zinc-400 mt-0.5">Pick a time that works for you</p>
          </div>
          <span className="text-zinc-300 group-hover:text-zinc-600 text-lg">→</span>
        </a>

        <a
          href={`mailto:${meta.email}`}
          className="flex items-center justify-between p-5 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all group"
        >
          <div>
            <p className="font-medium text-zinc-900">Email</p>
            <p className="text-sm text-zinc-400 mt-0.5">{meta.email}</p>
          </div>
          <span className="text-zinc-300 group-hover:text-zinc-600 text-lg">→</span>
        </a>

        <a
          href={meta.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-5 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all group"
        >
          <div>
            <p className="font-medium text-zinc-900">LinkedIn</p>
            <p className="text-sm text-zinc-400 mt-0.5">Connect or message me</p>
          </div>
          <span className="text-zinc-300 group-hover:text-zinc-600 text-lg">→</span>
        </a>
      </div>
    </div>
  )
}
