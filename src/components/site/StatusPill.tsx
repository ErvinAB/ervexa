interface StatusPillProps {
  label: string;
  tone?: "ink" | "night";
  pulse?: boolean;
}

export default function StatusPill({
  label,
  tone = "ink",
  pulse = false,
}: StatusPillProps) {
  const styles =
    tone === "night"
      ? "border-ivory/25 text-ivory/75"
      : "border-charcoal/25 text-charcoal/70";
  const dot = tone === "night" ? "bg-accent" : "bg-forest";

  return (
    <span
      className={`label inline-flex items-center gap-2 rounded-full border px-3 py-1 font-semibold ${styles}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dot} ${pulse ? "status-pulse" : ""}`}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
