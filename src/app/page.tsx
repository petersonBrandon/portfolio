// app/page.tsx
import { Suspense } from "react";
import HeroSection from "./HeroSection";
import SkillsSection from "./SkillsSection";
import ProjectsPreview from "./ProjectsPreview";

export const metadata = {
  title: "Brandon Peterson - Full Stack Developer",
  description:
    "Portfolio of Brandon Peterson, a Software Engineer, Optimization Strategist, and Analytical Problem Solver.",
};

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <SkillsSection />
      <ProjectsPreview />
    </main>
  );
}
