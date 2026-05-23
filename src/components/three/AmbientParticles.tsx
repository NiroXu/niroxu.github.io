import { Sparkles } from "@react-three/drei";
import type { SceneQualityConfig } from "../../data/siteContent";

type AmbientParticlesProps = {
  quality: SceneQualityConfig;
};

export function AmbientParticles({ quality }: AmbientParticlesProps) {
  return (
    <>
      <Sparkles
        color="#cbd5e1"
        count={quality.particleCount}
        opacity={0.55}
        scale={quality.particleScale}
        size={1.8}
        speed={quality.starSpeed * 0.85}
      />
      <Sparkles
        color="#7dd3fc"
        count={Math.max(12, Math.floor(quality.particleCount / 3))}
        opacity={0.25}
        scale={quality.particleScale * 0.65}
        size={2.6}
        speed={quality.starSpeed * 0.55}
      />
    </>
  );
}
