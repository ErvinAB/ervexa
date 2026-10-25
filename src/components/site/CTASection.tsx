import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "@/components/site/Eyebrow";
import NewsletterForm from "@/components/site/NewsletterForm";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  body: string;
  /**
   * When set, the section's one loud action is the email capture and the
   * remaining links are quiet text links. A close section with two competing
   * buttons has no last word.
   */
  newsletter?: boolean;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

const quietLink =
  "group inline-flex items-center gap-2 text-base font-medium text-ivory/75 underline-offset-4 transition-colors hover:text-ivory hover:underline";

export default function CTASection({
  eyebrow = "Work with us",
  title,
  body,
  newsletter = false,
  primaryHref = "/contact",
  primaryLabel = "Get in touch",
  secondaryHref,
  secondaryLabel,
}: CTASectionProps) {
  return (
    <section className="on-night bg-night">
      <div className="reveal mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="night">{eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-tight text-ivory md:text-4xl">
              {title}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ivory/75">{body}</p>

            {newsletter ? (
              <>
                <NewsletterForm className="mt-8" />
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link href={primaryHref} className={quietLink}>
                    {primaryLabel}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  {secondaryHref && secondaryLabel ? (
                    <Link href={secondaryHref} className={quietLink}>
                      {secondaryLabel}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href={primaryHref}
                  className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-night transition-colors hover:bg-ivory active:bg-ivory"
                >
                  {primaryLabel}
                </Link>
                {secondaryHref && secondaryLabel ? (
                  <Link href={secondaryHref} className={quietLink}>
                    {secondaryLabel}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
