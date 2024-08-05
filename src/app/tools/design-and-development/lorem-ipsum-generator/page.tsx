"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCopy, TbCheck, TbRefresh } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToolPageWrapper } from "@/components";

const LoremIpsumGenerator: React.FC = () => {
  const [paragraphs, setParagraphs] = useState(1);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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
    idle: { scale: 1, backgroundColor: "#2563EB" },
    processing: {
      scale: [1, 1.05, 1],
      backgroundColor: "#1E40AF",
      transition: { duration: 0.3 },
    },
  };

  const words = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "ut",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "dolor",
    "in",
    "reprehenderit",
    "in",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "dolore",
    "eu",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "in",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
  ];

  const generateLoremIpsum = () => {
    setIsGenerating(true);

    setTimeout(() => {
      let result = "";
      for (let i = 0; i < paragraphs; i++) {
        let paragraph = "";
        for (let j = 0; j < wordsPerParagraph; j++) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          paragraph +=
            (j === 0
              ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1)
              : randomWord) + " ";
        }
        result += paragraph.trim() + "\n\n";
      }
      setOutput(result.trim());
      setIsGenerating(false);
      toast.success("Lorem Ipsum generated successfully!");
    }, 600);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    toast.success("Text copied to clipboard!");
    setTimeout(() => setIsCopied(false), 1500);
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
          <h1 className="text-5xl font-bold mb-8">Lorem Ipsum Generator</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="paragraphs" className="block mb-2">
                Number of Paragraphs: {paragraphs}
              </label>
              <input
                type="range"
                id="paragraphs"
                min="1"
                max="10"
                value={paragraphs}
                onChange={(e) => setParagraphs(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="words" className="block mb-2">
                Words per Paragraph: {wordsPerParagraph}
              </label>
              <input
                type="range"
                id="words"
                min="10"
                max="100"
                step="5"
                value={wordsPerParagraph}
                onChange={(e) => setWordsPerParagraph(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <motion.button
              onClick={generateLoremIpsum}
              className="flex-grow text-white px-4 py-2 rounded-lg transition-colors duration-300"
              variants={buttonVariants}
              initial="idle"
              animate={isGenerating ? "processing" : "idle"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex items-center justify-center"
                animate={{ opacity: isGenerating ? 0.7 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <TbRefresh size={24} />
                <span className="ml-2">
                  {isGenerating ? "Generating..." : "Generate Lorem Ipsum"}
                </span>
              </motion.div>
            </motion.button>
          </div>

          <div className="mb-6">
            <label htmlFor="output" className="block mb-2">
              Generated Lorem Ipsum:
            </label>
            <div className="relative">
              <textarea
                id="output"
                value={output}
                readOnly
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                rows={10}
              />
              <motion.button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300"
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
                    {isCopied ? <TbCheck size={24} /> : <TbCopy size={24} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default LoremIpsumGenerator;
