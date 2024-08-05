"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbFileDownload, TbRefresh } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToolPageWrapper } from "@/components";

const PDFGenerator: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [html2pdf, setHtml2pdf] = useState<any>(null);

  useEffect(() => {
    // @ts-ignore
    import("html2pdf.js").then((module) => {
      setHtml2pdf(() => module.default);
    });
  }, []);

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

  const generatePDF = async () => {
    if (!html2pdf) {
      toast.error("PDF generation library not loaded yet. Please try again.");
      return;
    }

    setIsGenerating(true);
    try {
      const element = document.createElement("div");
      element.innerHTML = htmlContent;

      const opt = {
        margin: 10,
        filename: "generated-pdf.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().from(element).set(opt).save();

      toast.success("PDF generated successfully!");
    } catch (error) {
      toast.error("Failed to generate PDF. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
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
          <h1 className="text-5xl font-bold mb-8">PDF from HTML Generator</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="mb-6">
            <label htmlFor="htmlContent" className="block mb-2">
              Enter HTML Content:
            </label>
            <textarea
              id="htmlContent"
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              className="w-full h-64 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none resize-none"
              placeholder="<h1>Hello, World!</h1>"
            />
          </div>

          <div className="flex justify-center">
            <motion.button
              onClick={generatePDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center space-x-2"
              variants={buttonVariants}
              whileTap="tap"
              disabled={isGenerating || !html2pdf}
            >
              <motion.div
                animate={{ rotate: isGenerating ? 360 : 0 }}
                transition={{
                  duration: 1,
                  repeat: isGenerating ? Infinity : 0,
                }}
              >
                {isGenerating ? (
                  <TbRefresh size={24} />
                ) : (
                  <TbFileDownload size={24} />
                )}
              </motion.div>
              <span>{isGenerating ? "Generating..." : "Generate PDF"}</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default PDFGenerator;
