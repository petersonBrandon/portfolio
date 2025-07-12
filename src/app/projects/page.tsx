// app/projects/page.tsx
"use client";

import { PageContent, TerminalPrompt } from "@/components/PageContent";
import { useState, useEffect } from "react";

interface ProjectCardProps {
  project: {
    title: string;
    classification: string;
    status: string;
    statusColor: string;
    description: string;
    tech: string[];
    metrics: string[];
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200 + index * 200); // Base delay + staggered delay

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`border border-cyan-400 border-opacity-30 bg-black bg-opacity-40 p-6 rounded transition-all duration-800 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-cyan-400 text-xl font-bold">{project.title}</h3>
          <div className="text-orange-400 text-sm">
            Classification: {project.classification}
          </div>
        </div>
        <div className={`${project.statusColor} text-sm`}>
          STATUS: {project.status}
        </div>
      </div>
      <div className="text-gray-300 mb-4">{project.description}</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, techIndex) => (
          <span
            key={techIndex}
            className="bg-cyan-400 bg-opacity-20 text-cyan-300 px-2 py-1 rounded text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="text-xs text-gray-500">
        {project.metrics.map((metric, metricIndex) => (
          <div key={metricIndex}>{metric}</div>
        ))}
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [showClassified, setShowClassified] = useState(false);

  const content = `> Accessing mission logs...
> Decrypting project archives...
> Loading deployment history...

MISSION LOG DATABASE: ✓ LOADED
ACTIVE PROJECTS: 7
COMPLETED MISSIONS: 23
SUCCESS RATE: ███████████ 96.7%`;

  const projects = [
    {
      title: "NEXUS-7 Testing Framework",
      classification: "ALPHA-PRIORITY",
      status: "ACTIVE",
      statusColor: "text-green-400",
      description:
        "Advanced automation framework for quantum-level testing protocols. Implements AI-driven test case generation with 99.3% bug detection accuracy.",
      tech: ["Python", "Selenium", "AI/ML", "Docker"],
      metrics: [
        "Mission Duration: 8 months",
        "Team Size: 4 engineers",
        "Deploy Status: Production Ready",
      ],
    },
    {
      title: "Quantum E-Commerce Platform",
      classification: "BETA-SECURE",
      status: "DEPLOYED",
      statusColor: "text-green-400",
      description:
        "Full-stack e-commerce solution with integrated payment processing and real-time inventory management. Handles 10K+ concurrent users.",
      tech: ["React", "Node.js", "PostgreSQL", "AWS"],
      metrics: [
        "Mission Duration: 6 months",
        "Team Size: 6 engineers",
        "Performance: 99.9% uptime",
      ],
    },
    {
      title: "Neural API Gateway",
      classification: "GAMMA-EXPERIMENTAL",
      status: "TESTING",
      statusColor: "text-yellow-400",
      description:
        "Microservices architecture with intelligent load balancing and self-healing capabilities. Features quantum-encrypted data transmission.",
      tech: ["Go", "Kubernetes", "gRPC", "Redis"],
      metrics: [
        "Mission Duration: 4 months",
        "Team Size: 3 engineers",
        "Test Coverage: 94.2%",
      ],
    },
    {
      title: "Cybersecurity Audit Engine",
      classification: "DELTA-CLASSIFIED",
      status: "COMPLETED",
      statusColor: "text-green-400",
      description:
        "Automated security testing suite for enterprise applications. Identifies vulnerabilities with machine learning pattern recognition.",
      tech: ["Python", "TensorFlow", "OWASP", "Jenkins"],
      metrics: [
        "Mission Duration: 5 months",
        "Team Size: 2 engineers",
        "Threats Detected: 1,247 vulnerabilities",
      ],
    },
    {
      title: "Holographic Data Visualizer",
      classification: "EPSILON-RESEARCH",
      status: "ARCHIVED",
      statusColor: "text-red-400",
      description:
        "Interactive 3D data visualization platform for complex testing metrics. Features real-time performance monitoring and predictive analytics.",
      tech: ["Three.js", "D3.js", "WebGL", "MongoDB"],
      metrics: [
        "Mission Duration: 3 months",
        "Team Size: 5 engineers",
        "Archive Reason: Budget constraints",
      ],
    },
  ];

  // Show classified section after all projects
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowClassified(true);
    }, 200 + projects.length * 200 + 100); // After all projects + small buffer

    return () => clearTimeout(timer);
  }, [projects.length]);

  return (
    <PageContent title="MISSION LOGS - PROJECT ARCHIVE">
      <div className="space-y-6 mb-8">
        <TerminalPrompt delay={200}>{content}</TerminalPrompt>

        <div className="mt-8 space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}

          {/* Classified Projects Section */}
          <div
            className={`p-4 border border-orange-400 border-opacity-30 bg-orange-400 bg-opacity-10 rounded transition-all duration-800 ease-out transform ${
              showClassified
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="text-orange-400 text-sm font-bold mb-2">
              CLASSIFIED PROJECTS:
            </div>
            <div className="text-gray-300 text-sm">
              Additional high-security projects available upon clearance
              verification. Contact system administrator for access credentials.
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
}
