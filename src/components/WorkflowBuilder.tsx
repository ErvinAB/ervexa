"use client";

import { useCallback, useRef, useState, type ComponentType, type DragEvent } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  type ReactFlowInstance,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Download,
  Zap, Clock, Mail, Globe, GitBranch, Brain, Database, Bell, FileText, RefreshCw, Filter, Code2,
  BarChart3, Shield, CheckCircle, AlertTriangle, Workflow,
  Search, Eye, Box, ListChecks, TestTube, Bug, Target,
} from "lucide-react";

export type NodeCategory = "trigger" | "action" | "logic" | "output";

interface NodeDef {
  type: string;
  label: string;
  category: NodeCategory;
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

interface NodeData extends Record<string, unknown> { def: NodeDef; label: string }

const iconMap: Record<string, ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  webhook: Zap, schedule: Clock, form: Mail, email: Mail, api: Globe, transform: RefreshCw, llm: Brain, code: Code2,
  db: Database, condition: GitBranch, delay: Clock, filter: Filter, notify: Bell, report: FileText,
  datasource: Database, ingest: Download, volume: BarChart3, schema: FileText, contract: Shield, rule: CheckCircle,
  quarantine: AlertTriangle, warehouse: Database, integrity: GitBranch, metrics: BarChart3, lineage: Workflow,
  target: Target, explorer: Search, architect: Brain, auditor: Eye, forger: Box, pom: Code2, suite: ListChecks,
  playwright: TestTube, analyzer: Bug, healer: RefreshCw, registry: Database,
};

interface PresetConfig {
  nodeDefs: NodeDef[];
  initialNodes: Node[];
  initialEdges: Edge[];
  about: string;
}

function buildNodeDefs(entries: { type: string; label: string; category: NodeCategory; color: string }[]): NodeDef[] {
  return entries.map((e) => ({ ...e, icon: iconMap[e.type] || Code2 }));
}

const presets: Record<string, PresetConfig> = {
  generic: {
    nodeDefs: buildNodeDefs([
      { type: "webhook", label: "Webhook", category: "trigger", color: "#06b6d4" },
      { type: "schedule", label: "Schedule", category: "trigger", color: "#06b6d4" },
      { type: "form", label: "Form Submission", category: "trigger", color: "#06b6d4" },
      { type: "email", label: "Send Email", category: "action", color: "#8b5cf6" },
      { type: "api", label: "API Call", category: "action", color: "#8b5cf6" },
      { type: "transform", label: "Transform Data", category: "action", color: "#8b5cf6" },
      { type: "llm", label: "LLM Call", category: "action", color: "#8b5cf6" },
      { type: "code", label: "Custom Code", category: "action", color: "#8b5cf6" },
      { type: "db", label: "Database Query", category: "action", color: "#8b5cf6" },
      { type: "condition", label: "Condition", category: "logic", color: "#f59e0b" },
      { type: "delay", label: "Delay", category: "logic", color: "#f59e0b" },
      { type: "filter", label: "Filter", category: "logic", color: "#f59e0b" },
      { type: "notify", label: "Notification", category: "output", color: "#22c55e" },
      { type: "report", label: "Generate Report", category: "output", color: "#22c55e" },
    ]),
    initialNodes: [
      { id: "trigger-1", type: "custom", position: { x: 250, y: 50 }, data: { def: null, label: "Webhook" } },
      { id: "action-1", type: "custom", position: { x: 250, y: 200 }, data: { def: null, label: "API Call" } },
      { id: "output-1", type: "custom", position: { x: 250, y: 350 }, data: { def: null, label: "Notification" } },
    ],
    initialEdges: [
      { id: "e1-2", source: "trigger-1", target: "action-1" },
      { id: "e2-3", source: "action-1", target: "output-1" },
    ],
    about: "Prototype any automation flow — test frameworks, agentic workflows, data pipelines, n8n orchestration, or custom tooling.",
  },
  "data-reliability": {
    nodeDefs: buildNodeDefs([
      { type: "datasource", label: "Data Source", category: "trigger", color: "#06b6d4" },
      { type: "ingest", label: "Ingest Raw Data", category: "action", color: "#8b5cf6" },
      { type: "volume", label: "Volume Check (z-score)", category: "logic", color: "#f59e0b" },
      { type: "schema", label: "Schema Validation", category: "action", color: "#8b5cf6" },
      { type: "contract", label: "Data Contract Check", category: "action", color: "#8b5cf6" },
      { type: "rule", label: "Business-Rule Validation", category: "action", color: "#8b5cf6" },
      { type: "quarantine", label: "Quarantine Invalid", category: "action", color: "#ef4444" },
      { type: "transform", label: "Transform Data", category: "action", color: "#8b5cf6" },
      { type: "warehouse", label: "PostgreSQL Load", category: "action", color: "#8b5cf6" },
      { type: "integrity", label: "Warehouse Integrity", category: "logic", color: "#f59e0b" },
      { type: "metrics", label: "Metrics Export", category: "output", color: "#22c55e" },
      { type: "lineage", label: "Lineage Report", category: "output", color: "#22c55e" },
    ]),
    initialNodes: [
      { id: "ds-1", type: "custom", position: { x: 60, y: 0 }, data: { def: null, label: "Data Source" } },
      { id: "ing-1", type: "custom", position: { x: 60, y: 120 }, data: { def: null, label: "Ingest Raw Data" } },
      { id: "vol-1", type: "custom", position: { x: 60, y: 240 }, data: { def: null, label: "Volume Check (z-score)" } },
      { id: "sch-1", type: "custom", position: { x: 60, y: 360 }, data: { def: null, label: "Schema Validation" } },
      { id: "con-1", type: "custom", position: { x: 60, y: 480 }, data: { def: null, label: "Data Contract Check" } },
      { id: "rul-1", type: "custom", position: { x: 60, y: 600 }, data: { def: null, label: "Business-Rule Validation" } },
      { id: "tr-1", type: "custom", position: { x: 60, y: 720 }, data: { def: null, label: "Transform Data" } },
      { id: "wh-1", type: "custom", position: { x: 60, y: 840 }, data: { def: null, label: "PostgreSQL Load" } },
      { id: "int-1", type: "custom", position: { x: 60, y: 960 }, data: { def: null, label: "Warehouse Integrity" } },
      { id: "met-1", type: "custom", position: { x: 60, y: 1080 }, data: { def: null, label: "Metrics Export" } },
      { id: "quar-1", type: "custom", position: { x: 300, y: 600 }, data: { def: null, label: "Quarantine Invalid" } },
      { id: "lin-1", type: "custom", position: { x: 60, y: 1200 }, data: { def: null, label: "Lineage Report" } },
    ],
    initialEdges: [
      { id: "e1", source: "ds-1", target: "ing-1" },
      { id: "e2", source: "ing-1", target: "vol-1" },
      { id: "e3", source: "vol-1", target: "sch-1" },
      { id: "e4", source: "sch-1", target: "con-1" },
      { id: "e5", source: "con-1", target: "rul-1" },
      { id: "e6", source: "rul-1", target: "tr-1" },
      { id: "e7", source: "rul-1", target: "quar-1" },
      { id: "e8", source: "tr-1", target: "wh-1" },
      { id: "e9", source: "wh-1", target: "int-1" },
      { id: "e10", source: "int-1", target: "met-1" },
      { id: "e11", source: "met-1", target: "lin-1" },
    ],
    about: "Data Reliability Suite pipeline — ingest, detect anomalies, validate schemas, enforce contracts, quarantine invalid records, transform, load into PostgreSQL, verify integrity, and export metrics.",
  },
  "swarm-qa": {
    nodeDefs: buildNodeDefs([
      { type: "target", label: "Target URL", category: "trigger", color: "#06b6d4" },
      { type: "explorer", label: "Explorer Agent", category: "action", color: "#8b5cf6" },
      { type: "architect", label: "Architect Agent", category: "action", color: "#8b5cf6" },
      { type: "auditor", label: "Auditor (coverage)", category: "logic", color: "#f59e0b" },
      { type: "forger", label: "Data Forger", category: "action", color: "#8b5cf6" },
      { type: "pom", label: "POM Generator", category: "action", color: "#8b5cf6" },
      { type: "suite", label: "Suite Creator", category: "action", color: "#8b5cf6" },
      { type: "playwright", label: "Playwright Execution", category: "action", color: "#8b5cf6" },
      { type: "analyzer", label: "Failure Analyzer", category: "action", color: "#8b5cf6" },
      { type: "healer", label: "Healer", category: "action", color: "#8b5cf6" },
      { type: "registry", label: "Registry Update", category: "output", color: "#22c55e" },
      { type: "report", label: "QA Report", category: "output", color: "#22c55e" },
    ]),
    initialNodes: [
      { id: "t-1", type: "custom", position: { x: 200, y: 0 }, data: { def: null, label: "Target URL" } },
      { id: "ex-1", type: "custom", position: { x: 200, y: 120 }, data: { def: null, label: "Explorer Agent" } },
      { id: "ar-1", type: "custom", position: { x: 200, y: 240 }, data: { def: null, label: "Architect Agent" } },
      { id: "au-1", type: "custom", position: { x: 200, y: 360 }, data: { def: null, label: "Auditor (coverage)" } },
      { id: "fo-1", type: "custom", position: { x: 60, y: 480 }, data: { def: null, label: "Data Forger" } },
      { id: "pom-1", type: "custom", position: { x: 200, y: 480 }, data: { def: null, label: "POM Generator" } },
      { id: "sc-1", type: "custom", position: { x: 340, y: 480 }, data: { def: null, label: "Suite Creator" } },
      { id: "pw-1", type: "custom", position: { x: 200, y: 600 }, data: { def: null, label: "Playwright Execution" } },
      { id: "an-1", type: "custom", position: { x: 200, y: 720 }, data: { def: null, label: "Failure Analyzer" } },
      { id: "hl-1", type: "custom", position: { x: 200, y: 840 }, data: { def: null, label: "Healer" } },
      { id: "rg-1", type: "custom", position: { x: 200, y: 960 }, data: { def: null, label: "Registry Update" } },
      { id: "rp-1", type: "custom", position: { x: 200, y: 1080 }, data: { def: null, label: "QA Report" } },
    ],
    initialEdges: [
      { id: "e1", source: "t-1", target: "ex-1" },
      { id: "e2", source: "ex-1", target: "ar-1" },
      { id: "e3", source: "ar-1", target: "au-1" },
      { id: "e4", source: "au-1", target: "fo-1" },
      { id: "e5", source: "au-1", target: "pom-1" },
      { id: "e6", source: "au-1", target: "sc-1" },
      { id: "e7", source: "fo-1", target: "pw-1" },
      { id: "e8", source: "pom-1", target: "pw-1" },
      { id: "e9", source: "sc-1", target: "pw-1" },
      { id: "e10", source: "pw-1", target: "an-1" },
      { id: "e11", source: "an-1", target: "hl-1" },
      { id: "e12", source: "hl-1", target: "rg-1" },
      { id: "e13", source: "rg-1", target: "rp-1" },
    ],
    about: "Swarm QA Framework — seven AI agents collaborate to explore application structure, design testing strategy, generate test assets, execute Playwright suites, analyse failures, heal locators, and log results to a knowledge registry.",
  },
};

function WorkflowNode({ data }: { data: Record<string, unknown> }) {
  const d = data as NodeData;
  const def = d.def;
  const Icon = def.icon;
  const cat = def.category;
  return (
    <div className="rounded-lg border bg-zinc-900 px-4 py-3 shadow-lg relative" style={{ borderColor: `${def.color}40`, minWidth: 160 }}>
      {cat !== "trigger" && (
        <Handle type="target" position={Position.Left} className="!h-2.5 !w-2.5 !border-2 !border-zinc-700 !bg-zinc-900" />
      )}
      <div className="flex items-center gap-2">
        <div className="rounded p-1.5" style={{ backgroundColor: `${def.color}20` }}>
          <Icon className="h-3.5 w-3.5" style={{ color: def.color }} />
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-200">{def.label}</p>
          <p className="text-[10px] text-zinc-600 capitalize">{cat}</p>
        </div>
      </div>
      {cat !== "output" && (
        <Handle type="source" position={Position.Right} className="!h-2.5 !w-2.5 !border-2 !border-zinc-700 !bg-zinc-900" />
      )}
    </div>
  );
}

const nodeTypes: NodeTypes = { custom: WorkflowNode };

interface Props {
  preset?: "generic" | "data-reliability" | "swarm-qa";
}

export default function WorkflowBuilder({ preset = "generic" }: Props) {
  const config = presets[preset];

  const resolveNodes = (nodes: Node[]): Node[] =>
    nodes.map((n) => {
      const def = config.nodeDefs.find((d) => d.label === n.data.label);
      return { ...n, data: { ...n.data, def: def || config.nodeDefs[0] } };
    });

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(resolveNodes(config.initialNodes));
  const [edges, setEdges, onEdgesChange] = useEdgesState(config.initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance) return;
      const def = config.nodeDefs.find((n) => n.type === type);
      if (!def) return;
      const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
      setNodes((nds) => nds.concat({ id: `${def.type}-${Date.now()}`, type: "custom", position, data: { def, label: def.label } }));
    },
    [reactFlowInstance, setNodes, config.nodeDefs],
  );

  const onDragStart = (event: DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  const deleteSelected = useCallback(() => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
    setSelectedNode(null);
  }, [selectedNode, setNodes, setEdges]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if ((event.key === "Delete" || event.key === "Backspace") && selectedNode) deleteSelected();
    },
    [selectedNode, deleteSelected],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => setSelectedNode(node), []);
  const onPaneClick = useCallback(() => setSelectedNode(null), []);

  const exportJSON = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify({ nodes, edges }, null, 2));
    alert("Workflow copied to clipboard as JSON");
  }, [nodes, edges]);

  return (
    <div className="flex h-[600px] gap-3">
      {/* Sidebar */}
      <div className="w-44 shrink-0 space-y-4 overflow-y-auto rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-3">
        <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Drag nodes</p>
        {(["trigger", "action", "logic", "output"] as NodeCategory[]).map((cat) => {
          const filtered = config.nodeDefs.filter((n) => n.category === cat);
          if (filtered.length === 0) return null;
          return (
            <div key={cat}>
              <p className="mb-1.5 font-mono text-[9px] text-zinc-700 uppercase tracking-wider">{cat}s</p>
              <div className="space-y-1">
                {filtered.map((def) => {
                  const Icon = def.icon;
                  return (
                    <div
                      key={def.type}
                      draggable
                      onDragStart={(e) => onDragStart(e, def.type)}
                      className="flex cursor-grab items-center gap-2 rounded border border-zinc-800/30 bg-zinc-900/40 px-2.5 py-2 text-xs text-zinc-400 hover:border-zinc-700/50 hover:text-zinc-200 active:cursor-grabbing transition-colors"
                    >
                      <Icon className="h-3 w-3 shrink-0" style={{ color: def.color }} />
                      {def.label}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Canvas */}
      <div ref={reactFlowWrapper} className="flex-1 rounded-lg border border-zinc-800/30 bg-zinc-950/60">
        <div className="h-full w-full" onKeyDown={onKeyDown} tabIndex={0}>
          <ReactFlow
            nodes={nodes} edges={edges}
            onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
            onConnect={onConnect} onInit={setReactFlowInstance}
            onDragOver={onDragOver} onDrop={onDrop}
            onNodeClick={onNodeClick} onPaneClick={onPaneClick}
            nodeTypes={nodeTypes} fitView colorMode="dark"
            style={{ background: "transparent" }} proOptions={{ hideAttribution: true }}
          >
            <Background color="#27272a" gap={20} />
            <Controls className="!bg-zinc-900 !border-zinc-800 !text-zinc-400" />
            <MiniMap className="!border-zinc-800 !bg-zinc-900" nodeColor="#27272a" maskColor="rgba(0,0,0,0.7)" />
          </ReactFlow>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-36 shrink-0 space-y-3">
        <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-3">
          <p className="mb-2 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Export</p>
          <button onClick={exportJSON} className="flex w-full items-center gap-1.5 rounded border border-zinc-800/50 bg-zinc-900/30 px-2.5 py-2 text-[11px] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors">
            <Download className="h-3 w-3" /> JSON
          </button>
        </div>

        {selectedNode && (
          <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-3">
            <p className="mb-2 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Node</p>
            <p className="text-xs text-zinc-300">{(selectedNode.data as NodeData)?.def?.label}</p>
            <p className="text-[10px] text-zinc-600 capitalize mb-2">{(selectedNode.data as NodeData)?.def?.category}</p>
            <button onClick={deleteSelected} className="flex w-full items-center justify-center gap-1 rounded border border-red-900/50 bg-red-950/20 px-2.5 py-1.5 text-[11px] text-red-400 hover:bg-red-950/40 transition-colors">
              Delete
            </button>
          </div>
        )}

        <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-3">
          <p className="mb-2 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">About</p>
          <p className="text-[10px] text-zinc-600 leading-relaxed">{config.about}</p>
        </div>

        <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-3">
          <p className="mb-2 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">How to</p>
          <ul className="space-y-1 text-[10px] text-zinc-600 leading-relaxed">
            <li>• Add: drag from left panel</li>
            <li>• Connect: right dot to left dot</li>
            <li>• Delete: select + Backspace</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
