'use client';
import { motion } from 'framer-motion';
import { Code2, Zap, MailCheck } from 'lucide-react';

const agents = [
  {
    name: "Inbox Screener Agent",
    icon: MailCheck,
    description: "Sorts emails by urgency and extracts actionable items using NLP.",
    code: `const flagged = inboxAgent.filterUrgent(emails)\nconsole.log(flagged.slice(0, 3))`,
  },
  {
    name: "Auto Reply Generator",
    icon: Zap,
    description: "Generates human-like responses based on message context.",
    code: `const reply = autoReply.generate(context)\nconsole.log(reply.preview)`,
  },
  {
    name: "Code Summarizer",
    icon: Code2,
    description: "Summarizes code changes in PRs for documentation or review.",
    code: `const summary = summarizer.run(diff)\nconsole.log(summary.text)`,
  },
];

export default function AgentShowcase() {
  return (
    <section className="w-full bg-black text-white py-24 px-6 relative overflow-hidden">
      {/* Optional animated background pulse or blur */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-3xl rounded-full z-0" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured AI Agents
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Explore some of the intelligent agents powering real automation and insights at Ervexa.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-left hover:scale-[1.02] transition duration-300 shadow-md hover:shadow-cyan-500/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <agent.icon className="text-cyan-400" size={24} />
                <h3 className="text-lg font-semibold">{agent.name}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">{agent.description}</p>

              <pre className="bg-black/80 text-xs text-cyan-300 p-3 rounded-lg font-mono whitespace-pre-wrap overflow-auto border border-cyan-400/10 shadow-inner shadow-cyan-500/10">
                <code>{agent.code}</code>
              </pre>

              <div className="mt-4 flex gap-3">
                <a
                  href="#"
                  className="text-sm px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
                >
                  View Code
                </a>
                <a
                  href="#"
                  className="text-sm px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
                >
                  Try Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
