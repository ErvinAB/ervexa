export interface Technology {
  name: string;
  category: string;
}

export const technologies: Technology[] = [
  { name: "Playwright", category: "testing" },
  { name: "TypeScript", category: "language" },
  { name: "Python", category: "language" },
  { name: "C#", category: "language" },
  { name: "Selenium", category: "testing" },
  { name: "Cypress", category: "testing" },
  { name: "pytest", category: "testing" },
  { name: "NUnit", category: "testing" },
  { name: "PostgreSQL", category: "database" },
  { name: "Docker", category: "infrastructure" },
  { name: "GitHub Actions", category: "ci-cd" },
  { name: "Azure DevOps", category: "ci-cd" },
  { name: "AWS", category: "cloud" },
  { name: "n8n", category: "workflow" },
  { name: "Node.js", category: "runtime" },
  { name: "Ollama", category: "ai" },
  { name: "Pandas", category: "data" },
  { name: "Pydantic", category: "data" },
  { name: "SQLAlchemy", category: "database" },
  { name: "Prometheus", category: "observability" },
];
