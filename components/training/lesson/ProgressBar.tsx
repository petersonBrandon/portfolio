// components/lesson/ProgressBar.tsx
"use client";

import { motion } from "framer-motion";
import { ProgressBarProps } from "../../../types/lesson";

export default function ProgressBar({
  current,
  total,
  className = "",
}: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div
      className={`w-full bg-gray-300 border-2 border-gray-400 h-4 ${className}`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
        className="bg-cyan-400 h-full"
      />
    </div>
  );
}
