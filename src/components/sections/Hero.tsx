import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, MoveRight, Sparkles } from "lucide-react";
import type { HeroCTA, ProjectItem, SceneQualityConfig, SiteProfile } from "../../data/siteContent";
import { HeroPlanet } from "../three/HeroPlanet";

type HeroProps = {
  profile: SiteProfile;
  ctas: HeroCTA[];
  featuredProjects: ProjectItem[];
  quality: SceneQualityConfig;
  onSatelliteSelect: (projectId: string) => void;
};

function getButtonClass(variant: HeroCTA["variant"]) {
  if (variant === "primary") {
    return "button-primary";
  }

  if (variant === "secondary") {
    return "button-secondary";
  }

  return "button-ghost";
}

export function Hero({
  profile,
  ctas,
  featuredProjects,
  quality,
  onSatelliteSelect,
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 20, mass: 0.45 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 20, mass: 0.45 });
  const contentX = useTransform(
    springX,
    [-1, 1],
    quality.enableParallax ? [-quality.parallaxIntensity, quality.parallaxIntensity] : [0, 0],
  );
  const contentY = useTransform(
    springY,
    [-1, 1],
    quality.enableParallax ? [-quality.parallaxIntensity * 0.65, quality.parallaxIntensity * 0.65] : [0, 0],
  );
  const visualX = useTransform(
    springX,
    [-1, 1],
    quality.enableParallax ? [quality.parallaxIntensity * 0.45, -quality.parallaxIntensity * 0.45] : [0, 0],
  );
  const visualY = useTransform(
    springY,
    [-1, 1],
    quality.enableParallax ? [quality.parallaxIntensity * 0.3, -quality.parallaxIntensity * 0.3] : [0, 0],
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || !quality.enableParallax) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    pointerX.set(x);
    pointerY.set(y);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-10"
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(56,189,248,0.16),transparent_24%),radial-gradient(circle_at_82%_34%,rgba(129,140,248,0.14),transparent_26%),radial-gradient(circle_at_54%_86%,rgba(192,132,252,0.1),transparent_18%)]" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: contentX, y: contentY }}
        >
          <div className="glass-panel inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm text-cyan-100/90">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span>{profile.heroEyebrow}</span>
          </div>

          <p className="mt-6 font-display text-sm uppercase tracking-[0.36em] text-slate-400">
            {profile.role} / {profile.englishRole}
          </p>
          <h1 className="text-glow mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {profile.headline}
          </h1>
          <p className="mt-5 text-xl leading-8 text-slate-200 sm:text-2xl sm:leading-9">
            {profile.subheadline}
          </p>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            {profile.description}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {profile.focusAreas.map((item) => (
              <span key={item} className="chip text-sm">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {ctas.map((cta) => (
              <a
                key={cta.label}
                className={getButtonClass(cta.variant)}
                href={cta.href}
                rel={cta.external ? "noreferrer" : undefined}
                target={cta.external ? "_blank" : undefined}
              >
                {cta.external ? <ArrowUpRight className="h-4 w-4" /> : <MoveRight className="h-4 w-4" />}
                {cta.label}
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="glass-panel rounded-[24px] p-5">
              <p className="text-xs uppercase tracking-[0.34em] text-slate-400">My Iinteresting</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{profile.availability}</p>
            </div>
            <div className="glass-panel rounded-[24px] p-5">
              <p className="text-xs uppercase tracking-[0.34em] text-slate-400">My Iinteresting</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{profile.location}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: visualX, y: visualY }}
        >
          <HeroPlanet
            projects={featuredProjects.slice(0, 4)}
            quality={quality}
            onSatelliteSelect={onSatelliteSelect}
          />
        </motion.div>
      </div>
    </section>
  );
}
