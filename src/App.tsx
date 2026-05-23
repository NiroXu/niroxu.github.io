import { useState } from "react";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Navbar } from "./components/sections/Navbar";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Timeline } from "./components/sections/Timeline";
import { StarfieldCanvas } from "./components/three/StarfieldCanvas";
import { ProjectModal } from "./components/ui/ProjectModal";
import { siteContent } from "./data/siteContent";
import { useSceneQuality } from "./hooks/useSceneQuality";

function App() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const sceneQuality = useSceneQuality();
  const activeProject =
    siteContent.projects.find((project) => project.id === activeProjectId) ?? null;

  const handleSatelliteSelect = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-night-950 text-slate-50">
      <div className="pointer-events-none fixed inset-0 z-0">
        <StarfieldCanvas quality={sceneQuality} />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(56, 189, 248, 0.13), transparent 24%), radial-gradient(circle at 78% 22%, rgba(129, 140, 248, 0.12), transparent 28%), radial-gradient(circle at 50% 78%, rgba(96, 165, 250, 0.1), transparent 24%)",
          opacity: sceneQuality.blurOpacity,
        }}
      />
      <div className="particle-mist pointer-events-none fixed inset-0 z-[2]" />
      <div className="cosmic-grid pointer-events-none fixed inset-0 z-[3] opacity-50" />

      <Navbar
        englishRole={siteContent.profile.englishRole}
        name={siteContent.profile.name}
        navItems={siteContent.navItems}
        contactLinks={siteContent.contactLinks}
      />

      <main className="relative z-10">
        <Hero
          ctas={siteContent.heroCtas}
          featuredProjects={siteContent.projects.filter((project) => project.featured)}
          profile={siteContent.profile}
          quality={sceneQuality}
          onSatelliteSelect={handleSatelliteSelect}
        />
        <About cards={siteContent.aboutCards} />
        <Projects projects={siteContent.projects} onSelectProject={setActiveProjectId} />
        <Skills groups={siteContent.skillGroups} />
        <Timeline items={siteContent.timeline} />
        <Contact
          contactLinks={siteContent.contactLinks}
          profile={siteContent.profile}
        />
      </main>

      <ProjectModal project={activeProject} onClose={() => setActiveProjectId(null)} />
    </div>
  );
}

export default App;
