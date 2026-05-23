import { motion } from "framer-motion";
import { Atom, DatabaseZap, Layers3, ServerCog, Sparkles } from "lucide-react";
import type { SkillGroup } from "../../data/siteContent";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";

type SkillsProps = {
  groups: SkillGroup[];
};

const iconMap = {
  atom: Atom,
  layers: Layers3,
  server: ServerCog,
  database: DatabaseZap,
  sparkles: Sparkles,
};

export function Skills({ groups }: SkillsProps) {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-10" id="skills">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills / Stack"
          title="Agent、检索增强与机器人工程能力"
          description="覆盖 Agent 编排、RAG 与可观测性、ROS2/MCP 具身智能，以及嵌入式与前端交互呈现。"
        />

        <div className="mt-16 lg:hidden">
          <div className="grid gap-5">
            {groups.map((group, index) => {
              const Icon = iconMap[group.icon];

              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.52, delay: index * 0.06 }}
                >
                  <GlassCard className="rounded-[28px] p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-cyan-200" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-slate-50">
                          {group.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">{group.description}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {group.items.map((item) => (
                        <span key={item} className="chip text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-20 hidden min-h-[42rem] items-center justify-center lg:flex">
          <div className="orbit-outline absolute h-[26rem] w-[26rem] rounded-full" />
          <div className="orbit-outline absolute h-[36rem] w-[36rem] rounded-full opacity-65" />
          <div className="orbit-outline absolute h-[46rem] w-[46rem] rounded-full opacity-40" />

          <GlassCard className="relative z-10 w-[22rem] rounded-[32px] p-8 text-center">
            <p className="font-display text-xs uppercase tracking-[0.36em] text-cyan-200/70">
              Core Idea
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold text-slate-50">
              Thought
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-300">
              我希望每一条技术轨道都不是孤立的技能点，而是能相互补位、共同提高产品完成度的一整套能力。
            </p>
          </GlassCard>

          {groups.map((group, index) => {
            const Icon = iconMap[group.icon];
            const angle = (360 / groups.length) * index - 90;
            const radius = index % 2 === 0 ? 230 : 300;

            return (
              <motion.div
                key={group.title}
                className="absolute left-1/2 top-1/2 w-[18rem]"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)`,
                }}
              >
                <GlassCard className="rounded-[28px] p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-cyan-200" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-slate-50">
                        {group.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="chip text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
