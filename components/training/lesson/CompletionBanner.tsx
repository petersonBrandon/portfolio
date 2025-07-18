// components/lesson/CompletionBanner.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { CompletionBannerProps } from "../../../types/lesson";

export default function CompletionBanner({
  title,
  message,
  onContinue,
  buttonText = "Continue to Next Lesson",
  icon,
  variant = "success",
}: CompletionBannerProps) {
  const variants = {
    success: {
      bg: "bg-green-100",
      border: "border-green-400",
      iconColor: "text-green-600",
      buttonBg: "bg-green-400 hover:bg-green-500",
    },
    info: {
      bg: "bg-cyan-100",
      border: "border-cyan-400",
      iconColor: "text-cyan-600",
      buttonBg: "bg-cyan-400 hover:bg-cyan-500",
    },
    warning: {
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      iconColor: "text-yellow-600",
      buttonBg: "bg-yellow-400 hover:bg-yellow-500",
    },
  };

  const currentVariant = variants[variant];
  const defaultIcon = <CheckCircle className="h-12 w-12" />;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`mt-8 ${currentVariant.bg} border-2 ${currentVariant.border} p-6 text-center`}
    >
      <div className={`${currentVariant.iconColor} mx-auto mb-4`}>
        {icon || defaultIcon}
      </div>
      <h3 className="font-black text-lg uppercase tracking-wider mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-700 mb-4">{message}</p>
      {onContinue && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className={`${currentVariant.buttonBg} text-black font-bold py-3 px-6 border-2 border-black uppercase tracking-wider text-sm transition-all`}
        >
          {buttonText}
        </motion.button>
      )}
    </motion.div>
  );
}
