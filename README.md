# Stagbyte

Automation engineering — test automation, agentic systems, workflow orchestration, data pipelines, and custom automation.

## Tech stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- React 19
- @xyflow/react (React Flow v12)
- Lucide icons
- Netlify (deployment, forms)

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Structure

```
src/
├── app/                  # Pages and routes
│   ├── about/
│   ├── capabilities/
│   ├── contact/
│   ├── insights/
│   │   └── [slug]/
│   ├── playground/       # Visual workflow builder (generic)
│   │   ├── data-reliability/  # Data Reliability Suite pipeline
│   │   └── swarm-qa/          # Swarm QA Framework pipeline
│   ├── projects/
│   │   └── [slug]/
│   └── workflows/
├── components/           # Reusable components
│   ├── WorkflowBuilder.tsx     # Drag-and-drop flow builder
│   ├── HeroTerminal.tsx        # Typing terminal animation
│   ├── PipelineInteractive.tsx  # Clickable 4-stage pipeline
│   ├── ServiceWizard.tsx       # 3-step capability recommender
│   ├── FAQ.tsx                 # Accordion component
│   ├── SectionNav.tsx          # Floating section navigation
│   ├── AnimateInView.tsx       # Scroll-triggered entrance
│   └── ...
├── lib/
│   ├── content/          # Content collections (projects, capabilities, etc.)
│   └── metadata.ts       # SEO metadata
public/                   # Static assets
```

## Playground

Three visual workflow builders at `/playground`:

- **Generic** — 14 node types across triggers, actions, logic, and outputs. Prototype any automation flow.
- **Data Reliability** — 12 nodes: ingest, volume check (z-score), schema validation, data contract check, business-rule validation, quarantine, transform, PostgreSQL load, warehouse integrity, metrics export, lineage report. Pre-wired pipeline.
- **Swarm QA** — 12 nodes: target URL, explorer agent, architect agent, auditor, data forger, POM generator, suite creator, Playwright execution, failure analyzer, healer, registry update, QA report. Pre-wired with parallel branches.

All builders support: drag-and-drop node placement, connect by dragging handles, select + delete/backspace to remove, export as JSON (copied to clipboard).

## Contact

- [LinkedIn (personal)](https://www.linkedin.com/in/ervin-abedin/)
- [LinkedIn (Stagbyte)](https://www.linkedin.com/company/stagbyte/)
- Email: e.abedin@arvionix.com
- [GitHub](https://github.com/ErvinAB)
