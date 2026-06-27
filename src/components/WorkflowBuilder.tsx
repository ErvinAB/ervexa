"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
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
import { Zap, Clock, Mail, Globe, GitBranch, Brain, Database, Bell, FileText, RefreshCw, Filter, Code2, Download } from "lucide-react";

type NodeCategory = "trigger" | "action" | "logic" | "output";

interface NodeDef {
  type: string;
  label: string;
  category: NodeCategory;
  icon: typeof Zap;
  color: string;
}

const nodeDefs: NodeDef[] = [
  { type: "webhook", label: "Webhook", category: "trigger", icon: Zap, color: "#06b6d4" },
  { type: "schedule", label: "Schedule", category: "trigger", icon: Clock, color: "#06b6d4" },
  { type: "form", label: "Form Submission", category: "trigger", icon: FileText, color: "#06b6d4" },

  { type: "email", label: "Send Email", category: "action", icon: Mail, color: "#8b5cf6" },
  { type: "api", label: "API Call", category: "action", icon: Globe, color: "#8b5cf6" },
  { type: "transform", label: "Transform Data", category: "action", icon: RefreshCw, color: "#8b5cf6" },
  { type: "llm", label: "LLM Call", category: "action", icon: Brain, color: "#8b5cf6" },
  { type: "code", label: "Custom Code", category: "action", icon: Code2, color: "#8b5cf6" },
  { type: "db", label: "Database Query", category: "action", icon: Database, color: "#8b5cf6" },

  { type: "condition", label: "Condition", category: "logic", icon: GitBranch, color: "#f59e0b" },
  { type: "delay", label: "Delay", category: "logic", icon: Clock, color: "#f59e0b" },
  { type: "filter", label: "Filter", category: "logic", icon: Filter, color: "#f59e0b" },

  { type: "notify", label: "Notification", category: "output", icon: Bell, color: "#22c55e" },
  { type: "report", label: "Generate Report", category: "output", icon: FileText, color: "#22c55e" },
];

const initialNodes: Node[] = [
  {
    id: "trigger-1",
    type: "custom",
    position: { x: 250, y: 50 },
    data: { def: nodeDefs[0], label: "Webhook" },
  },
  {
    id: "action-1",
    type: "custom",
    position: { x: 250, y: 200 },
    data: { def: nodeDefs[4], label: "API Call" },
  },
  {
    id: "output-1",
    type: "custom",
    position: { x: 250, y: 350 },
    data: { def: nodeDefs[12], label: "Notification" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "trigger-1", target: "action-1" },
  { id: "e2-3", source: "action-1", target: "output-1" },
];

interface NodeData extends Record<string, unknown> { def: NodeDef; label: string }

function WorkflowNode({ data }: { data: Record<string, unknown> }) {
  const def = data.def as NodeDef;
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

export default function WorkflowBuilder() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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

      const def = nodeDefs.find((n) => n.type === type);
      if (!def) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const id = `${def.type}-${Date.now()}`;
      const newNode: Node = {
        id,
        type: "custom",
        position,
        data: { def, label: def.label },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
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
      if ((event.key === "Delete" || event.key === "Backspace") && selectedNode) {
        deleteSelected();
      }
    },
    [selectedNode, deleteSelected],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const exportJSON = useCallback(() => {
    const flow = { nodes, edges };
    const json = JSON.stringify(flow, null, 2);
    navigator.clipboard.writeText(json);
    alert("Workflow copied to clipboard as JSON");
  }, [nodes, edges]);

  const exportN8N = useCallback(() => {
    const n8nNodes = nodes.map((n) => ({
      id: n.id,
      name: (n.data as NodeData)?.def?.label || "Node",
      type: "n8n-nodes-base.noOp",
      position: [n.position.x, n.position.y] as [number, number],
    }));
    const n8nEdges = edges.map((e) => ({
      source: e.source,
      target: e.target,
      type: "default",
    }));
    const workflow = {
      name: "Stagbyte Workflow",
      nodes: n8nNodes,
      connections: n8nEdges.reduce((acc: Record<string, { main: { node: string; type: string; index: number }[][] }>, e) => {
        if (!acc[e.source]) acc[e.source] = { main: [] };
        acc[e.source].main.push([{ node: e.target, type: "main", index: 0 }]);
        return acc;
      }, {}),
      settings: {},
      staticData: null,
      tags: [],
    };
    navigator.clipboard.writeText(JSON.stringify(workflow, null, 2));
    alert("n8n-compatible workflow copied to clipboard. Import it in n8n.");
  }, [nodes, edges]);

  return (
    <div className="flex h-[600px] gap-3">
      {/* Sidebar */}
      <div className="w-44 shrink-0 space-y-4 overflow-y-auto rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-3">
        <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Drag nodes</p>
        {(["trigger", "action", "logic", "output"] as NodeCategory[]).map((cat) => (
          <div key={cat}>
            <p className="mb-1.5 font-mono text-[9px] text-zinc-700 uppercase tracking-wider">{cat}s</p>
            <div className="space-y-1">
              {nodeDefs
                .filter((n) => n.category === cat)
                .map((def) => {
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
        ))}
      </div>

      {/* Canvas */}
      <div ref={reactFlowWrapper} className="flex-1 rounded-lg border border-zinc-800/30 bg-zinc-950/60">
        <div className="h-full w-full" onKeyDown={onKeyDown} tabIndex={0}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            colorMode="dark"
            style={{ background: "transparent" }}
            proOptions={{ hideAttribution: true }}
          >
          <Background color="#27272a" gap={20} />
          <Controls className="!bg-zinc-900 !border-zinc-800 !text-zinc-400" />
          <MiniMap
            className="!border-zinc-800 !bg-zinc-900"
            nodeColor="#27272a"
            maskColor="rgba(0,0,0,0.7)"
          />
        </ReactFlow>
        </div>
      </div>

      {/* Export buttons */}
      <div className="w-32 shrink-0 space-y-3">
        <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-3">
          <p className="mb-2 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Export</p>
          <div className="space-y-2">
            <button
              onClick={exportJSON}
              className="flex w-full items-center gap-1.5 rounded border border-zinc-800/50 bg-zinc-900/30 px-2.5 py-2 text-[11px] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
            >
              <Download className="h-3 w-3" /> JSON
            </button>
            <button
              onClick={exportN8N}
              className="flex w-full items-center gap-1.5 rounded border border-zinc-800/50 bg-zinc-900/30 px-2.5 py-2 text-[11px] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
            >
              <Download className="h-3 w-3" /> n8n
            </button>
          </div>
        </div>

        {/* Node properties */}
        {selectedNode && (
          <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-3">
            <p className="mb-2 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Selected node</p>
            <p className="text-xs text-zinc-300">{(selectedNode.data as NodeData)?.def?.label}</p>
            <p className="text-[10px] text-zinc-600 capitalize mb-2">{(selectedNode.data as NodeData)?.def?.category}</p>
            <button
              onClick={deleteSelected}
              className="flex w-full items-center justify-center gap-1 rounded border border-red-900/50 bg-red-950/20 px-2.5 py-1.5 text-[11px] text-red-400 hover:bg-red-950/40 transition-colors"
            >
              Delete
            </button>
          </div>
        )}

        <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-3">
          <p className="mb-2 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">How to use</p>
          <ul className="space-y-1.5 text-[10px] text-zinc-600 leading-relaxed">
            <li>• <span className="text-zinc-500">Add:</span> Drag a node from the left panel onto the canvas.</li>
            <li>• <span className="text-zinc-500">Connect:</span> Drag from a node&apos;s right handle (dot) to another node&apos;s left handle.</li>
            <li>• <span className="text-zinc-500">Select:</span> Click a node to see its properties panel.</li>
            <li>• <span className="text-zinc-500">Delete:</span> Select a node then press Delete/Backspace, or use the button.</li>
            <li>• <span className="text-zinc-500">Move:</span> Drag a node to reposition it on the canvas.</li>
          </ul>
        </div>

        <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-3">
          <p className="mb-2 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">About</p>
          <p className="text-[10px] text-zinc-600 leading-relaxed">
            Prototype any automation flow — test frameworks, agentic workflows, data pipelines,
            n8n orchestration, or custom tooling. Export as n8n-compatible JSON to build the real thing.
          </p>
        </div>
      </div>
    </div>
  );
}
