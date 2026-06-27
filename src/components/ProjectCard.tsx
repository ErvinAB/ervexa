import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import StatusBadge from "./StatusBadge";
import ProjectThumbnail from "./ProjectThumbnail";
import type { Project } from "@/lib/content/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group rounded-lg border border-zinc-800/50 bg-zinc-900/20 overflow-hidden transition-all hover:border-zinc-700/50 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-zinc-900/20">
      <ProjectThumbnail slug={project.slug} />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-base font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors">
            {project.title}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded bg-zinc-800/50 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="rounded bg-zinc-800/30 px-1.5 py-0.5 font-mono text-[10px] text-zinc-600">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 font-mono text-xs text-zinc-100 group-hover:text-cyan-400 transition-colors"
          >
            View Project <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
            >
              <Github className="h-3 w-3" /> Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
