import type { Project } from "./content/projects";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Stagbyte",
  description:
    "Quality engineering and automation studio. QA automation frameworks, agentic testing, data reliability, and engineering workflow automation.",
  url: "https://stagbyte.netlify.app",
  founder: {
    "@type": "Person",
    name: "Ervin Abedin",
    jobTitle: "Senior QA Automation Engineer & AI QA Engineer",
    url: "https://github.com/ErvinAB",
    sameAs: [
      "https://www.linkedin.com/in/ervin-abedin-8a6040235/",
      "https://github.com/ErvinAB",
    ],
  },
};

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    programmingLanguage: project.technologies,
    codeRepository: project.repoUrl,
    applicationCategory: "Quality Engineering",
  };
}
