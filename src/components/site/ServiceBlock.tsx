import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/content/services";

export default function ServiceBlock({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <section
      id={service.id}
      className="scroll-mt-28 border-t border-charcoal/15 py-12 md:py-16"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <span className="label font-semibold text-forest">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="mt-5 text-2xl font-semibold leading-[1.1] tracking-tight text-charcoal md:text-3xl">
            {service.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/75">
            {service.summary}
          </p>
        </div>

        <div className="lg:col-span-7">
          <p className="max-w-2xl text-base leading-relaxed text-charcoal/70">
            {service.description}
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="label text-charcoal/70">What you get</p>
              <ul className="mt-4 space-y-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-base leading-relaxed text-charcoal/75"
                  >
                    <span
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-forest/70"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label text-charcoal/70">Tooling</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.stack.map((tech) => (
                  <span
                    key={tech}
                    className="label rounded border border-charcoal/20 bg-ivory-soft px-2 py-1 text-charcoal/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
              >
                Enquire about this
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
