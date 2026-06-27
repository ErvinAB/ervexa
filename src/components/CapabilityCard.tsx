import type { Capability } from "@/lib/content/capabilities";

interface CapabilityCardProps {
  capability: Capability;
}

export default function CapabilityCard({ capability }: CapabilityCardProps) {
  return (
    <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all hover:border-zinc-700/50 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-zinc-900/20">
      <h3 className="text-base font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors">{capability.title}</h3>
      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
        {capability.summary}
      </p>
      <ul className="mt-4 space-y-1.5">
        {capability.details.slice(0, 6).map((detail) => (
          <li
            key={detail}
            className="flex items-start gap-2 font-mono text-[10px] text-zinc-500"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-700" />
            {detail}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {capability.technologies.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="rounded bg-zinc-800/40 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
