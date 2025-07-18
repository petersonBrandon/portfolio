// components/lesson/SectionNavigation.tsx
"use client";

import { motion } from "framer-motion";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface SectionNavigationProps {
  sections: Section[];
  currentSection: number;
  onSectionChange: (index: number) => void;
}

export default function SectionNavigation({
  sections,
  currentSection,
  onSectionChange,
}: SectionNavigationProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex space-x-2">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSectionChange(index)}
            className={`w-8 h-8 rounded-full border-2 font-bold text-xs transition-all ${
              index === currentSection
                ? "bg-cyan-400 border-black text-black"
                : "bg-gray-200 border-gray-400 text-gray-600"
            }`}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
