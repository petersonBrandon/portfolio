"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbDownload, TbRefresh } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "qrcode";
import { ToolPageWrapper } from "@/components";

const QRCodeGenerator: React.FC = () => {
  const [input, setInput] = useState("");
  const [qrCodeUrl, setQRCodeUrl] = useState("");
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

  const generateQRCode = async () => {
    if (!input) {
      toast.error("Please enter some text or URL");
      return;
    }

    setIsGenerating(true);

    try {
      const url = await QRCode.toDataURL(input);
      setQRCodeUrl(url);
      toast.success("QR Code generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate QR Code");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code downloaded!");
  };

  useEffect(() => {
    if (input) {
      generateQRCode();
    }
  }, [input]);

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
          <h1 className="text-5xl font-bold mb-8">QR Code Generator</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="input" className="block mb-2">
                Enter text or URL:
              </label>
              <input
                type="text"
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <motion.button
              onClick={generateQRCode}
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
                  {isGenerating ? "Generating..." : "Generate QR Code"}
                </span>
              </motion.div>
            </motion.button>
          </div>

          {qrCodeUrl && (
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <img src={qrCodeUrl} alt="Generated QR Code" className="mb-4" />
              <motion.button
                onClick={downloadQRCode}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center">
                  <TbDownload size={24} />
                  <span className="ml-2">Download QR Code</span>
                </div>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default QRCodeGenerator;
