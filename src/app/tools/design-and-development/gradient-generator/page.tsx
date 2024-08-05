"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import { TbCopy, TbCheck } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToolPageWrapper } from "@/components";

const GradientGenerator = () => {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#6366f1");
  const [angle, setAngle] = useState(45);
  const [isCopied, setIsCopied] = useState(false);
  const [mode, setMode] = useState<"css" | "tailwind">("css");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    tap: { scale: 0.95 },
  };

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
  };

  const cssCode = `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;

  const getTailwindDirection = (angle: number) => {
    if (angle >= 337.5 || angle < 22.5) return "to-r";
    if (angle >= 22.5 && angle < 67.5) return "to-br";
    if (angle >= 67.5 && angle < 112.5) return "to-b";
    if (angle >= 112.5 && angle < 157.5) return "to-bl";
    if (angle >= 157.5 && angle < 202.5) return "to-l";
    if (angle >= 202.5 && angle < 247.5) return "to-tl";
    if (angle >= 247.5 && angle < 292.5) return "to-t";
    return "to-tr";
  };

  const tailwindCode = `bg-gradient-${getTailwindDirection(
    angle
  )} from-[${color1}] to-[${color2}]`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Gradient code copied to clipboard!");
    setTimeout(() => setIsCopied(false), 1500);
  };

  const tailwindAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <ToolPageWrapper>
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 py-16 text-white max-w-5xl"
      >
        <motion.section
          variants={itemVariants}
          className="flex flex-col items-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-8">Gradient Generator</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4">Preview</h2>
              <div
                className="w-full h-48 rounded-lg"
                style={gradientStyle}
              ></div>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {mode === "css" ? "CSS" : "Tailwind CSS"}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={mode === "css" ? cssCode : tailwindCode}
                      readOnly
                      className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                    />
                    <motion.button
                      onClick={() =>
                        copyToClipboard(mode === "css" ? cssCode : tailwindCode)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300"
                      variants={buttonVariants}
                      whileTap="tap"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={isCopied ? "check" : "copy"}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isCopied ? (
                            <TbCheck size={24} />
                          ) : (
                            <TbCopy size={24} />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col lg:flex-row w-full lg:space-x-10">
                <div>
                  <label className="block mb-2">Mode</label>
                  <select
                    value={mode}
                    onChange={(e) =>
                      setMode(e.target.value as "css" | "tailwind")
                    }
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                  >
                    <option value="css">CSS</option>
                    <option value="tailwind">Tailwind CSS</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Color 1</label>
                  <HexColorPicker color={color1} onChange={setColor1} />
                </div>
                <div>
                  <label className="block mb-2">Color 2</label>
                  <HexColorPicker color={color2} onChange={setColor2} />
                </div>
              </div>
              <div>
                <div className="mt-4">
                  <label className="block mb-2">Angle: {angle}°</label>
                  {mode === "css" ? (
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={angle}
                      onChange={(e) => setAngle(parseInt(e.target.value))}
                      className="w-full"
                    />
                  ) : (
                    <select
                      value={angle}
                      onChange={(e) => setAngle(parseInt(e.target.value))}
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                    >
                      {tailwindAngles.map((a) => (
                        <option key={a} value={a}>
                          {a}°
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default GradientGenerator;
