// components/lesson/LessonLayout.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import ProgressBar from "./ProgressBar";
import SectionNavigation from "./SectionNavigation";
import Link from "next/link";
import { LessonLayoutProps } from "../../../types/lesson";

export default function LessonLayout({
  lessonTitle,
  moduleTitle,
  lessonNumber,
  moduleNumber,
  sections,
  currentSection,
  onSectionChange,
  children,
  isLessonComplete = false,
  onContinue,
  completionMessage = "Great Job!",
}: LessonLayoutProps) {
  const handlePrevious = () => {
    onSectionChange(Math.max(0, currentSection - 1));
  };

  const handleNext = () => {
    onSectionChange(Math.min(sections.length - 1, currentSection + 1));
  };

  const isFirstSection = currentSection === 0;
  const isLastSection = currentSection === sections.length - 1;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-100 border-2 border-black p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">
              Module {moduleNumber} • Lesson {lessonNumber}
            </p>
            <h1 className="font-black text-2xl uppercase tracking-wider text-gray-800">
              {lessonTitle}
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 uppercase tracking-wider">
              {moduleTitle}
            </p>
          </div>
        </div>

        <ProgressBar current={currentSection + 1} total={sections.length} />

        <p className="text-xs text-gray-600 mt-2 uppercase tracking-wider">
          Section {currentSection + 1} of {sections.length}
        </p>
      </motion.div>

      {/* Navigation */}
      <SectionNavigation
        sections={sections}
        currentSection={currentSection}
        onSectionChange={onSectionChange}
      />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          disabled={isFirstSection}
          className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-20 text-black font-bold py-3 px-6 border-2 border-black uppercase tracking-wider text-sm transition-all"
        >
          Previous
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={isLastSection}
          className="bg-cyan-400 hover:bg-cyan-500 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-20 text-black font-bold py-3 px-6 border-2 border-black uppercase tracking-wider text-sm transition-all flex items-center"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </motion.button>
      </div>

      {/* Lesson completion indicator */}
      {isLessonComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-green-100 border-2 border-green-400 p-6 text-center"
        >
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-black text-lg uppercase tracking-wider mb-2">
            Lesson Complete!
          </h3>
          <p className="text-sm text-gray-700 mb-4">{completionMessage}</p>
          {onContinue && (
            <Link href={onContinue}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-400 hover:bg-green-500 text-black font-bold py-3 px-6 border-2 border-black uppercase tracking-wider text-sm transition-all"
              >
                Continue to Next Lesson
              </motion.div>
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}
