import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "@/components/site/Eyebrow";
import { principles } from "@/lib/content/home";

export default function Studio() {
  return (
    <section id="studio" className="scroll-mt-24 border-b border-charcoal/10">
      <div className="reveal mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Eyebrow>The studio</Eyebrow>
          <h2 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-tight text-charcoal md:text-4xl">
            A small studio that finishes what it starts.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/75">
            Stagbyte is independent and deliberately small. We design, build,
            release and support what we make — our own apps first, and selective
            client work alongside them.
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
          >
            More about the studio
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <ol className="grid gap-8 self-end lg:col-span-7">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              className="flex gap-6 border-t border-charcoal/15 pt-6"
            >
              <span className="label font-semibold text-forest">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-charcoal">
                  {principle.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-charcoal/75">
                  {principle.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
