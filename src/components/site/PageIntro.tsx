import Eyebrow from "@/components/site/Eyebrow";
import MiniForest from "@/components/site/MiniForest";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  /** "paper" for light pages, "night" for the dark showcase pages. */
  tone?: "paper" | "night";
  children?: React.ReactNode;
}

export default function PageIntro({
  eyebrow,
  title,
  description,
  tone = "paper",
  children,
}: PageIntroProps) {
  const isNight = tone === "night";

  return (
    <section
      className={
        isNight
          ? "on-night relative overflow-hidden bg-night"
          : "relative overflow-hidden border-b border-charcoal/10"
      }
    >
      {/* On night pages "ivory" is re-scoped to text, so the fade uses the
          night surface instead. */}
      <MiniForest className={isNight ? "[--color-ivory:var(--color-night)]" : ""} />

      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
        <Eyebrow tone={isNight ? "night" : "ink"}>{eyebrow}</Eyebrow>
        <h1
          className={`hero-rise mt-7 max-w-3xl text-6xl font-bold leading-[1.02] tracking-[-0.02em] ${
            isNight ? "text-ivory" : "text-charcoal"
          }`}
        >
          {title}
        </h1>
        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed ${
            isNight ? "text-ivory/75" : "text-charcoal/75"
          }`}
        >
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}
