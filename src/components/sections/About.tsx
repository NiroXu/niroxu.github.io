import { motion } from "framer-motion";
import type { AboutCard as AboutCardType } from "../../data/siteContent";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";

type AboutProps = {
  cards: AboutCardType[];
};

export function About({ cards }: AboutProps) {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-10" id="about">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About / Profile"
          title="AI Agent、机器人与真实世界工程"
          description="从 Agent 工作流到嵌入式整机联调，我关注的是系统能否跑通、能否定位问题、能否在真实场景里落地。"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <GlassCard className="h-full rounded-[30px] p-7 sm:p-8">
                <p className="font-display text-xs uppercase tracking-[0.36em] text-cyan-200/70">
                  {card.eyebrow}
                </p>
                <h3 className="mt-5 font-display text-2xl font-semibold text-slate-50">
                  {card.title}
                </h3>
                <p className="mt-5 text-base leading-8 text-slate-300">{card.description}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {card.highlights.map((highlight) => (
                    <span key={highlight} className="chip text-sm">
                      {highlight}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
