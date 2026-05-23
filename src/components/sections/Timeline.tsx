import { motion } from "framer-motion";
import type { TimelineItem } from "../../data/siteContent";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-10" id="experience">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Milestones / Honors"
          title="我的经历"
          description="一些获奖经历的时间线，也是我走来的脚印…………"
        />

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/55 to-cyan-300/0 md:left-1/2" />

          {items.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                className={`relative mb-10 md:w-1/2 ${isLeft ? "md:pr-16" : "md:ml-auto md:pl-16"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <span
                  className={`absolute left-[0.15rem] top-10 z-10 h-5 w-5 rounded-full border border-cyan-200/45 bg-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.55)] md:left-auto ${
                    isLeft ? "md:right-[-0.62rem]" : "md:left-[-0.62rem]"
                  }`}
                />

                <div className="ml-10 md:ml-0">
                  <GlassCard className="rounded-[30px] p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
                        {item.period}
                      </span>
                      <p className="text-sm text-slate-400">{item.company}</p>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-semibold text-slate-50">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-base leading-8 text-slate-300">{item.description}</p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {item.tags.map((tag) => (
                        <span key={tag} className="chip text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
