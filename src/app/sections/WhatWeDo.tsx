import { Bot, Workflow, ActivitySquare, ShieldCheck } from "lucide-react";

export default function WhatWeDo() {
  const services = [
    {
      icon: Bot,
      title: "AI Assistants for Internal Teams",
      tag: "Answer. Summarize. Escalate.",
      desc: "We build AI agents that read your internal data, draft replies, and only wake up a human when something is actually non-standard.",
    },
    {
      icon: Workflow,
      title: "Workflow Automation & Orchestration",
      tag: "n8n / webhooks / glue",
      desc: "We connect the tools you already use and automate the boring handoffs: create records, sync data, send the alert, file the PDF, update the sheet. No more manual copy-paste.",
    },
    {
      icon: ActivitySquare,
      title: "Monitoring, Alerts & Audit Trails",
      tag: "Ops / Compliance / Risk",
      desc: "Bots watch for new events (new contract, new client, risky change) and post structured summaries to Slack/Telegram — plus we keep an audit log so you can prove who knew what, and when.",
    },
    {
      icon: ShieldCheck,
      title: "Quality & Reliability Automation",
      tag: "Release safety",
      desc: "We wrap your most critical flows in automated checks so you stop finding out about problems from angry customers. Includes self-healing UI checks if needed.",
    },
  ];

  return (
    <section
      id="services"
      className="px-6 py-16 md:py-24 max-w-7xl mx-auto"
    >
      <div className="mb-10 max-w-2xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            What we do
          </span>
        </div>

        <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">
          We remove repetitive work with targeted AI and automation.
        </h2>

        <p className="mt-4 text-sm md:text-base text-zinc-400 leading-relaxed">
          We come in where your team is wasting hours doing something by hand,
          or where mistakes are expensive. Then we replace that with an agent,
          a workflow, or both.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((item) => (
          <div
            key={item.title}
            className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-600/60 hover:shadow-[0_20px_60px_-10px_rgba(0,122,255,0.4)] hover:bg-zinc-900/60"
          >
            {/* glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-100/5 opacity-0 blur-xl transition group-hover:opacity-30 bg-[radial-gradient(circle_at_0%_0%,rgba(0,122,255,0.4),transparent_70%)]" />

            <div className="relative flex items-start gap-4">
              <div className="rounded-xl bg-blue-600/20 text-blue-300 p-2 ring-1 ring-blue-500/40 shadow-[0_0_30px_rgba(0,122,255,0.6)]">
                <item.icon className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-zinc-100 font-medium text-base leading-tight">
                    {item.title}
                  </h3>
                  <span className="rounded-full border border-zinc-700/60 bg-zinc-900/60 px-2 py-0.5 text-[10px] text-zinc-400 font-medium">
                    {item.tag}
                  </span>
                </div>

                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
