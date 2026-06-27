export default function PipelineHero() {
  const nodes = [
    { label: "Explore", top: "10%", left: "0%" },
    { label: "Strategy", top: "50%", left: "8%" },
    { label: "Generate", top: "10%", left: "25%" },
    { label: "Validate", top: "50%", left: "40%" },
    { label: "Execute", top: "10%", left: "55%" },
    { label: "Analyse", top: "50%", left: "70%" },
    { label: "Report", top: "10%", left: "82%" },
  ];

  return (
    <div className="relative h-full w-full">
      <svg
        className="h-full w-full"
        viewBox="0 0 400 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines */}
        <path
          d="M30 16 L70 80 L110 16 L170 80 L230 16 L290 80 L340 16"
          stroke="#27272a"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          fill="none"
          className="md:opacity-100"
        />
        <path
          d="M30 16 L70 80 L110 16"
          stroke="#06b6d4"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="200"
            to="0"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            values="4 100;4 0;4 100"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const cx = (parseFloat(node.left) / 100) * 380 + 20;
          const cy = node.top === "10%" ? 16 : 80;
          const isTop = node.top === "10%";

          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r={isTop ? 14 : 10}
                fill={isTop ? "#18181b" : "#27272a"}
                stroke={isTop ? "#06b6d4" : "#3f3f46"}
                strokeWidth="1.5"
              />
              {isTop && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={14}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values="14;20;14"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <text
                x={cx}
                y={cy + (isTop ? 30 : 24)}
                textAnchor="middle"
                fill={isTop ? "#a1a1aa" : "#52525b"}
                fontSize="7"
                fontFamily="Geist Mono, ui-monospace, monospace"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Data flow particles */}
        <circle r="2" fill="#06b6d4" opacity="0.6">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M30 16 L70 80 L110 16 L170 80 L230 16 L290 80 L340 16"
          />
        </circle>
        <circle r="1.5" fill="#06b6d4" opacity="0.4">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            begin="1s"
            path="M30 16 L70 80 L110 16 L170 80 L230 16 L290 80 L340 16"
          />
        </circle>
      </svg>
    </div>
  );
}
