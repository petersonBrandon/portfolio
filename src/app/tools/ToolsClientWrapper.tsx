"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaChevronRight, FaTools } from "react-icons/fa";

interface Tool {
  name: string;
  link: string;
  category: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const formatText = (text: string) => {
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ToolCard: React.FC<Tool> = ({ name, link, category }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <Link
        href={link}
        className="p-4 h-full group flex flex-col justify-between"
      >
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl font-bold text-white capitalize group-hover:text-blue-300 transition-colors duration-300">
            {formatText(name)}
          </h2>
          <FaTools className="text-blue-400 text-2xl group-hover:text-blue-300 transition-colors duration-300" />
        </div>
        <div className="mt-2 text-sm text-white py-1 px-2 bg-blue-500 rounded-full w-fit">
          {formatText(category)}
        </div>
      </Link>
    </div>
  );
};

export function ToolsClientWrapper({
  tools,
  categories,
}: {
  tools: Tool[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const categoryMatch =
        selectedCategory === "All" || tool.category === selectedCategory;
      const searchMatch = formatText(tool.name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [tools, selectedCategory, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 rounded-full px-6 py-3 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-full transition-colors duration-300 ${
            selectedCategory === "All"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {formatText(category)}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {isClient && (
          <motion.section
            key={selectedCategory + searchTerm}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredTools.map((tool) => (
              <ToolCard key={tool.link} {...tool} />
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
