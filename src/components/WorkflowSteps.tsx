interface WorkflowStepsProps {
  steps: string[];
}

export default function WorkflowSteps({ steps }: WorkflowStepsProps) {
  return (
    <div className="space-y-1">
      {steps.map((step, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded border border-zinc-800/30 bg-zinc-900/10 px-3 py-2"
        >
          <span className="mt-0.5 shrink-0 font-mono text-[10px] text-zinc-600">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[11px] text-zinc-400 leading-relaxed">
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}
