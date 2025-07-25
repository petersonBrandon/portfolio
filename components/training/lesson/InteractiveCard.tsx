// components/lesson/InteractiveCard.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { InteractiveCardProps } from "../../../types/lesson";

export default function InteractiveCard({
  title,
  subtitle,
  icon,
  isSelected,
  onClick,
  className = "",
  children,
  expandedContent,
  disabled = false,
}: InteractiveCardProps) {
  return (
    <motion.div
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={disabled ? undefined : onClick}
      className={`border-2 border-gray-300 p-4 transition-all ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${
        isSelected ? "bg-cyan-100 border-cyan-400" : "bg-white hover:bg-gray-50"
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon && <div className="mr-3">{icon}</div>}
          <div>
            <h4 className="font-bold text-sm">{title}</h4>
            {subtitle && (
              <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {children}
      </div>

      <AnimatePresence>
        {isSelected && expandedContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-gray-200">
              {expandedContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
