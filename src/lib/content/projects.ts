export interface PipelineStep {
  label: string;
  description?: string;
}

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  problem: string;
  status: "active" | "experimental" | "in-development" | "archived";
  technologies: string[];
  repoUrl?: string;
  workflow: string[];
  features: string[];
  limitations: string[];
  improvements: string[];
  relatedCapabilities: string[];
  architecture?: string;
  pipelineDiagram?: PipelineStep[];
  codeSnippets?: CodeSnippet[];
  quickStart?: string[];
}

export const projects: Project[] = [
  {
    slug: "swarm-qa-framework",
    title: "Swarm QA Framework",
    summary:
      "A local-first multi-agent QA framework that explores applications, designs testing strategies, generates automation assets, executes Playwright suites, analyses failures, and supports controlled self-healing.",
    description:
      "The Swarm QA Framework is an experimental multi-agent system that uses local LLMs to automate QA workflows. It explores target applications, architects test strategies, generates Page Objects, creates test suites, executes them via Playwright, analyses failures, and proposes repairs — all with human review gates.",
    problem:
      "QA teams spend significant time on repetitive test creation and maintenance. This framework explores whether local-first AI agents can assist with exploration, strategy, test generation, failure analysis, and controlled self-healing while keeping humans in the loop.",
    status: "experimental",
    technologies: [
      "Playwright",
      "TypeScript",
      "Node.js",
      "Ollama",
      "MCP",
      "Express",
      "Faker",
      "Axe",
    ],
    repoUrl: "https://github.com/ErvinAB/aiFramework",
    workflow: [
      "Target URL → Explorer Agent analyses application structure",
      "Architect Agent designs testing strategy",
      "Auditor Agent reviews for coverage gaps",
      "Data Forger generates test fixtures",
      "POM Generator creates Page Objects",
      "Suite Creator builds smoke, API, regression, accessibility, and visual suites",
      "Playwright Validation executes suites and collects results",
      "Failure Analyzer classifies failures by type",
      "Healer proposes targeted repairs",
      "Registry updates run history and knowledge graph",
    ],
    features: [
      "Local Ollama models for privacy",
      "Per-target isolation",
      "Generated Page Objects and fixtures",
      "Run history and failure classification",
      "MCP knowledge graph integration",
      "Real-time dashboard",
      "Human approval before applying repairs",
      "Suite types: Smoke, API, Regression, Accessibility, Visual",
    ],
    limitations: [
      "Generated assertions may need review",
      "Test quality depends on application context",
      "API tests require documentation or known endpoints",
      "Self-healing changes should be reviewed before applying",
      "Generated coverage does not replace engineering judgement",
    ],
    improvements: [
      "Expand supported suite types",
      "Improve assertion accuracy",
      "Add visual regression comparison",
      "Enhance knowledge graph context",
      "Add CI/CD integration templates",
    ],
    relatedCapabilities: [
      "qa-automation",
      "agentic-quality",
    ],
    architecture:
      "The framework uses a modular agent architecture. Each agent (Explorer, Architect, Auditor, Data Forger, POM Generator, Suite Creator, Failure Analyzer, Healer) operates independently and communicates via a shared registry. The registry stores application models, generated assets, run history, and the knowledge graph. All agents run locally using Ollama-hosted models.",
    pipelineDiagram: [
      { label: "Explorer", description: "analyses application structure" },
      { label: "Architect", description: "designs testing strategy" },
      { label: "Auditor", description: "reviews coverage gaps" },
      { label: "Data Forger", description: "generates test fixtures" },
      { label: "POM Generator", description: "creates Page Objects" },
      { label: "Suite Creator", description: "builds test suites" },
      { label: "Playwright", description: "executes validation" },
      { label: "Analyzer", description: "classifies failures" },
      { label: "Healer", description: "proposes repairs" },
      { label: "Registry", description: "updates history and graph" },
    ],
    codeSnippets: [
      {
        title: "Agent loop entry point",
        language: "TypeScript",
        code: `const registry = new Registry();
const explorer = new ExplorerAgent({ model: 'ollama' });
const architect = new ArchitectAgent({ model: 'ollama' });

await registry.initialize(targetUrl);
const appModel = await explorer.explore(targetUrl);
const strategy = await architect.designStrategy(appModel);

const suites = await Promise.all(
  strategy.suites.map(s => suiteCreator.build(s, appModel))
);

const results = await playwrightValidator.execute(suites);
const failures = await failureAnalyzer.classify(results);

if (failures.length > 0) {
  const repairs = await healer.propose(failures);
  await registry.storeRepairs(repairs);
}`,
      },
      {
        title: "Generated Page Object example",
        language: "TypeScript",
        code: `// Generated by POM Generator agent
export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}`,
      },
    ],
    quickStart: [
      "git clone https://github.com/ErvinAB/aiFramework.git",
      "cd aiFramework && npm install",
      "Ensure Ollama is running locally with a compatible model",
      "cp .env.example .env and configure your model settings",
      "npm run dev to start the agent API server",
      'POST /api/explore with {"target": "http://your-app-url"}',
    ],
  },
  {
    slug: "data-reliability-suite",
    title: "Data Reliability & AI QA Suite",
    summary:
      "A Python-based data-quality and observability framework for validating schemas, business rules, warehouse integrity, anomalies, drift, and lineage.",
    description:
      "The Data Reliability Suite automates data validation across ingestion, transformation, and warehouse layers. It uses declarative YAML contracts to enforce schemas, business rules, and referential integrity, and generates Prometheus-compatible metrics for observability.",
    problem:
      "Data pipelines often lack automated quality checks. Schema changes, data drift, and business rule violations go undetected until they impact downstream consumers. This framework provides a structured approach to data validation with alerting and lineage tracking.",
    status: "experimental",
    technologies: [
      "Python",
      "pytest",
      "Pandas",
      "Pydantic",
      "PostgreSQL",
      "SQLAlchemy",
      "Docker",
      "GitHub Actions",
      "Prometheus",
    ],
    repoUrl: "https://github.com/ErvinAB/dataQA",
    workflow: [
      "Raw Data → Ingestion layer",
      "Volume Anomaly Detection (z-score)",
      "Schema Validation against data contracts",
      "Data Contract Validation (types, formats, nulls, uniqueness)",
      "Business-Rule Validation (cross-field, referential integrity)",
      "Invalid-Record Quarantine",
      "Transformation",
      "PostgreSQL Warehouse Load",
      "Warehouse Integrity Checks",
      "Lineage and Metrics Export",
    ],
    features: [
      "Declarative YAML data contracts",
      "Schema enforcement with type validation",
      "Regex and format validation",
      "Cross-field business rules",
      "Referential integrity checks",
      "Invalid-row quarantine with metadata",
      "Z-score volume anomaly detection",
      "Statistical drift detection",
      "Prometheus-compatible metrics",
      "Data lineage tracking",
      "Docker containerisation",
      "GitHub Actions CI/CD",
    ],
    limitations: [
      "Designed for PostgreSQL warehouse targets",
      "Anomaly detection uses basic statistical methods",
      "Lineage is file-based, not integrated with data catalog tools",
    ],
    improvements: [
      "Support additional warehouse targets",
      "Add ML-based anomaly detection",
      "Integrate with data catalog tools",
      "Add dashboard visualisation",
      "Expand contract library",
    ],
    relatedCapabilities: [
      "data-quality",
      "qa-automation",
    ],
    architecture:
      "The framework processes data through sequential validation stages. Each stage is independent and can be enabled or disabled via configuration. Failed records are quarantined with metadata for investigation. Metrics are exposed via a Prometheus endpoint for integration with monitoring systems.",
    pipelineDiagram: [
      { label: "Ingestion", description: "raw data input" },
      { label: "Volume Check", description: "z-score anomaly detection" },
      { label: "Schema Validation", description: "contract enforcement" },
      { label: "Rule Validation", description: "business logic checks" },
      { label: "Quarantine", description: "invalid record isolation" },
      { label: "Transform", description: "data transformation" },
      { label: "Warehouse", description: "PostgreSQL load" },
      { label: "Integrity", description: "warehouse verification" },
      { label: "Metrics", description: "Prometheus + lineage export" },
    ],
    codeSnippets: [
      {
        title: "Data contract YAML",
        language: "YAML",
        code: `# contracts/customers.yaml
name: customer_contract
version: 1.0
columns:
  - name: customer_id
    type: uuid
    nullable: false
    unique: true
  - name: email
    type: string
    format: email
    nullable: false
  - name: age
    type: integer
    nullable: true
    rules:
      - min: 18
      - max: 120
  - name: signup_date
    type: datetime
    nullable: false
    rules:
      - not_future: true`,
      },
      {
        title: "Validation pipeline execution",
        language: "Python",
        code: `from dataqa.contracts import load_contract
from dataqa.validators import (
    SchemaValidator,
    BusinessRuleValidator,
    IntegrityValidator,
)

contract = load_contract("contracts/customers.yaml")
df = pd.read_parquet("data/raw/customers.parquet")

schema_validator = SchemaValidator(contract)
schema_errors = schema_validator.validate(df)

rule_validator = BusinessRuleValidator(contract)
rule_errors = rule_validator.validate(df)

integrity = IntegrityValidator(db_connection)
referential_errors = integrity.check_referential(
    table="customers", foreign_keys=["region_id"]
)

all_errors = schema_errors + rule_errors + referential_errors
quarantine = InvalidRecordQuarantine()
quarantine.store(df.iloc[all_errors.index], errors=all_errors)`,
      },
    ],
    quickStart: [
      "git clone https://github.com/ErvinAB/dataQA.git",
      "cd dataQA && python -m venv venv && source venv/bin/activate",
      "pip install -r requirements.txt",
      "cp .env.example .env and configure database connection",
      'python run_pipeline.py --source "data/sample.parquet"',
      "docker compose up to start Prometheus metrics endpoint",
    ],
  },
  {
    slug: "job-application-automation",
    title: "Evidence-Based Job Application Automation",
    summary:
      "An automation workflow that analyses job descriptions, calculates candidate fit, selects verified career evidence, and generates role-specific CVs without inventing qualifications.",
    description:
      "This workflow automates the job application process by analysing job descriptions, matching requirements against a verified career profile, scoring fit, and generating tailored CVs. It uses human approval at key decision points and generates DOCX and PDF output.",
    problem:
      "Job applications require tailoring CVs to specific roles, which is time-consuming and error-prone. Generic CVs miss relevant experience. This workflow automates evidence-based tailoring without fabricating qualifications.",
    status: "in-development",
    technologies: [
      "n8n",
      "Local LLMs",
      "Google Sheets",
      "Python",
      "JSON/YAML",
      "DOCX generation",
      "PDF generation",
    ],
    workflow: [
      "Job Description → Requirement Extraction",
      "Skill Classification and Categorisation",
      "Evidence Matching against verified profile",
      "Match Score Calculation",
      "Gap Analysis",
      "CV Template Selection",
      "Tailored CV Content Generation",
      "Accuracy Validation (no invented skills)",
      "Human Approval Gate",
      "DOCX and PDF Generation",
      "Application Tracker Update",
    ],
    features: [
      "Verified career profile with evidence weighting",
      "No invented skills or qualifications",
      "Human approval at each application",
      "Multiple CV templates",
      "Match reporting with gap analysis",
      "Local-first privacy for LLM processing",
      "Google Sheets job tracking",
      "DOCX and PDF file generation",
    ],
    limitations: [
      "Requires maintained career profile data",
      "Tailoring quality depends on profile completeness",
      "Approval gate introduces manual step per application",
    ],
    improvements: [
      "Add company research enrichment",
      "Add cover letter generation",
      "Support more file formats",
      "Add interview scheduling integration",
    ],
    relatedCapabilities: [
      "workflow-automation",
      "custom-automation",
    ],
    pipelineDiagram: [
      { label: "JD Input", description: "job description source" },
      { label: "Extract", description: "requirement extraction" },
      { label: "Classify", description: "skill categorisation" },
      { label: "Match", description: "evidence scoring" },
      { label: "Analyse", description: "gap analysis" },
      { label: "Generate", description: "CV content creation" },
      { label: "Validate", description: "accuracy verification" },
      { label: "Approve", description: "human approval gate" },
      { label: "Export", description: "DOCX + PDF output" },
      { label: "Track", description: "application tracker update" },
    ],
    codeSnippets: [
      {
        title: "n8n workflow webhook trigger",
        language: "JSON",
        code: `{
  "name": "Job Application Pipeline",
  "nodes": [
    {
      "type": "n8n-nodes-base.webhook",
      "position": [0, 300],
      "parameters": {
        "path": "job-application",
        "options": {}
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "position": [300, 300],
      "parameters": {
        "url": "={{ $json.jobDescriptionUrl }}",
        "options": {}
      }
    }
  ],
  "connections": {
    "Webhook": { "main": [[ { "node": "HTTP Request" } ]] }
  }
}`,
      },
      {
        title: "Evidence matcher",
        language: "Python",
        "code": `def match_evidence(requirements: list[str], profile: CareerProfile) -> MatchResult:
    scored: list[EvidenceMatch] = []
    for req in requirements:
        best_score = 0.0
        best_evidence = None
        for entry in profile.entries:
            similarity = calculate_similarity(req, entry.description)
            if similarity > best_score:
                best_score = similarity
                best_evidence = entry
        scored.append(EvidenceMatch(
            requirement=req,
            evidence=best_evidence,
            score=best_score,
        ))
    overall = sum(m.score for m in scored) / len(scored)
    return MatchResult(matches=scored, overall_score=overall)`,
      },
    ],
    quickStart: [
      "Import the workflow JSON into n8n",
      "Configure webhook trigger URL",
      "Set up Google Sheets connection for job tracking",
      "Configure local LLM endpoint in n8n nodes",
      "Create career profile YAML with verified experience",
      "Trigger via webhook with a job description URL",
    ],
  },
  {
    slug: "locator-agent",
    title: "Locator Agent",
    summary:
      "An AI agent that analyses failing Playwright locators, retrieves similar passing locators from a vector database, generates GPT-proposed replacements, and presents ranked suggestions for human approval.",
    description:
      "Locator Agent is a self-healing system for Playwright tests. When a locator fails, the agent retrieves context from a vector database of known-good locators, queries a local GPT model for replacement proposals, scores each proposal by historical reliability, and presents ranked options to the engineer for approval.",
    problem:
      "Fragile locators are the leading cause of flaky UI tests. Engineers waste hours debugging selector failures that could be resolved automatically using patterns from previously working locators and LLM reasoning.",
    status: "experimental",
    technologies: [
      "Playwright",
      "TypeScript",
      "Python",
      "OpenAI API",
      "ChromaDB",
      "FastAPI",
      "Docker",
    ],
    repoUrl: "https://github.com/ErvinAB/LocatorAgent",
    workflow: [
      "Failing test → locator extraction",
      "Vector similarity search in ChromaDB",
      "Passing locator patterns retrieved",
      "GPT proposal generation with context",
      "Scoring by historical reliability",
      "Ranked suggestions presented to engineer",
      "Human approval or rejection",
      "Approved locator added to vector DB",
      "Test re-execution with new locator",
    ],
    features: [
      "Vector database of known-good locators",
      "GPT-powered replacement proposals",
      "Historical reliability scoring",
      "Ranked suggestion interface",
      "Human approval before applying changes",
      "Automatic learning from approved replacements",
      "Works with existing Playwright suites",
      "FastAPI backend with Docker support",
    ],
    limitations: [
      "Requires initial seed of passing locators",
      "GPT proposals may need manual refinement",
      "Not suitable for structural DOM changes",
      "Vector DB requires periodic maintenance",
    ],
    improvements: [
      "Add multi-model support (Claude, Gemini)",
      "Add confidence thresholds for auto-apply",
      "Integrate with CI/CD pipelines",
      "Add visual regression comparison for selectors",
    ],
    relatedCapabilities: [
      "qa-automation",
      "agentic-quality",
    ],
    architecture:
      "Locator Agent uses a vector database (ChromaDB) to store embeddings of known-good Playwright locators along with metadata about their structure, page context, and reliability score. When a locator fails, the agent embeds the failing locator, retrieves the top-k similar passing locators, sends them as context to a GPT model, and scores the model's proposals against historical patterns. The ranked results are presented through a FastAPI interface.",
    pipelineDiagram: [
      { label: "Failure", description: "locator fails in Playwright run" },
      { label: "Embed", description: "vector embedding of failing locator" },
      { label: "Retrieve", description: "similar passing locators from DB" },
      { label: "Generate", description: "GPT proposes replacements" },
      { label: "Score", description: "rank by historical reliability" },
      { label: "Review", description: "human approval gate" },
      { label: "Learn", description: "approved locator stored in DB" },
      { label: "Re-run", description: "test re-execution" },
    ],
    codeSnippets: [
      {
        title: "Locator search and proposal flow",
        language: "Python",
        code: `from locator_agent.vector_db import LocatorVectorDB
from locator_agent.generator import LocatorProposalGenerator
from locator_agent.scorer import ProposalScorer

db = LocatorVectorDB(collection="playwright-locators")
generator = LocatorProposalGenerator(model="gpt-4")
scorer = ProposalScorer()

failing_locator = "button:has-text('Submit') >> nth=0"
page_context = {"url": "/checkout", "dom_snapshot": "..."}

similar = db.search(failing_locator, k=5)
proposals = generator.propose(
    failing=failing_locator,
    similar=similar,
    context=page_context,
)
ranked = scorer.rank(proposals, history=db.reliability_stats)

for i, proposal in enumerate(ranked, 1):
    print(f"{i}. [{proposal.score:.0%}] {proposal.locator}")`,
      },
      {
        title: "Vector DB schema",
        language: "Python",
        code: `class LocatorRecord(BaseModel):
    locator: str
    page_url: str
    element_type: str
    aria_role: str | None
    text_content: str | None
    reliability_score: float
    passing_runs: int
    total_runs: int
    embedding: list[float]

    @property
    def confidence(self) -> float:
        if self.total_runs == 0:
            return 0.0
        return self.passing_runs / self.total_runs

    def to_metadata(self) -> dict:
        return {
            "locator": self.locator,
            "url": self.page_url,
            "type": self.element_type,
            "confidence": self.confidence,
        }`,
      },
    ],
    quickStart: [
      "git clone https://github.com/ErvinAB/LocatorAgent.git",
      "cd LocatorAgent && docker compose up -d",
      "Configure OpenAI API key in .env",
      "POST /api/seed with known-good locators",
      "POST /api/heal with failing locator + context",
      "Review ranked proposals via /api/proposals",
    ],
  },
  {
    slug: "test-analyzer-agent",
    title: "Test Analyzer Agent",
    summary:
      "An NLP-driven agent that ingests test results, classifies failures by root cause, clusters related issues, generates human-readable summaries, and creates Jira tickets with diagnostic evidence.",
    description:
      "Test Analyzer Agent processes test output from Playwright and other frameworks, uses NLP to classify failures into categories (assertion, timeout, locator, infrastructure, environment), clusters related failures, generates concise root-cause summaries, and creates Jira tickets with traces, screenshots, and reproduction steps.",
    problem:
      "Test failure analysis is manual, slow, and inconsistent. Engineers spend hours triaging the same failure patterns across suites, environments, and CI runs. This agent automates classification, clustering, and documentation.",
    status: "experimental",
    technologies: [
      "Python",
      "Playwright",
      "OpenAI API",
      "Scikit-learn",
      "PostgreSQL",
      "FastAPI",
      "Jira API",
      "Docker",
    ],
    workflow: [
      "Test results ingestion (JSON/JUnit/raw)",
      "Failure extraction and normalisation",
      "NLP failure classification",
      "Similar-failure clustering",
      "Root-cause summarisation via LLM",
      "Diagnostic evidence collection",
      "Jira ticket generation with traces",
      "Trend analysis over time",
    ],
    features: [
      "Playwright and JUnit XML input",
      "NLP classification: assertion, timeout, locator, infra, env",
      "Dynamic clustering of related failures",
      "LLM-generated root-cause summaries",
      "Automatic Jira ticket creation",
      "Trend tracking across CI runs",
      "Failure rate dashboards",
      "Docker containerised deployment",
    ],
    limitations: [
      "Classification accuracy depends on failure message quality",
      "LLM summaries need human review for critical issues",
      "Jira integration requires API credentials",
      "Trend analysis requires persistent storage",
    ],
    improvements: [
      "Add Slack/Teams notifications",
      "Add failure prediction based on trends",
      "Support additional test frameworks",
      "Add automated rollback suggestions",
    ],
    relatedCapabilities: [
      "qa-automation",
      "agentic-quality",
    ],
    architecture:
      "The agent ingests test results through a FastAPI endpoint, normalises them into a common schema, classifies each failure using a fine-tuned NLP model, and clusters related failures using DBSCAN. An LLM generates root-cause summaries per cluster. The agent then creates Jira tickets with attached logs, screenshots, and reproduction commands. All results are stored in PostgreSQL for trend analysis.",
    pipelineDiagram: [
      { label: "Ingest", description: "test results from CI or upload" },
      { label: "Extract", description: "failure normalisation" },
      { label: "Classify", description: "NLP failure categorisation" },
      { label: "Cluster", description: "DBSCAN grouping by similarity" },
      { label: "Summarise", description: "LLM root-cause per cluster" },
      { label: "Evidence", description: "logs, traces, screenshots" },
      { label: "Ticket", description: "Jira issue with diagnostics" },
      { label: "Trend", description: "historical analysis" },
    ],
    codeSnippets: [
      {
        title: "Failure classifier",
        language: "Python",
        code: `from test_analyzer.classifier import FailureClassifier
from test_analyzer.cluster import FailureClusterer
from test_analyzer.summariser import RootCauseSummariser

classifier = FailureClassifier()
clusterer = FailureClusterer(eps=0.3, min_samples=2)
summariser = RootCauseSummariser(model="gpt-4")

results = ingest_test_run("playwright-report.json")

failures = [r for r in results if not r.passed]
for f in failures:
    f.category = classifier.classify(f.error_message)

clusters = clusterer.cluster(failures)
for cluster_id, group in clusters.items():
    summary = summariser.summarise(group)
    jira_issue = create_jira_ticket(
        summary=summary,
        failures=group,
        project="QA",
    )
    print(f"Cluster {cluster_id}: {jira_issue.key}")`,
      },
      {
        title: "Classification categories",
        language: "Python",
        code: `class FailureCategory(str, Enum):
    ASSERTION = "assertion"
    TIMEOUT = "timeout"
    LOCATOR = "locator"
    INFRASTRUCTURE = "infrastructure"
    ENVIRONMENT = "environment"
    UNKNOWN = "unknown"

CLASSIFICATION_PROMPT = """
Classify this test failure into one of:
- assertion: value mismatch, unexpected state
- timeout: wait expired, element not found
- locator: selector unable to find element
- infrastructure: network, disk, container
- environment: config, data, dependency

Failure message: {error_message}
Page URL: {page_url}
Action: {action}

Respond with only the category name.
"""`,
      },
    ],
    quickStart: [
      "git clone https://github.com/ErvinAB/TestAnalyzer.git",
      "cd TestAnalyzer && docker compose up -d",
      "POST /api/ingest with Playwright JSON report",
      "GET /api/analysis to view classified failures",
      "Configure Jira credentials in Settings",
      "POST /api/triage to generate Jira tickets",
    ],
  },
  {
    slug: "k6-performance-pipeline",
    title: "k6 Performance Pipeline",
    summary:
      "A CI-integrated performance testing pipeline using k6, TypeScript, and Grafana that runs synthetic load tests, validates SLOs, and publishes dashboards on every deployment.",
    description:
      "The k6 Performance Pipeline automates performance testing as part of the CI/CD process. It uses k6 with TypeScript for scriptable load tests, runs them in Docker containers via GitHub Actions, validates SLO thresholds, and publishes results to Grafana dashboards. The pipeline supports smoke, load, stress, soak, and spike test types.",
    problem:
      "Performance testing is often an afterthought, done manually before releases. Teams discover regressions too late. This pipeline makes performance testing a first-class CI citizen with automated gates.",
    status: "experimental",
    technologies: [
      "k6",
      "TypeScript",
      "Docker",
      "GitHub Actions",
      "Grafana",
      "Prometheus",
      "PostgreSQL",
      "Python",
    ],
    repoUrl: "https://github.com/ErvinAB/PerfTest",
    workflow: [
      "Code push → GitHub Actions trigger",
      "Docker Compose: app + k6 + Grafana stack",
      "k6 smoke test (sanity check)",
      "k6 load test (target throughput)",
      "SLO validation against thresholds",
      "Grafana dashboard update",
      "Prometheus metrics export",
      "Pass/Fail gate in CI",
      "Performance report comment on PR",
    ],
    features: [
      "TypeScript k6 scripts with type safety",
      "Smoke, load, stress, soak, spike test types",
      "SLO validation with configurable thresholds",
      "Grafana dashboards per deployment",
      "Prometheus metrics for historical analysis",
      "GitHub Actions CI integration",
      "PR comment with performance summary",
      "Docker Compose local development",
    ],
    limitations: [
      "Requires Docker infrastructure",
      "k6 is single-threaded per instance",
      "Distributed load testing needs additional setup",
      "Grafana dashboards need manual configuration",
    ],
    improvements: [
      "Add distributed k6 for higher load",
      "Add browser-level performance metrics",
      "Integrate with Slack for threshold alerts",
      "Add performance budget tracking over time",
    ],
    relatedCapabilities: [
      "qa-automation",
      "custom-automation",
    ],
    architecture:
      "The pipeline runs entirely in Docker containers orchestrated by Docker Compose. A GitHub Actions workflow spins up the target application, k6 containers, and the monitoring stack (Prometheus + Grafana). k6 executes TypeScript test scripts, writes results to Prometheus, and validates SLOs programmatically. Grafana provides real-time dashboards. The pipeline reports pass/fail status back to the PR.",
    pipelineDiagram: [
      { label: "Commit", description: "GitHub push triggers pipeline" },
      { label: "Stack", description: "Docker Compose environment" },
      { label: "Smoke", description: "quick sanity check" },
      { label: "Load", description: "target throughput test" },
      { label: "Validate", description: "SLO threshold check" },
      { label: "Metrics", description: "Prometheus data export" },
      { label: "Dashboards", description: "Grafana visualisation" },
      { label: "Report", description: "PR performance comment" },
    ],
    codeSnippets: [
      {
        title: "k6 load test script",
        language: "TypeScript",
        code: `import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const responseTime = new Trend('response_time');

export const options = {
  stages: [
    { duration: '2m', target: 50 },
    { duration: '5m', target: 50 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    errors: ['rate<0.05'],
  },
};

export default function () {
  const res = http.get('http://app/health');
  const passed = check(res, {
    'status is 200': r => r.status === 200,
    'response < 300ms': r => r.timings.duration < 300,
  });
  errorRate.add(!passed);
  responseTime.add(res.timings.duration);
  sleep(1);
}`,
      },
      {
        title: "GitHub Actions workflow",
        "language": "YAML",
        code: `name: Performance Tests
on: [deployment_status]
jobs:
  perf:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker compose up -d
      - name: Run k6 smoke
        run: |
          docker compose run k6 run \\
            --out prometheus \\
            scripts/smoke.ts
      - name: Run k6 load
        run: |
          docker compose run k6 run \\
            --out prometheus \\
            scripts/load.ts
      - name: Validate SLOs
        run: python scripts/validate_slos.py
      - name: Publish dashboards
        uses: grafana/grafana-composite-action@v1
      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            const report = require('./report.json')
            await github.rest.issues.createComment({
              ...context.repo,
              issue_number: context.issue.number,
              body: generatePerfComment(report),
            })`,
      },
    ],
    quickStart: [
      "git clone https://github.com/ErvinAB/PerfTest.git",
      "cd PerfTest && docker compose up -d",
      "npm install -g k6",
      "k6 run scripts/smoke.ts",
      "k6 run scripts/load.ts --out prometheus",
      "Open Grafana at http://localhost:3001",
    ],
  },
  {
    slug: "predictive-testing-agent",
    title: "Predictive Testing Agent",
    summary:
      "A machine-learning agent that analyses code changes, historical test results, and coverage data to predict which tests are most likely to fail and recommends a targeted regression suite.",
    description:
      "The Predictive Testing Agent uses machine learning to optimise test selection. It ingests code change metadata, historical test outcomes, and coverage information to compute a risk score for each test. The agent recommends a minimal regression suite that catches likely failures while reducing execution time compared to full suite runs.",
    problem:
      "Full regression suites are slow and expensive. Engineers either run everything (wasting time) or guess which tests matter (risking escapes). This agent predicts which tests are most relevant to a given change, making regression testing faster and more targeted.",
    status: "experimental",
    technologies: [
      "Python",
      "Scikit-learn",
      "Playwright",
      "PostgreSQL",
      "Pandas",
      "FastAPI",
      "Docker",
      "GitHub Actions",
    ],
    repoUrl: "https://github.com/ErvinAB/PredictAgent",
    workflow: [
      "Code change detected (PR/push)",
      "Change metadata extraction",
      "Feature vector computation per test",
      "ML model predicts failure probability",
      "Risk-ranked test list generated",
      "Confidence threshold filtering",
      "Targeted regression suite assembled",
      "Suite execution in CI",
      "Results fed back into training data",
    ],
    features: [
      "Random Forest classifier for test prediction",
      "Features: file paths, author, commit message, test history, coverage",
      "Configurable risk threshold",
      "Execution time budget optimisation",
      "Continuous learning from new results",
      "FastAPI prediction endpoint",
      "GitHub Actions integration",
      "Performance comparison vs full suite",
    ],
    limitations: [
      "Requires historical test data for training",
      "Feature engineering needs ongoing refinement",
      "Model retraining required as codebase evolves",
      "Cold start problem with new tests",
    ],
    improvements: [
      "Add deep learning model for sequence-aware prediction",
      "Add change impact analysis from AST diffs",
      "Support multi-branch prediction models",
      "Add flaky test detection integration",
    ],
    relatedCapabilities: [
      "qa-automation",
      "agentic-quality",
    ],
    architecture:
      "The agent extracts features from each code change (files modified, author history, commit message tokens) and computes similarity to historical changes using TF-IDF on file paths and commit messages. A Random Forest classifier, trained on historical test outcomes, predicts failure probability for each test. Tests above a configurable threshold are selected for the regression suite. Results from each run are fed back into the training set for continuous improvement.",
    pipelineDiagram: [
      { label: "Change", description: "PR or push event" },
      { label: "Extract", description: "code change features" },
      { label: "Predict", description: "ML failure probability" },
      { label: "Rank", description: "tests sorted by risk score" },
      { label: "Filter", description: "confidence threshold applied" },
      { label: "Suite", description: "targeted regression assembly" },
      { label: "Execute", description: "CI test run" },
      { label: "Learn", description: "results → training data" },
    ],
    codeSnippets: [
      {
        title: "Prediction model",
        language: "Python",
        code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
import joblib

class TestFailurePredictor:
    def __init__(self):
        self.pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(max_features=1000)),
            ('clf', RandomForestClassifier(
                n_estimators=100,
                class_weight='balanced',
            )),
        ])

    def train(self, historical_data: pd.DataFrame):
        X = historical_data['features']
        y = historical_data['failed']
        self.pipeline.fit(X, y)

    def predict(self, change_features: list[str]) -> list[float]:
        probabilities = self.pipeline.predict_proba(
            change_features
        )
        return [p[1] for p in probabilities]

    def select_tests(
        self,
        tests: list[Test],
        threshold: float = 0.3,
        time_budget: int = 600,
    ) -> list[Test]:
        features = [t.feature_vector for t in tests]
        scores = self.predict(features)
        ranked = sorted(
            zip(tests, scores),
            key=lambda x: -x[1],
        )
        selected = []
        total_time = 0
        for test, score in ranked:
            if score < threshold:
                break
            if total_time + test.est_duration > time_budget:
                break
            selected.append(test)
            total_time += test.est_duration
        return selected`,
      },
      {
        title: "Feature extraction from PR",
        language: "Python",
        code: `from predictive_agent.features import FeatureExtractor

extractor = FeatureExtractor()

pr_data = {
    "files": [
        "src/api/checkout.py",
        "tests/test_checkout.py",
    ],
    "author": "ervin",
    "commit_message": "fix: handle empty cart",
    "changed_lines": {"src/api/checkout.py": [45, 67]},
}

feature_vector = extractor.extract(pr_data)

# Feature components:
# - File path TF-IDF tokens
# - Author one-hot encoding
# - Commit message tokens
# - Coverage mapping (which tests touch changed files)
# - Historical failure rate per test

print(f"Feature dimensions: {feature_vector.shape}")
# Output: Feature dimensions: (1, 1000)

# Prediction per test
predictor = TestFailurePredictor.load("models/v1.pkl")
tests = get_all_tests()

scores = predictor.predict([
    feature_vector for _ in tests
])

for test, score in sorted(
    zip(tests, scores),
    key=lambda x: -x[1],
)[:5]:
    print(f"{test.name}: {score:.1%} failure risk")`,
      },
    ],
    quickStart: [
      "git clone https://github.com/ErvinAB/PredictAgent.git",
      "cd PredictAgent && docker compose up -d",
      "POST /api/train with historical test data (CSV)",
      "POST /api/predict with PR metadata",
      "GET /api/suite to retrieve recommended test list",
      "Integrate with CI via GitHub Actions webhook",
    ],
  },
];
