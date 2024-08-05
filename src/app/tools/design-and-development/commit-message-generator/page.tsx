"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCopy, TbCheck, TbRefresh } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToolPageWrapper } from "@/components";

const CommitMessageGenerator: React.FC = () => {
  const [type, setType] = useState("feat");
  const [scope, setScope] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [breakingChange, setBreakingChange] = useState("");
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

  const generateCommitMessage = () => {
    setIsGenerating(true);

    setTimeout(() => {
      let message = `${type}${scope ? `(${scope})` : ""}: ${summary}`;

      if (body) {
        message += `\n\n${body}`;
      }

      if (breakingChange) {
        message += `\n\nBREAKING CHANGE: ${breakingChange}`;
      }

      setOutput(message);
      setIsGenerating(false);
      toast.success("Commit message generated successfully!");
    }, 600);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    toast.success("Commit message copied to clipboard!");
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
          <h1 className="text-5xl font-bold mb-8">Commit Message Generator</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="type" className="block mb-2">
                Type:
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
              >
                <option value="feat">feat (new feature)</option>
                <option value="fix">fix (bug fix)</option>
                <option value="docs">docs (documentation)</option>
                <option value="style">
                  style (formatting, missing semi colons, etc)
                </option>
                <option value="refactor">refactor</option>
                <option value="test">test (adding missing tests)</option>
                <option value="chore">chore (maintain)</option>
              </select>
            </div>
            <div>
              <label htmlFor="scope" className="block mb-2">
                Scope (optional):
              </label>
              <input
                type="text"
                id="scope"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                placeholder="e.g. authentication"
              />
            </div>
            <div>
              <label htmlFor="summary" className="block mb-2">
                Summary:
              </label>
              <input
                type="text"
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                placeholder="Brief summary of the change"
              />
            </div>
            <div>
              <label htmlFor="body" className="block mb-2">
                Body (optional):
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                rows={3}
                placeholder="Detailed description of the change"
              />
            </div>
            <div>
              <label htmlFor="breakingChange" className="block mb-2">
                Breaking Change (optional):
              </label>
              <textarea
                id="breakingChange"
                value={breakingChange}
                onChange={(e) => setBreakingChange(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                rows={2}
                placeholder="Description of the breaking change"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <motion.button
              onClick={generateCommitMessage}
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
                  {isGenerating ? "Generating..." : "Generate Commit Message"}
                </span>
              </motion.div>
            </motion.button>
          </div>

          <div className="mb-6">
            <label htmlFor="output" className="block mb-2">
              Generated Commit Message:
            </label>
            <div className="relative">
              <textarea
                id="output"
                value={output}
                readOnly
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                rows={5}
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

export default CommitMessageGenerator;
