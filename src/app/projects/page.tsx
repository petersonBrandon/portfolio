"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";
import Wave from "react-wavify";
import { Metadata } from "next";

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const projects = [
    {
      title: "Level Up Goal Tracker",
      imageSrc: "/Projects/Level Up logo.png",
      description:
        "An app aimed at simplifying goal tracking and progress visualization, with built-in sharing capabilities among peers. My involvement began with designing and developing the initial prototype as a proof of concept. Presently, we're focused on rebranding for the official product launch, and I currently have been focusing on the aligning the Level Up Goal Tracker website with the new brand design we have.",
      link: "https://www.levelupgoaltracker.com/",
      technologies: ["React Native", "Firebase", "Redux", "NEXT.js", "React"],
    },
    {
      title: "Simply Weather",
      imageSrc: "/Projects/Simply Weather.webp",
      description:
        "A complimentary, open-source weather application I developed to delve into React Native. It provides users with current weather conditions and forecasts in a clean, intuitive interface.",
      link: "https://github.com/petersonBrandon/simply-weather",
      technologies: ["React Native", "OpenWeatherMap API", "Expo"],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-700 pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden h-full w-full bottom-0 flex justify-center items-end">
        <Wave
          fill="#111827"
          paused={false}
          style={{ display: "flex", height: "75%" }}
          options={{
            height: 40,
            amplitude: 40,
            speed: 0.15,
            points: 4,
          }}
        />
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 py-16 text-white"
      >
        <motion.section
          variants={itemVariants}
          className="flex flex-col items-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-8">Projects</h1>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </motion.section>
      </motion.main>
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  imageSrc: string;
  description: string;
  link: string;
  technologies: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  imageSrc,
  description,
  link,
  technologies,
}) => {
  return (
    <motion.div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
        <div className="relative w-full md:w-1/3">
          <Image
            src={imageSrc}
            alt={`${title} preview`}
            width={300}
            height={300}
            className="rounded-lg w-full h-auto"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              <span>View Project</span>
              <TbExternalLink size={20} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-full md:w-2/3">
          <h2 className="text-2xl font-bold">{title}</h2>
          <motion.div initial={false} className="overflow-hidden">
            <p className="text-lg">{description}</p>
          </motion.div>
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-blue-700 text-blue-100 text-sm font-semibold px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
