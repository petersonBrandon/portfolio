"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TbRefresh, TbClipboardCopy } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToolPageWrapper } from "@/components";

const ColorPaletteGenerator = () => {
  const [palette, setPalette] = useState<string[]>(generateRandomPalette());

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

  function generateRandomPalette(): string[] {
    const newPalette: string[] = [];
    for (let i = 0; i < 5; i++) {
      newPalette.push(generateRandomColor());
    }
    return newPalette;
  }

  function generateRandomColor(): string {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  }

  function regeneratePalette() {
    setPalette(generateRandomPalette());
  }

  function copyColorToClipboard(color: string) {
    navigator.clipboard.writeText(color).then(() => {
      toast.success(`Copied ${color} to clipboard!`);
    });
  }

  return (
    <ToolPageWrapper>
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 py-16 text-white"
      >
        <motion.section
          variants={itemVariants}
          className="flex flex-col items-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-8">Color Palette Generator</h1>
          <p className="text-xl text-center max-w-2xl">
            Generate beautiful color palettes for your next project. Click on a
            color to copy its hex code, or use the refresh button to generate a
            new palette.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-8">
          <div className="flex flex-wrap justify-center gap-4">
            {palette.map((color, index) => (
              <motion.div
                key={index}
                className="w-32 h-32 rounded-lg shadow-lg cursor-pointer relative group"
                style={{ backgroundColor: color }}
                onClick={() => copyColorToClipboard(color)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <TbClipboardCopy className="text-white text-2xl" />
                </div>
                <span className="absolute bottom-2 left-2 text-xs font-mono bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {color.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center">
            <motion.button
              className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-300"
              onClick={regeneratePalette}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TbRefresh className="text-xl" />
              <span>Generate New Palette</span>
            </motion.button>
          </div>
        </motion.section>
      </motion.main>
    </ToolPageWrapper>
  );
};

export default ColorPaletteGenerator;
