import about from "@/content/about.json"
import meta from "@/content/meta.json"

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight mb-6">About</h1>

      <p className="text-lg text-zinc-600 leading-relaxed mb-4">{about.bio}</p>
      <p className="text-zinc-500 leading-relaxed mb-14">{about.philosophy}</p>

      {/* Experience */}
      <section className="mb-14">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-6">Experience</h2>
        <div className="space-y-8">
          {about.experience.map((exp) => (
            <div key={exp.company} className="flex gap-6">
              <div className="w-24 shrink-0 text-xs text-zinc-400 pt-0.5">{exp.period}</div>
              <div>
                <p className="font-semibold text-zinc-900">{exp.role}</p>
                <p className="text-sm text-zinc-400 mb-2">{exp.company}</p>
                <p className="text-sm text-zinc-600 leading-relaxed">{exp.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-14">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {about.skills.map((skill) => (
            <span key={skill} className="text-sm px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Tools</h2>
        <div className="flex flex-wrap gap-2">
          {about.tools.map((tool) => (
            <span key={tool} className="text-sm px-3 py-1 border border-zinc-200 text-zinc-500 rounded-full">
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-14 p-6 border border-zinc-100 rounded-xl">
        <p className="text-zinc-600 mb-4">Open to Product Manager and AI PM roles. Let's talk.</p>
        <div className="flex gap-4">
          <a
            href={meta.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-900 text-white text-sm rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Schedule a call
          </a>
          <a
            href={`mailto:${meta.email}`}
            className="px-4 py-2 border border-zinc-200 text-zinc-700 text-sm rounded-lg hover:bg-zinc-50 transition-colors"
          >
            Send an email
          </a>
        </div>
      </div>
    </div>
  )
}
