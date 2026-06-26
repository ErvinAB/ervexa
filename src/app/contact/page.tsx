import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateInView from "@/components/AnimateInView";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { socialLinks } from "@/lib/content/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have an automation problem, unreliable test suite, or repetitive workflow? Contact Stagbyte.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <PageHeader
        eyebrow="Contact"
        title="Have an automation problem?"
        description="Describe the process, system, or quality problem. Stagbyte will help determine whether it needs QA automation, an agentic workflow, low-code orchestration, or custom engineering."
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-5">
          <AnimateInView className="md:col-span-3">
            <ContactForm />
          </AnimateInView>

          <div className="md:col-span-2 space-y-6">
            <AnimateInView delay={0.15}>
              <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all hover:border-zinc-700/50 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-zinc-900/20">
                <p className="mb-3 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                  Email
                </p>
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> {socialLinks.email}
                </a>
              </div>
            </AnimateInView>

            <AnimateInView delay={0.25}>
              <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-6 transition-all hover:border-zinc-700/50 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-zinc-900/20">
                <p className="mb-3 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                  Project Types
                </p>
                <ul className="space-y-1.5">
                  {[
                    "QA Automation Framework",
                    "API or Backend Testing",
                    "AI QA or Agentic Testing",
                    "Data Quality",
                    "n8n Workflow Automation",
                    "Low-Code or No-Code Automation",
                    "Custom Automation Engineering",
                    "CI/CD Integration",
                    "Technical Collaboration",
                  ].map((type) => (
                    <li
                      key={type}
                      className="flex items-start gap-2 font-mono text-[10px] text-zinc-500"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-700" />
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
