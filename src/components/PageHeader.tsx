interface PageHeaderProps {
  title: string;
  description: string;
  eyebrow?: string;
}

export default function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <div className="relative border-b border-zinc-800/50 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-cyan-900/5 blur-[100px]" />
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {eyebrow && (
          <div className="flex items-center gap-3 kinetic-word" style={{ animationDelay: "0.1s" }}>
            <span className="h-px w-6 bg-cyan-500/50" />
            <p className="font-mono text-xs text-cyan-500 uppercase tracking-widest">
              {eyebrow}
            </p>
          </div>
        )}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl lg:text-5xl kinetic-word" style={{ animationDelay: "0.2s" }}>
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-zinc-400 leading-relaxed md:text-base kinetic-word" style={{ animationDelay: "0.35s" }}>
          {description}
        </p>
      </div>
    </div>
  );
}
