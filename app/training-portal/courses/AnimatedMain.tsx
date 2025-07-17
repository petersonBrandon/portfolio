"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedMainProps {
  children: ReactNode;
}

export default function AnimatedMain({ children }: AnimatedMainProps) {
  return (
    <main className="flex-1 p-8 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto"
      >
        {children}
      </motion.div>
    </main>
  );
}
