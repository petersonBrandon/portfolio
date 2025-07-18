"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import { CourseStructure } from "../../../lib/training/getCourseStructure";

interface AnimatedHeaderProps {
  courseStructure?: CourseStructure;
}

export default function AnimatedHeader({
  courseStructure,
}: AnimatedHeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-black border-b-4 border-cyan-400 flex-shrink-0 z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="bg-cyan-400 p-2 border-2 border-black">
              <BookOpen className="h-8 w-8 text-black" />
            </div>
            <span className="ml-4 text-xl font-black text-white uppercase tracking-wider">
              {courseStructure?.title || "Training Portal"}
            </span>
          </div>
          <Link href="/training-portal">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 bg-cyan-400 border-2 border-black text-black font-black text-sm uppercase tracking-wider hover:bg-cyan-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portal
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
