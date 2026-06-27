import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ProjectsFilter from "./ProjectsFilter";
import { projects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Automation engineering portfolio: test automation frameworks, agentic systems, performance pipelines, and data reliability suites by Stagbyte.",
};

export default function ProjectsPage() {
  const allTechs = [...new Set(projects.flatMap((p) => p.technologies))].sort();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
        <PageHeader
          eyebrow="Projects"
          title="Engineering portfolio"
          description="Real projects in test automation, agentic systems, performance pipelines, data reliability, and workflow automation. Each is documented with architecture, decisions, and honest limitations."
        />

        <div className="mx-auto max-w-6xl px-6 py-12">
          <ProjectsFilter projects={projects} allTechnologies={allTechs} />
        </div>
      <Footer />
    </div>
  );
}
