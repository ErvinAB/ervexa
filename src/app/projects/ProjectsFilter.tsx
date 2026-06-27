"use client";

import { useState, useMemo } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/content/projects";

interface Props {
  projects: Project[];
  allTechnologies: string[];
}

type StatusFilter = "all" | "active" | "experimental" | "in-development";

export default function ProjectsFilter({ projects, allTechnologies }: Props) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [techFilter, setTechFilter] = useState("all");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (techFilter !== "all" && !p.technologies.includes(techFilter))
        return false;
      return true;
    });
  }, [projects, statusFilter, techFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          <p className="mr-2 self-center font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
            Status
          </p>
          {(["all", "experimental", "in-development"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                statusFilter === s
                  ? "border-cyan-800/50 bg-cyan-950/20 text-cyan-400"
                  : "border-zinc-800/50 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <p className="mr-2 self-center font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
            Tech
          </p>
          <button
            onClick={() => setTechFilter("all")}
            className={`rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
              techFilter === "all"
                ? "border-cyan-800/50 bg-cyan-950/20 text-cyan-400"
                : "border-zinc-800/50 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
            }`}
          >
            All
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setTechFilter(tech)}
              className={`rounded border px-2 py-1 font-mono text-[10px] transition-colors ${
                techFilter === tech
                  ? "border-cyan-800/50 bg-cyan-950/20 text-cyan-400"
                  : "border-zinc-800/50 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-zinc-800/30 bg-zinc-900/10 p-8 text-center">
          <p className="text-sm text-zinc-500">No projects match the selected filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
