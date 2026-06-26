import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateInView from "@/components/AnimateInView";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Automation Workflows",
  description:
    "Stagbyte designs automation workflows using the right level of engineering — from no-code and low-code to custom automation services.",
};

const reliabilityPrinciples = [
  "Input validation",
  "Output validation",
  "Retry handling",
  "Timeout handling",
  "Idempotency",
  "Audit trails",
  "Logging",
  "Monitoring",
  "Human approval for sensitive actions",
  "Secure secret management",
  "Failure notifications",
  "Maintainability",
  "Version control where supported",
  "Test coverage",
  "Documentation",
];

const qaWorkflows = [
  {
    title: "Requirement Analysis",
    description: "Requirement document → test scenarios → test plan",
  },
  {
    title: "Change Risk Assessment",
    description: "Pull request → change analysis → risk score → targeted regression tests",
  },
  {
    title: "API Test Generation",
    description: "API specification → generated test cases → CI execution → report",
  },
  {
    title: "Failure Analysis",
    description: "Failed test → logs and traces collected → failure classification → Jira issue",
  },
  {
    title: "Release Validation",
    description: "Release deployment → smoke tests → API checks → database checks → Slack notification",
  },
  {
    title: "AI Test Summary",
    description: "Test results → AI-assisted summary → human review → stakeholder report",
  },
  {
    title: "Incident Response",
    description: "Production incident → evidence collection → root-cause summary → escalation",
  },
];

const businessWorkflows = [
  {
    title: "Lead Processing",
    description: "Customer form → validation → enrichment → CRM update → notification",
  },
  {
    title: "Invoice Processing",
    description: "Invoice → data extraction → validation → approval → archive",
  },
  {
    title: "Document Processing",
    description: "Document upload → classification → review → storage",
  },
  {
    title: "Lead Qualification",
    description: "Lead → qualification → assignment → follow-up",
  },
  {
    title: "Report Generation",
    description: "Scheduled query → report generation → spreadsheet update → email",
  },
  {
    title: "CV Tailoring",
    description: "Job description → match score → tailored CV → human approval",
  },
  {
    title: "Meeting Actions",
    description: "Meeting notes → action items → task creation → reminders",
  },
];

const dataWorkflows = [
  {
    title: "Data Import Validation",
    description: "Data import → schema validation → quality checks → quarantine → report",
  },
  {
    title: "ETL Reconciliation",
    description: "API data → transformation → database load → reconciliation",
  },
  {
    title: "Anomaly Detection",
    description: "Dataset → anomaly detection → alert → investigation workflow",
  },
  {
    title: "Schema Change Validation",
    description: "Database change → validation → dashboard update → notification",
  },
];

export default function WorkflowsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <PageHeader
        eyebrow="Workflows"
        title="Automation that works reliably"
        description="Stagbyte does not only connect applications. It quality-engineers workflows — with validation, testing, error handling, monitoring, and human approval built in."
      />

      {/* Implementation spectrum */}
      <AnimateInView>
        <section className="border-b border-zinc-800/30 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-6 bg-cyan-500/50" />
              <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Implementation spectrum</h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-xl">
              The right level of engineering depends on complexity, data sensitivity,
              volume, security, reliability requirements, and maintainability needs.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                { level: "Level 1", title: "No-Code", desc: "Simple tool-to-tool integrations, form submissions, email notifications, and basic approval steps.", tools: "Zapier, Make, Google Sheets, Forms" },
                { level: "Level 2", title: "Low-Code", desc: "Conditional logic, API calls, data transformation, LLM integration, and human approval workflows.", tools: "n8n, Power Automate, Webhooks" },
                { level: "Level 3", title: "Hybrid", desc: "Visual orchestration with custom code for validation, transformation, and complex business logic.", tools: "n8n + Python/TypeScript" },
                { level: "Level 4", title: "Custom Engineering", desc: "Event-driven services, queue processing, high-volume data handling, and secure internal integrations.", tools: "Python, TypeScript, Docker, CI/CD" },
              ].map((item, i) => (
                <AnimateInView key={item.title} delay={i * 0.08}>
                  <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-5 transition-all hover:border-zinc-700/50 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-zinc-900/20">
                    <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">{item.level}</p>
                    <h3 className="mt-1 text-sm font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors">{item.title}</h3>
                    <p className="mt-2 text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                    <p className="mt-3 text-[10px] text-zinc-600 font-mono">{item.tools}</p>
                  </div>
                </AnimateInView>
              ))}
            </div>

            <p className="mt-6 text-xs text-zinc-500 italic leading-relaxed max-w-xl border-l-2 border-zinc-800 pl-4">
              An n8n workflow may orchestrate the process, Python may validate and transform
              data, a local LLM may analyse content, Playwright may automate browser actions,
              and a human approval step may control the final output.
            </p>
          </div>
        </section>
      </AnimateInView>

      {/* Comparison table */}
      <AnimateInView>
        <section className="border-b border-zinc-800/30 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-6 bg-cyan-500/50" />
              <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">How to choose</h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-xl">
              Each approach suits different requirements. Here is how they compare across
              the criteria that matter.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="py-3 pr-4 text-left text-zinc-600 font-medium tracking-wider uppercase text-[10px]">Criteria</th>
                    <th className="py-3 px-4 text-left text-zinc-400 font-medium">No-Code</th>
                    <th className="py-3 px-4 text-left text-zinc-400 font-medium">Low-Code</th>
                    <th className="py-3 px-4 text-left text-zinc-400 font-medium">Hybrid</th>
                    <th className="py-3 pl-4 text-left text-zinc-400 font-medium">Custom</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { criterion: "Complexity", nc: "Low", lc: "Medium", hy: "Medium-High", cu: "High" },
                    { criterion: "Data sensitivity", nc: "Low", lc: "Medium", hy: "Medium-High", cu: "High" },
                    { criterion: "Volume", nc: "Low", lc: "Medium", hy: "Medium-High", cu: "High" },
                    { criterion: "Security", nc: "Low", lc: "Medium", hy: "Medium-High", cu: "High" },
                    { criterion: "Reliability", nc: "Low", lc: "Medium", hy: "Medium-High", cu: "High" },
                    { criterion: "Maintainability", nc: "High", lc: "High", hy: "Medium", cu: "Medium" },
                    { criterion: "Human approval", nc: "Basic", lc: "Built-in", hy: "Built-in", cu: "Custom" },
                    { criterion: "Custom logic", nc: "None", lc: "Limited", hy: "Python/TS", cu: "Full" },
                    { criterion: "Cost to build", nc: "Low", lc: "Low-Med", hy: "Medium", cu: "High" },
                    { criterion: "Cost to run", nc: "Per-task", lc: "Self-host", hy: "Self-host", cu: "Infra" },
                  ].map((row) => (
                    <tr key={row.criterion} className="border-b border-zinc-800/30">
                      <td className="py-2.5 pr-4 text-zinc-500 tracking-wider uppercase text-[10px]">{row.criterion}</td>
                      <td className="py-2.5 px-4 text-zinc-500">{row.nc}</td>
                      <td className="py-2.5 px-4 text-zinc-500">{row.lc}</td>
                      <td className="py-2.5 px-4 text-zinc-500">{row.hy}</td>
                      <td className="py-2.5 pl-4 text-zinc-500">{row.cu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[10px] text-zinc-500">
              These are general guidelines. The right approach depends on the specific
              problem, team capability, and operational constraints.
            </p>
          </div>
        </section>
      </AnimateInView>

      {/* QA Workflows */}
      <AnimateInView>
        <section className="border-b border-zinc-800/30 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-6 bg-cyan-500/50" />
              <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">QA and engineering workflows</h2>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {qaWorkflows.map((w, i) => (
                <AnimateInView key={w.title} delay={i * 0.04}>
                  <div className="group rounded border border-zinc-800/30 bg-zinc-900/10 px-4 py-3 transition-colors hover:border-zinc-700/40 hover:bg-zinc-900/20">
                    <p className="text-xs font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors">{w.title}</p>
                    <p className="mt-1 font-mono text-[10px] text-zinc-500">{w.description}</p>
                  </div>
                </AnimateInView>
              ))}
            </div>
          </div>
        </section>
      </AnimateInView>

      {/* Business Workflows */}
      <AnimateInView>
        <section className="border-b border-zinc-800/30 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-6 bg-cyan-500/50" />
              <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Business and operational workflows</h2>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {businessWorkflows.map((w, i) => (
                <AnimateInView key={w.title} delay={i * 0.04}>
                  <div className="group rounded border border-zinc-800/30 bg-zinc-900/10 px-4 py-3 transition-colors hover:border-zinc-700/40 hover:bg-zinc-900/20">
                    <p className="text-xs font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors">{w.title}</p>
                    <p className="mt-1 font-mono text-[10px] text-zinc-500">{w.description}</p>
                  </div>
                </AnimateInView>
              ))}
            </div>
          </div>
        </section>
      </AnimateInView>

      {/* Data Workflows */}
      <AnimateInView>
        <section className="border-b border-zinc-800/30 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-6 bg-cyan-500/50" />
              <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Data workflows</h2>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {dataWorkflows.map((w, i) => (
                <AnimateInView key={w.title} delay={i * 0.06}>
                  <div className="group rounded border border-zinc-800/30 bg-zinc-900/10 px-4 py-3 transition-colors hover:border-zinc-700/40 hover:bg-zinc-900/20">
                    <p className="text-xs font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors">{w.title}</p>
                    <p className="mt-1 font-mono text-[10px] text-zinc-500">{w.description}</p>
                  </div>
                </AnimateInView>
              ))}
            </div>
          </div>
        </section>
      </AnimateInView>

      {/* Reliability principles */}
      <AnimateInView>
        <section className="border-b border-zinc-800/30 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-6 bg-cyan-500/50" />
              <h2 className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Reliability principles</h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-xl">
              Every Stagbyte workflow is designed around these reliability principles.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {reliabilityPrinciples.map((principle) => (
                <div key={principle} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 shrink-0 text-zinc-700" />
                  <span className="text-xs text-zinc-400">{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimateInView>

      {/* CTA */}
      <AnimateInView>
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/10 p-10 md:p-12">
              <h2 className="text-lg font-bold text-zinc-100">
                Need a workflow designed?
              </h2>
              <p className="mt-2 text-sm text-zinc-400 max-w-xl">
                Describe the process you want to automate. Stagbyte will recommend the
                right implementation level and reliability approach.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs text-zinc-100 hover:bg-zinc-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/50"
                >
                  Start the conversation <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimateInView>

      <Footer />
    </div>
  );
}
