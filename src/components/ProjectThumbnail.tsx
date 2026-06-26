interface Props {
  slug: string;
}

export default function ProjectThumbnail({ slug }: Props) {
  return (
    <div className="relative h-40 w-full overflow-hidden bg-zinc-900/40 border-b border-zinc-800/30 transition-all group-hover:bg-zinc-900/60">
      <svg className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02]" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {slug === "swarm-qa-framework" && (
          <>
            <rect x="0" y="0" width="400" height="160" fill="#09090b" />
            <circle cx="80" cy="50" r="18" stroke="#06b6d4" strokeWidth="1.5" fill="#18181b" opacity="0.7" />
            <circle cx="200" cy="50" r="22" stroke="#06b6d4" strokeWidth="1.5" fill="#18181b" opacity="0.9" />
            <circle cx="320" cy="50" r="16" stroke="#06b6d4" strokeWidth="1.5" fill="#18181b" opacity="0.7" />
            <circle cx="140" cy="110" r="14" stroke="#3f3f46" strokeWidth="1" fill="#18181b" />
            <circle cx="260" cy="110" r="14" stroke="#3f3f46" strokeWidth="1" fill="#18181b" />
            <line x1="98" y1="50" x2="178" y2="50" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
            <line x1="222" y1="50" x2="304" y2="50" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
            <line x1="80" y1="68" x2="140" y2="96" stroke="#3f3f46" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="200" y1="72" x2="140" y2="96" stroke="#3f3f46" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="200" y1="72" x2="260" y2="96" stroke="#3f3f46" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="320" y1="66" x2="260" y2="96" stroke="#3f3f46" strokeWidth="0.8" strokeDasharray="3 3" />
            <text x="80" y="84" textAnchor="middle" fill="#52525b" fontSize="6" fontFamily="ui-monospace, monospace">Explore</text>
            <text x="200" y="84" textAnchor="middle" fill="#71717a" fontSize="7" fontFamily="ui-monospace, monospace">Orchestrate</text>
            <text x="320" y="80" textAnchor="middle" fill="#52525b" fontSize="6" fontFamily="ui-monospace, monospace">Report</text>
            <text x="140" y="130" textAnchor="middle" fill="#3f3f46" fontSize="5.5" fontFamily="ui-monospace, monospace">Agents</text>
            <text x="260" y="130" textAnchor="middle" fill="#3f3f46" fontSize="5.5" fontFamily="ui-monospace, monospace">Registry</text>
          </>
        )}
        {slug === "data-reliability-suite" && (
          <>
            <rect x="0" y="0" width="400" height="160" fill="#09090b" />
            <rect x="20" y="45" width="60" height="28" rx="4" stroke="#06b6d4" strokeWidth="1" fill="#18181b" opacity="0.8" />
            <rect x="100" y="45" width="60" height="28" rx="4" stroke="#3f3f46" strokeWidth="1" fill="#18181b" />
            <rect x="180" y="45" width="60" height="28" rx="4" stroke="#3f3f46" strokeWidth="1" fill="#18181b" />
            <rect x="260" y="45" width="60" height="28" rx="4" stroke="#06b6d4" strokeWidth="1" fill="#18181b" opacity="0.6" />
            <rect x="340" y="45" width="40" height="28" rx="4" stroke="#22c55e" strokeWidth="1" fill="#18181b" opacity="0.5" />
            <line x1="80" y1="59" x2="100" y2="59" stroke="#27272a" strokeWidth="1.5" />
            <line x1="160" y1="59" x2="180" y2="59" stroke="#27272a" strokeWidth="1.5" />
            <line x1="240" y1="59" x2="260" y2="59" stroke="#27272a" strokeWidth="1.5" />
            <line x1="320" y1="59" x2="340" y2="59" stroke="#27272a" strokeWidth="1.5" />
            <text x="50" y="64" textAnchor="middle" fill="#a1a1aa" fontSize="6" fontFamily="ui-monospace, monospace">Ingest</text>
            <text x="130" y="64" textAnchor="middle" fill="#52525b" fontSize="6" fontFamily="ui-monospace, monospace">Validate</text>
            <text x="210" y="64" textAnchor="middle" fill="#52525b" fontSize="6" fontFamily="ui-monospace, monospace">Transform</text>
            <text x="290" y="64" textAnchor="middle" fill="#a1a1aa" fontSize="6" fontFamily="ui-monospace, monospace">Warehouse</text>
            <text x="360" y="64" textAnchor="middle" fill="#22c55e" fontSize="6" fontFamily="ui-monospace, monospace">OK</text>
            <rect x="20" y="100" width="360" height="1" fill="#27272a" opacity="0.3" />
            <line x1="50" y1="101" x2="50" y2="130" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
            <line x1="130" y1="101" x2="130" y2="130" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
            <line x1="210" y1="101" x2="210" y2="130" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
            <line x1="290" y1="101" x2="290" y2="130" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
            <text x="50" y="140" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">schema</text>
            <text x="130" y="140" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">rules</text>
            <text x="210" y="140" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">metrics</text>
            <text x="290" y="140" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">lineage</text>
          </>
        )}
        {slug === "job-application-automation" && (
          <>
            <rect x="0" y="0" width="400" height="160" fill="#09090b" />
            <path d="M40 50 L80 50 L80 90 L40 90 Z" stroke="#06b6d4" strokeWidth="1" fill="#18181b" opacity="0.8" />
            <path d="M120 50 L160 50 L160 90 L120 90 Z" stroke="#3f3f46" strokeWidth="1" fill="#18181b" />
            <path d="M200 50 L240 50 L240 90 L200 90 Z" stroke="#3f3f46" strokeWidth="1" fill="#18181b" />
            <path d="M280 50 L320 50 L320 90 L280 90 Z" stroke="#06b6d4" strokeWidth="1" fill="#18181b" opacity="0.6" />
            <path d="M340 35 L380 35 L380 105 L340 105 Z" stroke="#22c55e" strokeWidth="1" fill="#18181b" opacity="0.5" rx="4" />
            <line x1="80" y1="70" x2="120" y2="70" stroke="#27272a" strokeWidth="1.5" />
            <line x1="160" y1="70" x2="200" y2="70" stroke="#27272a" strokeWidth="1.5" />
            <line x1="240" y1="70" x2="280" y2="70" stroke="#27272a" strokeWidth="1.5" />
            <path d="M320 70 L340 70" stroke="#27272a" strokeWidth="1.5" />
            <text x="60" y="75" textAnchor="middle" fill="#a1a1aa" fontSize="6" fontFamily="ui-monospace, monospace">JD</text>
            <text x="140" y="75" textAnchor="middle" fill="#52525b" fontSize="6" fontFamily="ui-monospace, monospace">Analyse</text>
            <text x="220" y="75" textAnchor="middle" fill="#52525b" fontSize="6" fontFamily="ui-monospace, monospace">Match</text>
            <text x="300" y="75" textAnchor="middle" fill="#a1a1aa" fontSize="6" fontFamily="ui-monospace, monospace">Generate</text>
            <text x="360" y="75" textAnchor="middle" fill="#22c55e" fontSize="6" fontFamily="ui-monospace, monospace">CV</text>
            <path d="M60 100 C60 130, 140 130, 140 100" stroke="#3f3f46" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
            <path d="M220 100 C220 130, 300 130, 300 100" stroke="#3f3f46" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
            <circle cx="60" cy="105" r="2" fill="#06b6d4" opacity="0.5" />
            <circle cx="220" cy="105" r="2" fill="#06b6d4" opacity="0.5" />
          </>
        )}
        {slug === "locator-agent" && (
          <>
            <rect x="0" y="0" width="400" height="160" fill="#09090b" />
            <circle cx="80" cy="50" r="10" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
            <text x="80" y="54" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="ui-monospace, monospace">!</text>
            <text x="80" y="75" textAnchor="middle" fill="#52525b" fontSize="5.5" fontFamily="ui-monospace, monospace">FAIL</text>
            <line x1="100" y1="50" x2="140" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <rect x="140" y="35" width="50" height="30" rx="4" fill="#18181b" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />
            <text x="165" y="54" textAnchor="middle" fill="#a1a1aa" fontSize="6" fontFamily="ui-monospace, monospace">DB</text>
            <line x1="190" y1="50" x2="220" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="250" cy="50" r="16" fill="#18181b" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="250" y="54" textAnchor="middle" fill="#06b6d4" fontSize="7" fontFamily="ui-monospace, monospace">AI</text>
            <line x1="266" y1="50" x2="300" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="330" cy="50" r="14" fill="#18181b" stroke="#22c55e" strokeWidth="1.5" />
            <text x="330" y="54" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="ui-monospace, monospace">✓</text>
            <text x="330" y="75" textAnchor="middle" fill="#52525b" fontSize="5.5" fontFamily="ui-monospace, monospace">HEAL</text>
            <path d="M250 66 C250 100, 80 100, 80 60" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.4" />
            <circle cx="165" cy="100" r="2" fill="#06b6d4" opacity="0.4" />
            <text x="250" y="100" textAnchor="middle" fill="#3f3f46" fontSize="5" fontFamily="ui-monospace, monospace">feedback loop</text>
          </>
        )}
        {slug === "test-analyzer-agent" && (
          <>
            <rect x="0" y="0" width="400" height="160" fill="#09090b" />
            <rect x="20" y="35" width="70" height="30" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
            <text x="55" y="54" textAnchor="middle" fill="#a1a1aa" fontSize="6" fontFamily="ui-monospace, monospace">Results</text>
            <line x1="90" y1="50" x2="120" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="150" cy="50" r="18" fill="#18181b" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="150" y="47" textAnchor="middle" fill="#06b6d4" fontSize="6" fontFamily="ui-monospace, monospace">NLP</text>
            <text x="150" y="58" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">classify</text>
            <line x1="168" y1="50" x2="200" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="230" cy="50" r="16" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="230" y="54" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="ui-monospace, monospace">LLM</text>
            <line x1="246" y1="50" x2="280" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <rect x="280" y="35" width="60" height="30" rx="3" fill="#18181b" stroke="#22c55e" strokeWidth="1" />
            <text x="310" y="54" textAnchor="middle" fill="#22c55e" fontSize="6" fontFamily="ui-monospace, monospace">Jira</text>
            <rect x="20" y="90" width="320" height="1" fill="#27272a" opacity="0.3" />
            <text x="55" y="115" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">assertion</text>
            <text x="150" y="115" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">timeout</text>
            <text x="230" y="115" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">locator</text>
            <text x="310" y="115" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">infra</text>
            <line x1="55" y1="90" x2="55" y2="105" stroke="#3f3f46" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="150" y1="90" x2="150" y2="105" stroke="#3f3f46" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="230" y1="90" x2="230" y2="105" stroke="#3f3f46" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="310" y1="90" x2="310" y2="105" stroke="#3f3f46" strokeWidth="0.8" strokeDasharray="2 2" />
          </>
        )}
        {slug === "k6-performance-pipeline" && (
          <>
            <rect x="0" y="0" width="400" height="160" fill="#09090b" />
            <rect x="20" y="35" width="60" height="30" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
            <text x="50" y="54" textAnchor="middle" fill="#a1a1aa" fontSize="6" fontFamily="ui-monospace, monospace">k6</text>
            <line x1="80" y1="50" x2="110" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="140" cy="50" r="12" fill="#18181b" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="140" y="54" textAnchor="middle" fill="#06b6d4" fontSize="7" fontFamily="ui-monospace, monospace">S</text>
            <text x="140" y="72" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">smoke</text>
            <line x1="152" y1="50" x2="180" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="210" cy="50" r="14" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="210" y="54" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="ui-monospace, monospace">L</text>
            <text x="210" y="72" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">load</text>
            <line x1="224" y1="50" x2="250" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <rect x="250" y="35" width="50" height="30" rx="3" fill="#18181b" stroke="#22c55e" strokeWidth="1" />
            <text x="275" y="54" textAnchor="middle" fill="#22c55e" fontSize="6" fontFamily="ui-monospace, monospace">SLO</text>
            <line x1="300" y1="50" x2="330" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <text x="360" y="47" textAnchor="middle" fill="#a1a1aa" fontSize="6" fontFamily="ui-monospace, monospace">Graf</text>
            <text x="360" y="60" textAnchor="middle" fill="#52525b" fontSize="4" fontFamily="ui-monospace, monospace">ana</text>
            <rect x="20" y="90" width="360" height="20" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" opacity="0.6" />
            <text x="50" y="103" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">Docker</text>
            <text x="140" y="103" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">Prometheus</text>
            <text x="250" y="103" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">GitHub Actions</text>
            <circle cx="30" cy="50" r="2" fill="#06b6d4" opacity="0.6">
              <animateMotion dur="3s" repeatCount="indefinite" path="M30 50 L380 50" />
            </circle>
          </>
        )}
        {slug === "predictive-testing-agent" && (
          <>
            <rect x="0" y="0" width="400" height="160" fill="#09090b" />
            <rect x="20" y="35" width="60" height="30" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
            <text x="50" y="54" textAnchor="middle" fill="#a1a1aa" fontSize="6" fontFamily="ui-monospace, monospace">PR</text>
            <line x1="80" y1="50" x2="110" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="140" cy="50" r="18" fill="#18181b" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="140" y="47" textAnchor="middle" fill="#06b6d4" fontSize="6" fontFamily="ui-monospace, monospace">ML</text>
            <text x="140" y="58" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">predict</text>
            <line x1="158" y1="50" x2="190" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="220" cy="50" r="16" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="220" y="50" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="ui-monospace, monospace">#1</text>
            <text x="220" y="68" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">risk</text>
            <line x1="236" y1="50" x2="260" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <rect x="260" y="35" width="50" height="30" rx="3" fill="#18181b" stroke="#22c55e" strokeWidth="1" />
            <text x="285" y="54" textAnchor="middle" fill="#22c55e" fontSize="6" fontFamily="ui-monospace, monospace">Suite</text>
            <line x1="310" y1="50" x2="340" y2="50" stroke="#3f3f46" strokeWidth="1.5" />
            <rect x="340" y="35" width="40" height="30" rx="3" fill="#18181b" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
            <text x="360" y="54" textAnchor="middle" fill="#06b6d4" fontSize="6" fontFamily="ui-monospace, monospace">CI</text>
            <rect x="40" y="100" width="20" height="30" rx="2" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
            <rect x="70" y="90" width="20" height="40" rx="2" fill="#18181b" stroke="#06b6d4" strokeWidth="0.8" opacity="0.6" />
            <rect x="100" y="105" width="20" height="25" rx="2" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
            <rect x="130" y="85" width="20" height="45" rx="2" fill="#18181b" stroke="#06b6d4" strokeWidth="0.8" opacity="0.6" />
            <rect x="160" y="95" width="20" height="35" rx="2" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
            <text x="50" y="145" textAnchor="middle" fill="#52525b" fontSize="5" fontFamily="ui-monospace, monospace">tests</text>
            <text x="100" y="145" textAnchor="middle" fill="#06b6d4" fontSize="5" fontFamily="ui-monospace, monospace">risk score →</text>
          </>
        )}
      </svg>
    </div>
  );
}
