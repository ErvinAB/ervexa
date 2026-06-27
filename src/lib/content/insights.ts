export interface Insight {
  slug: string;
  title: string;
  summary: string;
  status: "published" | "draft" | "planned";
  topics: string[];
}

export const insights: Insight[] = [
  {
    slug: "designing-maintainable-playwright-framework",
    title: "Designing a Maintainable Playwright Framework",
    summary:
      "Structure, conventions, and patterns for building a Playwright automation framework that scales across teams and products.",
    status: "draft",
    topics: ["playwright", "qa-automation", "typescript"],
  },
  {
    slug: "agent-loops-for-test-automation",
    title: "Agent Loops for Test Automation",
    summary:
      "How multi-agent loops can assist with test generation, execution, failure analysis, and self-healing — and where they still need human oversight.",
    status: "draft",
    topics: ["agentic-qa", "ai-testing", "automation"],
  },
  {
    slug: "why-self-healing-tests-often-fail",
    title: "Why Self-Healing Tests Often Fail",
    summary:
      "A technical look at the challenges of self-healing test automation and why human approval remains essential.",
    status: "draft",
    topics: ["agentic-qa", "test-automation", "reliability"],
  },
  {
    slug: "building-data-quality-framework-python",
    title: "Building a Data Quality Framework With Python",
    summary:
      "Using pytest, Pandas, Pydantic, and PostgreSQL to build automated data validation that runs in CI/CD.",
    status: "draft",
    topics: ["data-quality", "python", "automation"],
  },
  {
    slug: "api-and-database-validation-strategies",
    title: "API and Database Validation Strategies",
    summary:
      "Techniques for validating API contracts, response data, database state, and the interactions between them.",
    status: "planned",
    topics: ["api-testing", "database-testing", "qa-automation"],
  },
];
