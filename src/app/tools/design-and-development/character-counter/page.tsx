"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbLetterCase,
  TbNumbers,
  TbClearFormatting,
  TbLine,
} from "react-icons/tb";

import { ToolPageWrapper } from "@/components";

const CharacterCounter: React.FC = () => {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);

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

  useEffect(() => {
    setCharCount(text.length);
    setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    setLineCount(text.split(/\r\n|\r|\n/).length);
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const clearText = () => {
    setText("");
  };

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
          <h1 className="text-5xl font-bold mb-8">Character Counter</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type or paste your text here..."
            className="w-full h-64 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none mb-4"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
              <TbLetterCase size={24} className="mb-2" />
              <span className="text-2xl font-bold">{charCount}</span>
              <span className="text-sm">Characters</span>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
              <TbNumbers size={24} className="mb-2" />
              <span className="text-2xl font-bold">{wordCount}</span>
              <span className="text-sm">Words</span>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
              <TbLine size={24} className="mb-2" />
              <span className="text-2xl font-bold">{lineCount}</span>
              <span className="text-sm">Lines</span>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
              <TbClearFormatting size={24} className="mb-2" />
              <motion.button
                onClick={clearText}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                whileTap={{ scale: 0.95 }}
              >
                Clear
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.main>
    </ToolPageWrapper>
  );
};

export default CharacterCounter;
