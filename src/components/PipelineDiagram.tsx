interface PipelineStep {
  label: string;
  description?: string;
}

interface PipelineDiagramProps {
  steps: PipelineStep[];
  title?: string;
}

export default function PipelineDiagram({ steps, title }: PipelineDiagramProps) {
  return (
    <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-4 md:p-6">
      {title && (
        <p className="mb-4 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
          {title}
        </p>
      )}
      <div className="flex flex-wrap gap-2 md:gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex items-center gap-2 rounded border border-zinc-800/60 bg-zinc-900/40 px-2.5 py-1.5 md:px-3 md:py-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-zinc-800 font-mono text-[9px] text-zinc-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="font-mono text-[10px] text-zinc-300 md:text-[11px]">
                  {step.label}
                </span>
                {step.description && (
                  <span className="ml-1 hidden font-mono text-[9px] text-zinc-600 md:inline">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-1 hidden text-zinc-700 md:block">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
