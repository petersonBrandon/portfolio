"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NonCourseLayoutProps {
  children: ReactNode;
}

export default function NonCourseLayout({ children }: NonCourseLayoutProps) {
  return (
    <main className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </main>
  );
}
