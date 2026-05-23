import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, BackSide, Color, Group } from "three";
import type { ProjectItem, SceneQualityConfig } from "../../data/siteContent";
import { OrbitSatellites } from "./OrbitSatellites";

type HeroPlanetProps = {
  projects: ProjectItem[];
  quality: SceneQualityConfig;
  onSatelliteSelect: (projectId: string) => void;
};

type PlanetAssemblyProps = HeroPlanetProps & {
  reducedMotion: boolean;
};

function PlanetAssembly({
  projects,
  quality,
  onSatelliteSelect,
  reducedMotion,
}: PlanetAssemblyProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const targetY = quality.enableParallax ? state.pointer.x * 0.3 : 0.1;
    const targetX = quality.enableParallax ? state.pointer.y * 0.18 : -0.05;

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.035;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.035;

    if (!reducedMotion) {
      groupRef.current.rotation.z += delta * 0.028;
    }
  });

  const primaryGlow = new Color("#38bdf8");
  const secondaryGlow = new Color("#818cf8");

  return (
    <Float
      floatIntensity={reducedMotion ? 0 : 0.35}
      rotationIntensity={reducedMotion ? 0 : 0.1}
      speed={reducedMotion ? 0 : 1.2}
    >
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[1.38, 64, 64]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#1e293b"
            emissiveIntensity={0.55}
            metalness={0.4}
            roughness={0.62}
          />
        </mesh>

        <mesh scale={1.06}>
          <sphereGeometry args={[1.38, 48, 48]} />
          <meshBasicMaterial color="#38bdf8" opacity={0.22} transparent wireframe />
        </mesh>

        <mesh scale={1.12}>
          <sphereGeometry args={[1.42, 36, 36]} />
          <meshBasicMaterial
            blending={AdditiveBlending}
            color={primaryGlow}
            opacity={0.08}
            side={BackSide}
            transparent
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0.28, 0]}>
          <torusGeometry args={[1.95, 0.028, 20, quality.orbitSegments]} />
          <meshBasicMaterial color={primaryGlow} opacity={0.45} transparent />
        </mesh>

        <mesh rotation={[Math.PI / 2.3, 0.9, 0.48]}>
          <torusGeometry args={[2.28, 0.018, 18, quality.orbitSegments]} />
          <meshBasicMaterial color={secondaryGlow} opacity={0.22} transparent />
        </mesh>

        <Sparkles
          color="#cbd5e1"
          count={Math.max(32, Math.floor(quality.particleCount / 2))}
          opacity={0.55}
          scale={4.8}
          size={2}
          speed={quality.starSpeed * 0.75}
        />

        <OrbitSatellites
          onSatelliteSelect={onSatelliteSelect}
          orbitSegments={quality.orbitSegments}
          projects={projects}
          reducedMotion={reducedMotion}
        />
      </group>
    </Float>
  );
}

export function HeroPlanet({ projects, quality, onSatelliteSelect }: HeroPlanetProps) {
  const reducedMotion = !quality.enableParallax;

  return (
    <div className="relative mx-auto h-[26rem] w-full max-w-[44rem] sm:h-[34rem]">
      <div className="absolute inset-8 rounded-full bg-cyan-300/14 blur-[90px]" />
      <div className="absolute inset-x-12 top-8 h-28 rounded-full bg-indigo-400/18 blur-[90px]" />

      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={quality.canvasDpr}>
        <ambientLight intensity={0.7} />
        <directionalLight color="#7dd3fc" intensity={2.4} position={[4, 3, 5]} />
        <pointLight color="#818cf8" intensity={34} distance={12} position={[-4, -2, -1]} />
        <PlanetAssembly
          onSatelliteSelect={onSatelliteSelect}
          projects={projects}
          quality={quality}
          reducedMotion={reducedMotion}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-4">
        <div className="glass-panel rounded-full px-4 py-2 text-center text-xs tracking-[0.28em] text-slate-300">
          My Technology Space Station
        </div>
      </div>
    </div>
  );
}
