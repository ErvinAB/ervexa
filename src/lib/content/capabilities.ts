export interface Capability {
  id: string;
  title: string;
  summary: string;
  description: string;
  details: string[];
  technologies: string[];
  workflow?: string;
}

export const capabilities: Capability[] = [
  {
    id: "qa-automation",
    title: "QA Automation Engineering",
    summary:
      "Maintainable UI, API, backend, mobile, and regression automation designed around product risk, system behaviour, and release reliability.",
    description:
      "Stagbyte designs and builds test automation frameworks that focus on what matters: product risk, system behaviour, and release confidence. Frameworks are structured for maintainability, parallel execution, CI/CD integration, and clear reporting.",
    details: [
      "Playwright automation with Page Objects and component models",
      "Selenium and Cypress test suites",
      "C# and NUnit framework architecture",
      "SpecFlow and BDD implementation",
      "Python and pytest automation",
      "API contract validation and response testing",
      "Postman collection management",
      "Database verification and state testing",
      "Mobile testing with Appium and XCTest",
      "Performance testing with k6, JMeter, and Locust",
      "Test architecture design and code review",
      "CI/CD integration for automated execution",
      "Test reporting dashboards and trend analysis",
      "Flaky test identification and reduction strategies",
      "Release validation and smoke test suites",
    ],
    technologies: [
      "Playwright",
      "Selenium",
      "Cypress",
      "NUnit",
      "pytest",
      "Appium",
      "XCTest",
      "Postman",
      "SQL",
      "k6",
      "JMeter",
      "Locust",
      "GitHub Actions",
      "Azure DevOps",
    ],
  },
  {
    id: "agentic-quality",
    title: "Agentic Quality Engineering",
    summary:
      "Agent loops that explore applications, generate testing assets, analyse failures, support self-healing, and improve automation workflows.",
    description:
      "Stagbyte builds agentic QA systems that assist engineers with application exploration, test strategy, test data generation, Page Object creation, suite generation, failure classification, and controlled self-healing. AI agents augment engineers — they do not replace them.",
    details: [
      "Application exploration and structure analysis",
      "Requirement analysis from specifications",
      "Test strategy generation based on risk",
      "Test-data generation with realistic fixtures",
      "Page Object and component model generation",
      "Test-suite creation for multiple layers",
      "Failure classification and root-cause analysis",
      "Self-healing workflows with human approval",
      "Risk-based regression selection",
      "AI-assisted test maintenance",
      "Human review gates for generated assets",
      "Local-first LLM execution for privacy",
      "Knowledge graph integration for context retention",
    ],
    technologies: [
      "Playwright",
      "TypeScript",
      "Node.js",
      "Ollama",
      "MCP",
      "Python",
      "Express",
      "Faker",
      "Axe",
    ],
    workflow:
      "AI agents assist engineers. Generated tests require validation. Self-healing changes should not be applied blindly. Human approval remains important. AI is used where it creates measurable engineering value.",
  },
  {
    id: "workflow-automation",
    title: "Engineering Workflow Automation",
    summary:
      "Reliable automation workflows connecting requirements, tests, deployments, reports, incidents, business tools, APIs, and human approval.",
    description:
      "Stagbyte designs automation workflows using the right level of engineering for the problem — from visual workflow builders to custom Python, TypeScript, browser automation, and event-driven services.",
    details: [
      "n8n workflow orchestration and automation",
      "API orchestration and webhook integration",
      "Notification systems for Slack, email, and messaging",
      "Document processing and generation workflows",
      "Approval workflows with human-in-the-loop",
      "Reporting and dashboard automation",
      "GitHub Actions and CI/CD workflows",
      "Jira and Linear integration",
      "Google Sheets and Airtable data workflows",
      "Local and cloud LLM integration",
      "Custom Python and TypeScript processing services",
    ],
    technologies: [
      "n8n",
      "TypeScript",
      "Python",
      "Node.js",
      "REST APIs",
      "Webhooks",
      "GitHub Actions",
      "Azure DevOps",
      "Slack API",
      "Google Sheets API",
      "Jira API",
      "Linear API",
      "Docker",
    ],
  },
  {
    id: "data-quality",
    title: "Data Quality and Reliability",
    summary:
      "Automated validation for schemas, business rules, pipelines, warehouse integrity, anomalies, and data drift.",
    description:
      "Stagbyte builds data validation systems that check schemas, enforce data contracts, validate business rules, reconcile source-to-target data, detect anomalies, and track lineage. Quality checks run in CI/CD pipelines and alert on failures.",
    details: [
      "Schema validation against data contracts",
      "Data contract enforcement with type and format checks",
      "Null, uniqueness, and format validation",
      "Cross-field business rule validation",
      "Referential integrity across datasets",
      "Source-to-target reconciliation",
      "Failed-record quarantine with metadata",
      "Warehouse integrity verification",
      "Volume anomaly detection",
      "Statistical drift detection",
      "Data lineage tracking",
      "Data health metrics and alerting",
      "CI/CD integration for pipeline quality gates",
    ],
    technologies: [
      "Python",
      "Pandas",
      "Pydantic",
      "pytest",
      "PostgreSQL",
      "SQLAlchemy",
      "Docker",
      "GitHub Actions",
      "Prometheus",
    ],
  },
  {
    id: "custom-automation",
    title: "Custom Automation Engineering",
    summary:
      "Custom software services for complex automation requirements including event-driven processing, browser automation, and secure internal integrations.",
    description:
      "When visual workflow builders and low-code platforms are insufficient, Stagbyte builds custom automation services. These range from Python data processing services to TypeScript event-driven systems, each with proper testing, observability, and deployment.",
    details: [
      "Python automation services",
      "TypeScript automation services",
      "Complex business rule implementation",
      "High-volume data processing",
      "Custom user interfaces for workflow management",
      "Secure internal system integrations",
      "Event-driven architecture and queue processing",
      "Background workers and scheduled jobs",
      "Advanced testing and observability",
      "Version-controlled deployment with CI/CD",
      "Custom databases and APIs",
      "Browser automation for legacy systems",
      "Data validation engines",
    ],
    technologies: [
      "Python",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Redis",
      "Playwright",
      "Pandas",
    ],
  },
];

export const capabilityBySlug = (slug: string): Capability | undefined =>
  capabilities.find((c) => c.id === slug);
