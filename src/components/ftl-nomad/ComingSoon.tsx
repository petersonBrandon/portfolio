// components/ComingSoon.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ComingSoonProps {
  title: string;
  description: string;
  estimatedCompletion?: string;
  features?: string[];
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  description,
  estimatedCompletion = "CALCULATING...",
  features = [],
}) => {
  const [progress, setProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState("INITIALIZING");
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) return 85 + Math.random() * 10;
        return prev + Math.random() * 2;
      });
    }, 500);

    // Animate dots
    const dotInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 800);

    // Cycle through statuses
    const statuses = [
      "INITIALIZING",
      "COMPILING_DATA",
      "ESTABLISHING_PROTOCOLS",
      "OPTIMIZING_SYSTEMS",
      "PREPARING_DEPLOYMENT",
    ];

    const statusInterval = setInterval(() => {
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotInterval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <div className="min-h-full flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Main Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-blue-400 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {title}
          </motion.h1>

          <motion.div
            className="text-xl text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {description}
          </motion.div>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </motion.div>

        {/* Status Console */}
        <motion.div
          className="bg-black bg-opacity-60 border border-blue-400 border-opacity-30 rounded-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-yellow-400 text-sm">SYSTEM_STATUS:</span>
              <motion.span
                className="text-green-400 text-sm font-mono"
                key={systemStatus}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {systemStatus}
                {dots}
              </motion.span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>DEVELOPMENT_PROGRESS</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-yellow-400 text-sm mb-2">
                ESTIMATED_COMPLETION:
              </div>
              <div className="text-green-400 font-mono">
                {estimatedCompletion}
              </div>
            </div>
            <div>
              <div className="text-yellow-400 text-sm mb-2">
                PRIORITY_LEVEL:
              </div>
              <div className="text-red-400 font-mono">HIGH</div>
            </div>
          </div>
        </motion.div>

        {/* Features in Development */}
        {features.length > 0 && (
          <motion.div
            className="bg-black bg-opacity-40 border border-gray-600 rounded-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="text-yellow-400 text-sm mb-4">
              PLANNED_FEATURES:
            </div>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Animated Scanner */}
        <motion.div
          className="relative bg-black bg-opacity-40 border border-gray-600 rounded-lg p-6 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="text-yellow-400 text-sm mb-4">ENGINEERING_LOG:</div>
          <div className="text-gray-300 text-sm space-y-1">
            <div>» Quantum processors online</div>
            <div>» Neural pathways mapping</div>
            <div>» Database architecture optimized</div>
            <div>» User interface protocols established</div>
          </div>

          {/* Scanning effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Warning Message */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <div className="inline-flex items-center gap-2 text-yellow-400 text-sm">
            <motion.div
              className="w-3 h-3 border-2 border-yellow-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span>CAUTION: Module under active development</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
