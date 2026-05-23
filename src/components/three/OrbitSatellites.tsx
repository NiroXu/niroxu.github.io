import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, Mesh } from "three";
import type { ProjectItem } from "../../data/siteContent";

type OrbitSatellitesProps = {
  orbitSegments: number;
  projects: ProjectItem[];
  onSatelliteSelect: (projectId: string) => void;
  reducedMotion: boolean;
};

function getCompactOrbitLabel(project: ProjectItem) {
  if (project.status) {
    return project.status;
  }

  if (project.stack.length > 0) {
    return project.stack[0];
  }

  return project.title.replace(/\s+/g, " ").trim();
}

export function OrbitSatellites({
  orbitSegments,
  projects,
  onSatelliteSelect,
  reducedMotion,
}: OrbitSatellitesProps) {
  const satelliteRefs = useRef<Array<Mesh | null>>([]);
  const orbitRingRefs = useRef<Array<Mesh | null>>([]);

  useFrame(({ clock }, delta) => {
    const elapsed = reducedMotion ? 0 : clock.getElapsedTime();

    satelliteRefs.current.forEach((satellite, index) => {
      if (!satellite) {
        return;
      }

      const radius = 2.25 + index * 0.48;
      const baseAngle = (Math.PI * 2 * index) / Math.max(projects.length, 1);
      const speed = 0.18 + index * 0.05;
      const angle = baseAngle + elapsed * speed;

      satellite.position.set(
        Math.cos(angle) * radius,
        Math.sin(elapsed * (0.8 + index * 0.16)) * 0.14,
        Math.sin(angle) * radius,
      );
      satellite.rotation.y += delta * 1.5;
    });

    orbitRingRefs.current.forEach((ring, index) => {
      if (!ring || reducedMotion) {
        return;
      }

      ring.rotation.z += delta * (0.03 + index * 0.008);
    });
  });

  return (
    <group>
      {projects.map((project, index) => {
        const orbitRadius = 2.25 + index * 0.48;
        const color = new Color(project.accentColor);
        const orbitLabel = getCompactOrbitLabel(project);

        return (
          <group key={project.id}>
            <mesh
              ref={(node) => {
                orbitRingRefs.current[index] = node;
              }}
              rotation={[Math.PI / 2, 0.35 + index * 0.22, index * 0.4]}
            >
              <torusGeometry args={[orbitRadius, 0.012, 12, orbitSegments]} />
              <meshBasicMaterial
                color={color}
                opacity={0.17}
                transparent
              />
            </mesh>

            <mesh
              ref={(node) => {
                satelliteRefs.current[index] = node;
              }}
              onClick={() => onSatelliteSelect(project.id)}
              onPointerOut={() => {
                document.body.style.cursor = "";
              }}
              onPointerOver={() => {
                document.body.style.cursor = "pointer";
              }}
            >
              <sphereGeometry args={[0.11 + index * 0.02, 24, 24]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.2}
                metalness={0.55}
                roughness={0.18}
              />
              <mesh scale={1.8}>
                <sphereGeometry args={[0.11 + index * 0.02, 18, 18]} />
                <meshBasicMaterial color={color} opacity={0.12} transparent />
              </mesh>
              <Html center distanceFactor={10} position={[0, 0.24, 0]}>
                <button
                  className="hidden whitespace-nowrap rounded-full border border-white/10 bg-slate-950/76 px-2 py-[0.3rem] text-[9px] font-medium leading-none tracking-[0.08em] text-slate-100 shadow-xl backdrop-blur md:block"
                  onClick={() => onSatelliteSelect(project.id)}
                  title={project.title}
                  type="button"
                >
                  {orbitLabel}
                </button>
              </Html>
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
