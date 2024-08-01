"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Level Up Goal Tracker",
    description:
      "An app for simplifying goal tracking and progress visualization with peer sharing capabilities.",
    imageSrc: "/Projects/Level Up logo.png",
    link: "https://www.levelupgoaltracker.com/",
  },
  {
    id: 2,
    title: "Simply Weather",
    description:
      "An open-source weather application providing current conditions and forecasts with a clean interface.",
    imageSrc: "/Projects/Simply Weather.webp",
    link: "https://github.com/petersonBrandon/simply-weather",
  },
];

export default function ProjectsPreview() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-700">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-white"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-10 rounded-lg shadow-md overflow-hidden backdrop-blur-sm"
            >
              <Image
                src={project.imageSrc}
                alt={project.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-100 transition-colors duration-300"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition duration-300"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
