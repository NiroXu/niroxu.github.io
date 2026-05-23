import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import type { ContactLink, SiteProfile } from "../../data/siteContent";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";

type ContactProps = {
  profile: SiteProfile;
  contactLinks: ContactLink[];
};

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Contact({ profile, contactLinks }: ContactProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-24 sm:px-6 lg:px-10" id="contact">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(125,211,252,0.15),transparent_24%),radial-gradient(circle_at_48%_58%,rgba(129,140,248,0.18),transparent_18%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow="Contact"
          title="欢迎交流 Agent 与机器人相关合作"
          description="如果你对 Agent 工作流、RAG、MCP 或机器人系统工程有兴趣，欢迎通过 GitHub 联系我。"
        />

        <motion.div
          className="relative mx-auto mt-16 max-w-4xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div className="absolute left-1/2 top-12 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-[110px]" />
          <div className="absolute left-1/2 top-20 h-24 w-24 -translate-x-1/2 rounded-full bg-indigo-400/20 blur-[70px]" />

          <GlassCard className="relative rounded-[34px] px-6 py-10 text-center sm:px-10 sm:py-12">
            <p className="font-display text-sm uppercase tracking-[0.36em] text-cyan-200/70">
              {profile.name}
            </p>
            <h3 className="mt-5 font-display text-3xl font-semibold text-slate-50 sm:text-4xl">
              或许可以在这联系到我？
            </h3>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
              GitHub暂时未开源项目，别跑空啦~
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {contactLinks.map((link) => {
                const Icon = iconMap[link.icon];

                return (
                  <a
                    key={link.label}
                    className="group"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <GlassCard className="h-full rounded-[26px] p-5 text-left">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                          <Icon className="h-5 w-5 text-cyan-200" />
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-100" />
                      </div>
                      <h4 className="mt-5 font-display text-xl font-semibold text-slate-50">
                        {link.label}
                      </h4>
                      <p className="mt-3 text-sm leading-7 text-slate-400">{link.note}</p>
                    </GlassCard>
                  </a>
                );
              })}
            </div>

            <div className="mt-10 text-sm text-slate-500">
              欢迎志同道合的朋友们！
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
