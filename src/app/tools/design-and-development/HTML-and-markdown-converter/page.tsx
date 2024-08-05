"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCopy, TbCheck, TbArrowsExchange } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TurndownService from "turndown";
import { marked } from "marked";
import { ToolPageWrapper } from "@/components";

const HTMLMarkdownConverter: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"html2md" | "md2html">("html2md");
  const [isCopied, setIsCopied] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const turndownService = new TurndownService();

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

  const convertContent = async () => {
    setIsConverting(true);

    try {
      if (mode === "html2md") {
        const markdown = turndownService.turndown(input);
        setOutput(markdown);
      } else {
        const html = await marked(input);
        setOutput(html);
      }
      toast.success(
        `Converted to ${mode === "html2md" ? "Markdown" : "HTML"} successfully!`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to convert. Please check your input.");
    } finally {
      setIsConverting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    toast.success("Converted content copied to clipboard!");
    setTimeout(() => setIsCopied(false), 1500);
  };

  const toggleMode = () => {
    setMode(mode === "html2md" ? "md2html" : "html2md");
    setInput(output);
    setOutput("");
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
          <h1 className="text-5xl font-bold mb-8">HTML/Markdown Converter</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1">
              <label htmlFor="input" className="block mb-2">
                Input ({mode === "html2md" ? "HTML" : "Markdown"}):
              </label>
              <textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                rows={10}
                placeholder={`Enter your ${
                  mode === "html2md" ? "HTML" : "Markdown"
                } here`}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="output" className="block mb-2">
                Output ({mode === "html2md" ? "Markdown" : "HTML"}):
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
          </div>

          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.button
              onClick={() => convertContent()}
              className="flex-grow text-white px-4 py-2 rounded-lg transition-colors duration-300"
              variants={buttonVariants}
              initial="idle"
              animate={isConverting ? "processing" : "idle"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex items-center justify-center"
                animate={{ opacity: isConverting ? 0.7 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <TbArrowsExchange size={24} />
                <span className="ml-2">
                  {isConverting
                    ? "Converting..."
                    : `Convert to ${mode === "html2md" ? "Markdown" : "HTML"}`}
                </span>
              </motion.div>
            </motion.button>
            <motion.button
              onClick={toggleMode}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Switch Mode
            </motion.button>
          </div>
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default HTMLMarkdownConverter;
