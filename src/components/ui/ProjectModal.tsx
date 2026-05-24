import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { getProjectAssets } from "../../data/projectAssets";
import type { ProjectItem } from "../../data/siteContent";
import { ProjectPreview } from "./ProjectPreview";

type ProjectModalProps = {
  project: ProjectItem | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const detailMedia = project ? getProjectAssets(project.id)?.detailMedia ?? [] : [];

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/78 px-4 py-6 backdrop-blur-xl md:items-center md:px-8"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glass-panel relative w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)] md:p-6 lg:p-7"
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeButtonRef}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-slate-100 transition hover:border-cyan-300/50 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mt-10 max-h-[82vh] overflow-y-auto overscroll-contain pr-1 md:max-h-[78vh] md:pr-2">
              <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
                <div>
                  <ProjectPreview project={project} tall />
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.metrics?.map((metric) => (
                      <span key={metric} className="chip text-sm">
                        {metric}
                      </span>
                    ))}
                  </div>
                  {detailMedia.length > 0 ? (
                    <div className="mt-8 space-y-5">
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                        Media
                      </p>
                      {detailMedia.map((media) => (
                        <div key={`${media.kind}-${media.src}`} className="space-y-3">
                          <p className="text-sm font-medium text-slate-300">{media.label}</p>
                          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/70">
                            {media.kind === "video" ? (
                              <video
                                className="block aspect-video w-full bg-slate-950"
                                controls
                                playsInline
                                poster={media.poster}
                                preload="metadata"
                              >
                                <source src={media.src} />
                                抱歉，当前浏览器不支持该视频播放。
                              </video>
                            ) : (
                              <img
                                alt={media.alt}
                                className="block h-auto w-full object-cover"
                                loading="lazy"
                                src={media.src}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <p className="font-display text-xs uppercase tracking-[0.38em] text-cyan-200/70">
                      Project Detail
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <h3
                        id="project-dialog-title"
                        className="font-display text-3xl font-semibold text-slate-50"
                      >
                        {project.title}
                      </h3>
                      {project.status ? (
                        <span
                          className="rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.24em]"
                          style={{
                            borderColor: `${project.accentColor}50`,
                            backgroundColor: `${project.accentColor}15`,
                            color: project.accentColor,
                          }}
                        >
                          {project.status}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-base text-slate-300">{project.subtitle}</p>
                    {project.awards ? (
                      <p
                        className="mt-4 inline-flex rounded-full border px-3 py-1 text-sm text-slate-200"
                        style={{
                          borderColor: `${project.accentColor}40`,
                          backgroundColor: `${project.accentColor}12`,
                        }}
                      >
                        {project.awards}
                      </p>
                    ) : null}
                    <p className="mt-6 text-base leading-8 text-slate-300">
                      {project.description}
                    </p>
                    {project.highlights && project.highlights.length > 0 ? (
                      <ul className="mt-6 space-y-3 text-base leading-8 text-slate-300">
                        {project.highlights.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: project.accentColor }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <div className="mt-8">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                      Stack
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {project.stack.map((item) => (
                        <span key={item} className="chip text-sm">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      {project.liveUrl ? (
                        <a
                          className="button-primary"
                          href={project.liveUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          Live Demo
                        </a>
                      ) : null}
                      <a
                        className={project.liveUrl ? "button-secondary" : "button-primary"}
                        href={project.githubUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
