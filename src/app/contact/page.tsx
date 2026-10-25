import type { Metadata } from "next";
import { Linkedin, Mail, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageIntro from "@/components/site/PageIntro";
import ContactForm from "@/components/ContactForm";
import { contactDetails, socialLinks } from "@/lib/content/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Stagbyte — about our apps, a problem you want solved, or a selective client project.",
  alternates: { canonical: "/contact" },
};

const enquiryTypes = [
  "Hear about the first app",
  "Suggest a problem to solve",
  "Client project",
  "Prototype or MVP",
  "Ongoing partnership",
  "Game work",
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <Header />

      <PageIntro
        eyebrow="Contact"
        title="Get in touch."
        description="Tell us what you would want a small app to do, or describe a project you think is a fit for selective client work. The more specific you are, the more useful our reply will be."
      />

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="border border-charcoal/15 bg-ivory-soft p-8">
              <p className="label font-semibold text-charcoal/70">Email</p>
              <a
                href={`mailto:${socialLinks.email}`}
                className="mt-4 inline-flex items-center gap-2 text-base text-charcoal/75 transition-colors hover:text-charcoal"
              >
                <Mail className="h-4 w-4" /> {socialLinks.email}
              </a>
            </div>

            <div className="border border-charcoal/15 bg-ivory-soft p-8">
              <p className="label font-semibold text-charcoal/70">Studio</p>
              <p className="mt-4 inline-flex items-center gap-2 text-base text-charcoal/75">
                <MapPin className="h-4 w-4" /> {contactDetails.location}
              </p>
              <p className="mt-3 text-base leading-relaxed text-charcoal/70">
                {contactDetails.availability}
              </p>
              <a
                href={socialLinks.linkedinCompany}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-base text-charcoal/75 transition-colors hover:text-charcoal"
              >
                <Linkedin className="h-4 w-4" /> Stagbyte on LinkedIn
              </a>
            </div>

            <div className="border border-charcoal/15 bg-ivory-soft p-8">
              <p className="label font-semibold text-charcoal/70">
                What people write about
              </p>
              <ul className="mt-5 space-y-2.5">
                {enquiryTypes.map((type) => (
                  <li
                    key={type}
                    className="flex items-start gap-2 text-base leading-relaxed text-charcoal/75"
                  >
                    <span
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-forest/70"
                      aria-hidden="true"
                    />
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
