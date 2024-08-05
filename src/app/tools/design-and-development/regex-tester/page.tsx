"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCopy, TbCheck } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToolPageWrapper } from "@/components";

const RegexTester: React.FC = () => {
  const [regex, setRegex] = useState("");
  const [flags, setFlags] = useState("");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedItem, setCopiedItem] = useState<number | null>(null);

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

  const testRegex = () => {
    try {
      const regexObj = new RegExp(regex, flags);
      const result = testString.match(regexObj);
      setMatches(result ? result : []);
    } catch (error) {
      toast.error("Invalid regular expression");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(regex);
    setIsCopied(true);
    toast.success("Regex copied to clipboard!");
    setTimeout(() => setIsCopied(false), 1500);
  };

  const copyRegexPattern = (pattern: string, index: number) => {
    navigator.clipboard.writeText(pattern);
    setCopiedItem(index);
    toast.success("Regex pattern copied to clipboard!");
    setTimeout(() => setCopiedItem(null), 1500);
  };

  const regexReference = [
    { pattern: "^", description: "Start of string" },
    { pattern: "$", description: "End of string" },
    { pattern: ".", description: "Any single character" },
    { pattern: "*", description: "Zero or more occurrences" },
    { pattern: "+", description: "One or more occurrences" },
    { pattern: "?", description: "Zero or one occurrence" },
    { pattern: "\\d", description: "Any digit" },
    { pattern: "\\w", description: "Any word character" },
    { pattern: "\\s", description: "Any whitespace character" },
    { pattern: "[abc]", description: "Any character in the set" },
    { pattern: "[^abc]", description: "Any character not in the set" },
    { pattern: "(x)", description: "Capturing group" },
    { pattern: "x{n}", description: "Exactly n occurrences of x" },
    { pattern: "x{n,}", description: "At least n occurrences of x" },
    { pattern: "x{n,m}", description: "Between n and m occurrences of x" },
  ];

  const regexFlags = [
    { flag: "g", description: "Global search (find all matches)" },
    { flag: "i", description: "Case-insensitive search" },
    { flag: "m", description: "Multiline search" },
    { flag: "s", description: "Dot (.) matches newline characters" },
    { flag: "u", description: "Unicode support" },
    { flag: "y", description: "Sticky search (start at lastIndex)" },
  ];

  const commonRegexExpressions = [
    {
      pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$",
      description: "Email address",
    },
    {
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
      description:
        "Password (at least 8 characters, one letter and one number)",
    },
    {
      pattern:
        "^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$",
      description: "Phone number",
    },
    {
      pattern:
        "^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$",
      description: "URL",
    },
    {
      pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
      description: "Date in YYYY-MM-DD format",
    },
    {
      pattern: "^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
      description: "Hex color code",
    },
    {
      pattern: "^\\d{3}-\\d{2}-\\d{4}$",
      description: "US Social Security Number",
    },
    {
      pattern: "^[a-zA-Z]{2}\\d{2}[a-zA-Z]{2}\\d{4}$",
      description: "UK Postcode",
    },
  ];

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
          <h1 className="text-5xl font-bold mb-8">Regex Tester</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              placeholder="Enter regex"
              className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
            />
            <motion.button
              onClick={copyToClipboard}
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
                  {isCopied ? <TbCheck size={24} /> : <TbCopy size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="Flags (e.g., gi)"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter test string"
              rows={4}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>

          <motion.button
            onClick={testRegex}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors duration-300"
            variants={buttonVariants}
            whileTap="tap"
          >
            Test Regex
          </motion.button>

          {matches.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Matches:</h3>
              <ul className="list-disc list-inside">
                {matches.map((match, index) => (
                  <li key={index}>{match}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-4">Regex Reference Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regexReference.map((item, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-lg">
                <code className="text-yellow-400">{item.pattern}</code>
                <p className="mt-1 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto mt-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Regex Flags</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regexFlags.map((item, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-lg">
                <code className="text-yellow-400">{item.flag}</code>
                <p className="mt-1 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto mt-8"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Common Regex Expressions
          </h2>
          <div className="space-y-4">
            {commonRegexExpressions.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-3 rounded-lg flex items-start justify-between"
              >
                <div>
                  <code className="text-yellow-400 break-all">
                    {item.pattern}
                  </code>
                  <p className="mt-1 text-sm">{item.description}</p>
                </div>
                <motion.button
                  onClick={() => copyRegexPattern(item.pattern, index)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300 ml-2 flex-shrink-0"
                  variants={buttonVariants}
                  whileTap="tap"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={copiedItem === index ? "check" : "copy"}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {copiedItem === index ? (
                        <TbCheck size={20} />
                      ) : (
                        <TbCopy size={20} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default RegexTester;
