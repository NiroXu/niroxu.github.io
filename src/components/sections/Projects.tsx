import { motion } from "framer-motion";
import { ArrowUpRight, Github, MoveRight } from "lucide-react";
import type { ProjectItem } from "../../data/siteContent";
import { GlassCard } from "../ui/GlassCard";
import { ProjectPreview } from "../ui/ProjectPreview";
import { SectionHeading } from "../ui/SectionHeading";

type ProjectsProps = {
  projects: ProjectItem[];
  onSelectProject: (projectId: string) => void;
};

const layoutClasses = [
  "md:col-span-7 xl:col-span-7",
  "md:col-span-5 xl:col-span-5 md:translate-y-10",
  "md:col-span-5 xl:col-span-5 xl:-translate-y-10",
  "md:col-span-7 xl:col-span-7 md:translate-y-6",
];

export function Projects({ projects, onSelectProject }: ProjectsProps) {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-10" id="projects">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects / Selected Works"
          title="做过、调试过、失败过、修好过"
          description="点击卡片可查看完详细内容！"
        />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent lg:block" />
          <div className="grid gap-6 md:grid-cols-12">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className={layoutClasses[index % layoutClasses.length]}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <GlassCard className="group h-full rounded-[32px] p-5 sm:p-6">
                  <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
                    <ProjectPreview compact className="min-h-[16rem]" project={project} />

                    <div className="flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-display text-xs uppercase tracking-[0.34em] text-cyan-200/70">
                            {project.status}
                          </p>
                          <h3 className="mt-3 font-display text-2xl font-semibold text-slate-50">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-sm text-slate-400">{project.subtitle}</p>
                          {project.awards ? (
                            <p className="mt-2 text-xs text-cyan-200/80">{project.awards}</p>
                          ) : null}
                        </div>
                        <div
                          className="h-4 w-4 shrink-0 rounded-full"
                          style={{
                            background: project.accentColor,
                            boxShadow: `0 0 26px ${project.accentColor}`,
                          }}
                        />
                      </div>

                      <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
                        {project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {project.stack.map((item) => (
                          <span key={item} className="chip text-sm">
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <button
                          id={`project-${project.id}`}
                          className="button-primary"
                          onClick={() => onSelectProject(project.id)}
                          type="button"
                        >
                          <MoveRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                          查看详情
                        </button>
                        {project.liveUrl ? (
                          <a
                            className="button-secondary"
                            href={project.liveUrl}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                            Live
                          </a>
                        ) : null}
                        <a
                          className="button-ghost"
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
                </GlassCard>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
