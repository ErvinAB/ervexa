import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageIntro from "@/components/site/PageIntro";
import ServiceBlock from "@/components/site/ServiceBlock";
import CTASection from "@/components/site/CTASection";
import Eyebrow from "@/components/site/Eyebrow";
import { services, process } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Client work",
  description:
    "Selective client work from Stagbyte — a product-led studio that takes on a small number of app, MVP and partnership projects each year.",
  alternates: { canonical: "/client-work" },
};

export default function ClientWorkPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <Header />

      <PageIntro
        eyebrow="Client work"
        title="Selective client work, where it is a genuine fit."
        description="Stagbyte is product-led: our own apps come first. Client projects are a smaller, deliberate part of the studio — a few a year, taken on when the work is interesting and the fit is right."
      />

      <section className="paper-grain border-b border-charcoal/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:px-10 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>How it starts</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <p className="max-w-3xl text-lg leading-relaxed text-charcoal/80">
              Not every enquiry becomes a project, and we will say so early if it
              is not a fit. When it is, we start from the smallest thing that
              proves the idea works, build it, and let the result decide what
              happens next.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {services.map((service, index) => (
          <ServiceBlock key={service.id} service={service} index={index} />
        ))}
      </div>

      <section className="border-y border-charcoal/10 bg-ivory-soft">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <Eyebrow>The process</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight text-charcoal md:text-4xl">
            Four steps, and an honest answer at each one.
          </h2>

          <ol className="mt-12 grid gap-px border border-charcoal/15 bg-charcoal/15 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <li key={step.number} className="bg-ivory-soft p-7">
                <span className="label font-semibold text-forest">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-semibold uppercase tracking-tight text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-charcoal/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        eyebrow="Next step"
        title="Tell us what you want built."
        body="Describe the project, the deadline and the budget you are working with. If it is a fit we will say so; if it is not, we will tell you that too and point you somewhere better."
        primaryLabel="Send us a brief"
        secondaryHref="/apps"
        secondaryLabel="Our own apps"
      />

      <Footer />
    </div>
  );
}
