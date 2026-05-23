import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import type { SceneQualityConfig } from "../../data/siteContent";
import { AmbientParticles } from "./AmbientParticles";

type StarfieldCanvasProps = {
  quality: SceneQualityConfig;
};

function BackgroundRig({ quality }: StarfieldCanvasProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const targetX = quality.enableParallax ? state.pointer.y * 0.08 : 0;
    const targetY = quality.enableParallax ? state.pointer.x * 0.12 : 0;

    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={120}
        depth={quality.starsDepth}
        count={quality.starsCount}
        factor={quality.starsFactor}
        saturation={0}
        fade
        speed={quality.starSpeed}
      />
      <AmbientParticles quality={quality} />
    </group>
  );
}

export function StarfieldCanvas({ quality }: StarfieldCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      dpr={quality.canvasDpr}
      gl={{ alpha: true, antialias: false }}
    >
      <color attach="background" args={["#020617"]} />
      <BackgroundRig quality={quality} />
    </Canvas>
  );
}
