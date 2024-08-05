"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCopy, TbRefresh, TbCheck, TbLock, TbLockOpen } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";
import { ToolPageWrapper } from "@/components";

const EncryptionDecryption: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [key, setKey] = useState("");
  const [algorithm, setAlgorithm] = useState("AES");
  const [mode, setMode] = useState("encrypt");
  const [isCopied, setIsCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const processText = () => {
    setIsProcessing(true);
    let result = "";

    setTimeout(() => {
      try {
        if (mode === "encrypt") {
          switch (algorithm) {
            case "AES":
              result = CryptoJS.AES.encrypt(input, key).toString();
              break;
            case "DES":
              result = CryptoJS.DES.encrypt(input, key).toString();
              break;
            case "TripleDES":
              result = CryptoJS.TripleDES.encrypt(input, key).toString();
              break;
            case "Rabbit":
              result = CryptoJS.Rabbit.encrypt(input, key).toString();
              break;
          }
        } else {
          switch (algorithm) {
            case "AES":
              result = CryptoJS.AES.decrypt(input, key).toString(
                CryptoJS.enc.Utf8
              );
              break;
            case "DES":
              result = CryptoJS.DES.decrypt(input, key).toString(
                CryptoJS.enc.Utf8
              );
              break;
            case "TripleDES":
              result = CryptoJS.TripleDES.decrypt(input, key).toString(
                CryptoJS.enc.Utf8
              );
              break;
            case "Rabbit":
              result = CryptoJS.Rabbit.decrypt(input, key).toString(
                CryptoJS.enc.Utf8
              );
              break;
          }
        }
        setOutput(result);
        toast.success(
          `Text ${mode === "encrypt" ? "encrypted" : "decrypted"} successfully!`
        );
      } catch (error) {
        toast.error("An error occurred. Please check your input and key.");
      }
    }, 600);

    setTimeout(() => setIsProcessing(false), 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    toast.success("Output copied to clipboard!");
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
          <h1 className="text-5xl font-bold mb-8">
            Encryption/Decryption Tool
          </h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="input" className="block mb-2">
                Input Text:
              </label>
              <textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                rows={4}
              />
            </div>
            <div>
              <label htmlFor="key" className="block mb-2">
                Encryption Key:
              </label>
              <input
                type="text"
                id="key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="algorithm" className="block mb-2">
                  Algorithm:
                </label>
                <select
                  id="algorithm"
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                >
                  <option value="AES">AES</option>
                  <option value="DES">DES</option>
                  <option value="TripleDES">Triple DES</option>
                  <option value="Rabbit">Rabbit</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="mode" className="block mb-2">
                  Mode:
                </label>
                <select
                  id="mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                >
                  <option value="encrypt">Encrypt</option>
                  <option value="decrypt">Decrypt</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <motion.button
              onClick={processText}
              className="flex-grow text-white px-4 py-2 rounded-lg transition-colors duration-300"
              variants={buttonVariants}
              initial="idle"
              animate={isProcessing ? "processing" : "idle"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex items-center justify-center"
                animate={{ opacity: isProcessing ? 0.7 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {mode === "encrypt" ? (
                  <TbLock size={24} />
                ) : (
                  <TbLockOpen size={24} />
                )}
                <span className="ml-2">
                  {isProcessing
                    ? "Processing..."
                    : mode === "encrypt"
                    ? "Encrypt"
                    : "Decrypt"}
                </span>
              </motion.div>
            </motion.button>
          </div>

          <div className="mb-6">
            <label htmlFor="output" className="block mb-2">
              Output:
            </label>
            <div className="flex items-center space-x-4">
              <textarea
                id="output"
                value={output}
                readOnly
                className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                rows={4}
              />
              <motion.button
                onClick={copyToClipboard}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors duration-300"
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

export default EncryptionDecryption;
