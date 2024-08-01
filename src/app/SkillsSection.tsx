// app/SkillsSection.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  FaJava,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaReact,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiJira,
  SiPostgresql,
} from "react-icons/si";
import { BsKanban } from "react-icons/bs";
import { TbStack2 } from "react-icons/tb";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Java", icon: FaJava, color: "#007396" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "HTML", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
      { name: "Python", icon: FaPython, color: "#3776AB" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React & React Native", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "Jira", icon: SiJira, color: "#0052CC" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "NoSQL", icon: FaDatabase, color: "#4DB33D" },
    ],
  },
  {
    title: "Development Methodologies",
    skills: [
      { name: "Agile", icon: BsKanban, color: "#009CA8" },
      { name: "Scrum", icon: BsKanban, color: "#8A9B9F" },
    ],
  },
  {
    title: "General",
    skills: [
      { name: "Full Stack Development", icon: TbStack2, color: "#FF6B6B" },
      { name: "Object Oriented Development", icon: TbStack2, color: "#4ECDC4" },
      { name: "Team Collaboration", icon: TbStack2, color: "#45B7D1" },
    ],
  },
];

const SkillIcon = ({
  icon: Icon,
  name,
  color,
  index,
}: {
  icon: IconType;
  name: string;
  color: string;
  index: number;
}) => (
  <motion.div
    className="flex flex-col items-center justify-center bg-white text-black rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring" }}
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="text-6xl mb-2" style={{ color }} />
    <span className="text-md text-center font-medium">{name}</span>
  </motion.div>
);

export default function SkillsSection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-16 text-center bg-clip-text"
        >
          My Skills
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-300">
                {category.title}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillIcon key={skill.name} {...skill} index={skillIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
