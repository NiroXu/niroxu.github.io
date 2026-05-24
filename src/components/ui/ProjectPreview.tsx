import type { CSSProperties } from "react";
import { getProjectAssets } from "../../data/projectAssets";
import type { ProjectItem } from "../../data/siteContent";

type ProjectPreviewProps = {
  project: ProjectItem;
  compact?: boolean;
  tall?: boolean;
  className?: string;
};

function getPreviewBackground(project: ProjectItem) {
  switch (project.previewType) {
    case "signal":
      return `radial-gradient(circle at 30% 24%, ${project.accentColor}40, transparent 28%), linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.92))`;
    case "orbit":
      return `radial-gradient(circle at 65% 32%, ${project.accentColor}38, transparent 24%), linear-gradient(160deg, rgba(15, 23, 42, 0.96), rgba(3, 7, 18, 0.96))`;
    case "matrix":
      return `radial-gradient(circle at 50% 50%, ${project.accentColor}2e, transparent 38%), linear-gradient(180deg, rgba(4, 8, 22, 0.96), rgba(2, 6, 23, 0.98))`;
    case "nebula":
    default:
      return `radial-gradient(circle at 32% 28%, ${project.accentColor}4d, transparent 26%), radial-gradient(circle at 72% 68%, rgba(129, 140, 248, 0.22), transparent 28%), linear-gradient(155deg, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.96))`;
  }
}

export function ProjectPreview({
  project,
  compact = false,
  tall = false,
  className = "",
}: ProjectPreviewProps) {
  const resolvedImage = getProjectAssets(project.id)?.coverImage ?? project.image;
  const isPortraitProject = project.id === "greenhouse-phenotyping-robot";
  const showCenterOrb = !resolvedImage;
  const previewStyle: CSSProperties = {
    background: getPreviewBackground(project),
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 60px ${project.accentColor}20`,
  };

  return (
    <div
      className={`relative isolate overflow-hidden rounded-[28px] border border-white/10 ${compact ? "h-44 sm:h-52" : tall ? "h-60 md:h-[21rem]" : "h-64"} ${className}`}
      style={previewStyle}
    >
      {resolvedImage ? (
        <>
          <img
            alt={project.title}
            className={`absolute inset-0 z-0 h-full w-full ${isPortraitProject ? "object-contain p-3 sm:p-4" : "object-cover"}`}
            src={resolvedImage}
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />
        </>
      ) : null}
      {showCenterOrb ? (
        <>
          <div
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: `${project.accentColor}7a` }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/70"
            style={{ boxShadow: `0 0 50px ${project.accentColor}40` }}
          />
        </>
      ) : null}

      {project.previewType === "orbit" && (
        <>
          <div className="orbit-outline absolute inset-x-6 top-1/2 h-28 -translate-y-1/2 rounded-full" />
          <div className="orbit-outline absolute inset-x-12 top-1/2 h-16 -translate-y-1/2 rounded-full" />
        </>
      )}

      {project.previewType === "signal" && (
        <div className="absolute inset-x-8 bottom-8 flex items-end gap-2">
          {[26, 48, 74, 42, 62, 32].map((height) => (
            <div
              key={height}
              className="flex-1 rounded-full bg-gradient-to-t from-white/10 to-transparent"
              style={{
                height,
                boxShadow: `0 0 14px ${project.accentColor}4d`,
              }}
            />
          ))}
        </div>
      )}

      {project.previewType === "matrix" && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-55" />
      )}

      {project.previewType === "nebula" && (
        <>
          <div className="absolute left-10 top-10 h-28 w-28 rounded-full border border-white/6 blur-sm" />
          <div className="absolute right-10 top-12 h-6 w-6 rounded-full bg-white/55 shadow-[0_0_26px_rgba(255,255,255,0.8)]" />
          <div className="absolute bottom-10 left-14 h-3 w-3 rounded-full bg-cyan-200/75 shadow-[0_0_22px_rgba(125,211,252,0.9)]" />
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
      <div className="absolute bottom-5 left-5">
        <p className="font-display text-[0.65rem] uppercase tracking-[0.36em] text-slate-400/80">
          {project.subtitle}
        </p>
      </div>
    </div>
  );
}
