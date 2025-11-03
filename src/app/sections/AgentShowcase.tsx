export default function AgentShowcase() {
  const cases = [
    {
      badge: "Operations",
      title: "Contract monitoring + instant escalation",
      problem:
        "The ops/compliance team had to manually review every new contract and forward it to the right people. Slow, easy to miss, zero traceability.",
      solution:
        "We built an automation that ingests every new contract, detects risky changes, deduplicates by contract ID, and posts an instant summary to Telegram. It also writes an audit log to Firestore.",
      result:
        "No more manual forwarding. Leadership sees critical changes the moment they happen — and there's a record.",
    },
    {
      badge: "Internal AI Agent",
      title: "Support / back-office assistant",
      problem:
        "Staff kept answering the same questions by digging through Notion, spreadsheets, and Slack history.",
      solution:
        "We deployed an internal AI assistant that reads those sources, drafts answers, and only escalates to a human when it's actually unusual.",
      result:
        "Faster replies, fewer interrupts, smoother onboarding of new hires.",
    },
    {
      badge: "Reliability",
      title: "Release safety without midnight firefighting",
      problem:
        "Every release risked breaking something critical in production and nobody noticed until a client complained.",
      solution:
        "We added automated checks around core revenue paths, plus self-healing UI guards. If something breaks, the right person gets pinged instantly.",
      result:
        "Shipping became calmer. No more guessing if today's deploy will blow up billing.",
    },
  ];

  return (
    <section
      id="use-cases"
      className="px-6 py-16 md:py-24 max-w-7xl mx-auto"
    >
      <div className="mb-10 max-w-2xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Automations in production
          </span>
        </div>

        <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">
          Real problems we’ve already removed.
        </h2>

        <p className="mt-4 text-sm md:text-base text-zinc-400 leading-relaxed">
          We step in where people are doing the same painful thing every day,
          or where a single miss would be expensive. We build the agent,
          hook it into your stack, and make it report back.
        </p>
      </div>

      <div className="space-y-6">
        {cases.map((c) => (
          <div
            key={c.title}
            className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-600/60 hover:shadow-[0_20px_60px_-10px_rgba(0,122,255,0.4)] hover:bg-zinc-900/60"
          >
            {/* glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-100/5 opacity-0 blur-xl transition group-hover:opacity-30 bg-[radial-gradient(circle_at_0%_0%,rgba(0,122,255,0.4),transparent_70%)]" />

            <div className="relative flex flex-col gap-4 md:flex-row md:gap-6">
              <div className="flex-shrink-0">
                <span className="rounded-full border border-blue-500/40 bg-blue-600/10 text-blue-300 text-[10px] font-medium px-2 py-1 shadow-[0_0_20px_rgba(0,122,255,0.6)]">
                  {c.badge}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-zinc-100 font-medium text-base leading-tight">
                  {c.title}
                </h3>

                <dl className="mt-3 grid gap-3 text-sm text-zinc-400 md:grid-cols-3">
                  <div>
                    <dt className="text-[11px] uppercase text-zinc-500 tracking-wide">
                      Problem
                    </dt>
                    <dd className="mt-1 leading-relaxed">{c.problem}</dd>
                  </div>

                  <div>
                    <dt className="text-[11px] uppercase text-zinc-500 tracking-wide">
                      Solution
                    </dt>
                    <dd className="mt-1 leading-relaxed">{c.solution}</dd>
                  </div>

                  <div>
                    <dt className="text-[11px] uppercase text-zinc-500 tracking-wide">
                      Result
                    </dt>
                    <dd className="mt-1 leading-relaxed">{c.result}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
