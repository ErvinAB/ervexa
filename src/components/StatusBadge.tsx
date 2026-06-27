interface StatusBadgeProps {
  status: "active" | "experimental" | "in-development" | "archived" | "published" | "draft" | "planned";
}

const statusStyles: Record<string, string> = {
  active: "bg-emerald-950/30 text-emerald-400 border-emerald-900/50",
  experimental: "bg-amber-950/30 text-amber-400 border-amber-900/50",
  "in-development": "bg-blue-950/30 text-blue-400 border-blue-900/50",
  archived: "bg-zinc-800/30 text-zinc-400 border-zinc-700/30",
  published: "bg-emerald-950/30 text-emerald-400 border-emerald-900/50",
  draft: "bg-zinc-800/50 text-zinc-400 border-zinc-700/50",
  planned: "bg-zinc-800/30 text-zinc-400 border-zinc-700/30",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${statusStyles[status] || statusStyles.draft}`}
    >
      {status}
    </span>
  );
}
