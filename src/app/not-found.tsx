// app/not-found.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const GlitchText = ({ children }: { children: React.ReactNode }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative"
      animate={isGlitching ? { x: [-2, 2, -2, 2, 0] } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
      {isGlitching && (
        <>
          <div className="absolute inset-0 text-red-400 opacity-70 translate-x-1">
            {children}
          </div>
          <div className="absolute inset-0 text-blue-400 opacity-70 -translate-x-1">
            {children}
          </div>
        </>
      )}
    </motion.div>
  );
};

const ScanLine = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
  >
    <motion.div
      className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"
      animate={{ y: ["0%", "100%"] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </motion.div>
);

const FloatingCode = () => {
  const errorCodes = [
    "ERR_404_SECTOR_NOT_FOUND",
    "QUANTUM_JUMP_FAILED",
    "NAVIGATION_ERROR",
    "VOID_SPACE_DETECTED",
    "COORDINATE_CORRUPTION",
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {errorCodes.map((code, index) => (
        <motion.div
          key={code}
          className="absolute text-red-400 opacity-30 text-xs font-mono"
          initial={{
            opacity: 0,
          }}
          animate={{
            y: -50,
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: index * 2,
            ease: "linear",
          }}
        >
          {code}
        </motion.div>
      ))}
    </div>
  );
};

const StatusIndicator = ({
  label,
  status,
  color = "red",
  delay = 0,
}: {
  label: string;
  status: string;
  color?: "red" | "yellow" | "green";
  delay?: number;
}) => {
  const colorClasses = {
    red: "text-red-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
  };

  return (
    <motion.div
      className="flex items-center gap-2 text-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay + 2 }}
    >
      <motion.div
        className={`w-3 h-3 rounded-full ${colorClasses[color]}`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-gray-300">{label}:</span>
      <span className={colorClasses[color]}>{status}</span>
    </motion.div>
  );
};

export default function NotFound() {
  const [coordinates, setCoordinates] = useState({
    x: Math.random() * 999,
    y: Math.random() * 999,
    z: Math.random() * 999,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinates({
        x: Math.random() * 999,
        y: Math.random() * 999,
        z: Math.random() * 999,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-blue-100 font-mono overflow-hidden relative flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-gray-900 to-black opacity-80" />

      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full w-1 h-1"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating error codes */}
      <FloatingCode />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <GlitchText>
            <div className="text-8xl font-bold text-red-400 mb-4">404</div>
          </GlitchText>

          <motion.div
            className="text-2xl text-yellow-400 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            NAVIGATION ERROR
          </motion.div>

          <motion.div
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            SECTOR NOT FOUND IN QUANTUM DATABASE
          </motion.div>
        </motion.div>

        {/* Error details panel */}
        <motion.div
          className="bg-black bg-opacity-60 border border-red-400 border-opacity-30 rounded p-6 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <ScanLine />

          <div className="text-red-400 text-sm mb-4 flex items-center gap-2">
            <span>ERROR_DIAGNOSTICS:</span>
            <motion.div
              className="flex-1 h-px bg-red-400 opacity-30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            />
          </div>

          <div className="space-y-2 text-left">
            <StatusIndicator
              label="JUMP_COORDINATES"
              status={`${coordinates.x.toFixed(0)}.${coordinates.y.toFixed(
                0
              )}.${coordinates.z.toFixed(0)}`}
              color="red"
              delay={0}
            />
            <StatusIndicator
              label="NAVIGATION_STATUS"
              status="CRITICAL_ERROR"
              color="red"
              delay={0.1}
            />
            <StatusIndicator
              label="QUANTUM_DRIVE"
              status="RECALIBRATING"
              color="yellow"
              delay={0.2}
            />
            <StatusIndicator
              label="BACKUP_SYSTEMS"
              status="ONLINE"
              color="green"
              delay={0.3}
            />
          </div>

          <motion.div
            className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            The requested sector does not exist in our navigation database.
            <br />
            Please verify coordinates and try again.
          </motion.div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="bg-blue-500 bg-opacity-20 hover:bg-opacity-30 text-blue-300 border border-blue-400 border-opacity-50 px-6 py-3 rounded transition-all duration-200 hover:scale-105"
            >
              <div className="text-sm font-medium">RETURN TO BRIDGE</div>
              <div className="text-xs opacity-70">Main Navigation</div>
            </Link>

            <Link
              href="/ftl-nomad"
              className="bg-green-500 bg-opacity-20 hover:bg-opacity-30 text-green-300 border border-green-400 border-opacity-50 px-6 py-3 rounded transition-all duration-200 hover:scale-105"
            >
              <div className="text-sm font-medium">FTL NOMAD CONSOLE</div>
              <div className="text-xs opacity-70">Campaign Management</div>
            </Link>
          </div>

          <motion.div
            className="text-xs text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            ERROR_CODE: VOID_SPACE_DETECTED | TIMESTAMP:{" "}
            {new Date().toLocaleString()}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scanner */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-60"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="absolute w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />
      </motion.div>
    </div>
  );
}
