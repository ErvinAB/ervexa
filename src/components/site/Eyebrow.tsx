interface EyebrowProps {
  children: React.ReactNode;
  /** "ink" for light surfaces, "night" for dark showcase surfaces. */
  tone?: "ink" | "night";
  className?: string;
}

export default function Eyebrow({
  children,
  tone = "ink",
  className = "",
}: EyebrowProps) {
  const color = tone === "night" ? "text-accent" : "text-forest";

  return (
    <p
      className={`label flex items-center gap-3 font-semibold ${color} ${className}`}
    >
      <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
      {children}
    </p>
  );
}
