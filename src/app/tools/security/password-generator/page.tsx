"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCopy, TbRefresh, TbCheck } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToolPageWrapper } from "@/components";

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
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
    tap: { scale: 0.95 },
  };

  const generatePassword = () => {
    setIsGenerating(true);
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    setTimeout(() => setIsGenerating(false), 500); // Allow time for the spin animation
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    toast.success("Password copied to clipboard!");
    setTimeout(() => setIsCopied(false), 1500);
  };

  useEffect(() => {
    generatePassword();
  }, []);

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
          <h1 className="text-5xl font-bold mb-8">Password Generator</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              value={password}
              readOnly
              className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
            />
            <div className="flex lg:flex-row flex-col lg:space-x-4  lg:space-y-0 space-y-4">
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
              <motion.button
                onClick={generatePassword}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors duration-300"
                variants={buttonVariants}
                whileTap="tap"
              >
                <motion.div
                  animate={{ rotate: isGenerating ? -360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TbRefresh size={24} />
                </motion.div>
              </motion.button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="length" className="block mb-2">
                Password Length: {length}
              </label>
              <input
                type="range"
                id="length"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                  className="form-checkbox"
                />
                <span>Uppercase</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                  className="form-checkbox"
                />
                <span>Lowercase</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  className="form-checkbox"
                />
                <span>Numbers</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                  className="form-checkbox"
                />
                <span>Symbols</span>
              </label>
            </div>
          </div>
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default PasswordGenerator;
