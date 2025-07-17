"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CourseStructure } from "../../../lib/training/getCourseStructure";

interface CourseNavigationSidebarProps {
  courseStructure: CourseStructure;
  currentPath: string;
}

export default function CourseNavigationSidebar({
  courseStructure,
  currentPath,
}: CourseNavigationSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => {
    // Auto-expand module containing current lesson
    const currentModule = courseStructure.modules.find((module) =>
      module.lessons.some((lesson) => currentPath.includes(lesson.slug))
    );
    return currentModule ? new Set([currentModule.slug]) : new Set();
  });

  const toggleModule = (moduleSlug: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleSlug)) {
        newSet.delete(moduleSlug);
      } else {
        newSet.add(moduleSlug);
      }
      return newSet;
    });
  };

  const isLessonActive = (lessonPath: string) => currentPath === lessonPath;

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-80 bg-white border-r-4 border-black min-h-[calc(100vh-4rem)] overflow-y-auto"
    >
      <nav className="p-6">
        <div className="mb-6">
          <div className="bg-gray-100 border-2 border-black p-4">
            <h2 className="font-black text-sm uppercase tracking-wider text-gray-800 mb-2">
              Course Navigation
            </h2>
            <p className="text-xs text-gray-600 uppercase tracking-wider">
              {courseStructure.category} • {courseStructure.modules.length}{" "}
              Modules
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {courseStructure.modules.map((module) => (
            <div key={module.slug} className="border-2 border-gray-300">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleModule(module.slug)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <span className="font-black text-sm uppercase tracking-wider text-gray-800">
                    Module {module.order} - {module.title}
                  </span>
                </div>
                <motion.div
                  animate={{
                    rotate: expandedModules.has(module.slug) ? 90 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedModules.has(module.slug) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white">
                      {module.lessons.map((lesson) => (
                        <Link key={lesson.slug} href={lesson.path}>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`flex items-center p-3 pl-6 border-b border-gray-200 last:border-b-0 transition-all duration-200 ${
                              isLessonActive(lesson.path)
                                ? "bg-cyan-400 text-black border-l-4 border-l-black"
                                : "hover:bg-gray-50 text-gray-700"
                            }`}
                          >
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-xs font-black">
                              {lesson.order}
                            </div>
                            <span className="font-medium text-sm">
                              {lesson.title}
                            </span>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </nav>
    </motion.aside>
  );
}
