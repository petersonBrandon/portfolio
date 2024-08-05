"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCopy, TbCheck } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import { HexColorInput, HexColorPicker } from "react-colorful";
import "react-toastify/dist/ReactToastify.css";
import { FaHashtag } from "react-icons/fa";
import { ToolPageWrapper } from "@/components";

const BoxShadowGenerator = () => {
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [verticalOffset, setVerticalOffset] = useState(4);
  const [blurRadius, setBlurRadius] = useState(8);
  const [spreadRadius, setSpreadRadius] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0.2);
  const [inset, setInset] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [containerColor, setContainerColor] = useState("#FFFFFF");
  const [boxColor, setBoxColor] = useState("#3B82F6");

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

  const getRGBAColor = () => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const handleColorChange = (setter: any) => (color: any) => {
    if (color.startsWith("#") && (color.length === 4 || color.length === 7)) {
      setter(color);
    } else if (color.startsWith("rgb")) {
      // Convert RGB to HEX
      const rgb = color.match(/\d+/g);
      if (rgb && rgb.length === 3) {
        const hex =
          "#" +
          rgb
            .map((x: any) => parseInt(x).toString(16).padStart(2, "0"))
            .join("");
        setter(hex);
      }
    }
  };

  const boxShadowStyle = {
    boxShadow: `${
      inset ? "inset " : ""
    }${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${getRGBAColor()}`,
    backgroundColor: boxColor,
  };

  const boxShadowCode = `box-shadow: ${
    inset ? "inset " : ""
  }${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${getRGBAColor()};`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Box shadow code copied to clipboard!");
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <ToolPageWrapper>
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 py-16 text-white max-w-5xl"
      >
        <motion.section
          variants={itemVariants}
          className="flex flex-col items-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-8">Box Shadow Generator</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4">Preview</h2>
              <div
                className="w-full h-48 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: containerColor }}
              >
                <div
                  className="w-32 h-32 rounded-lg"
                  style={boxShadowStyle}
                ></div>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">CSS</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={boxShadowCode}
                      readOnly
                      className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                    />
                    <motion.button
                      onClick={() => copyToClipboard(boxShadowCode)}
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
                          {isCopied ? (
                            <TbCheck size={24} />
                          ) : (
                            <TbCopy size={24} />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">
                    Horizontal Offset: {horizontalOffset}px
                  </label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={horizontalOffset}
                    onChange={(e) =>
                      setHorizontalOffset(parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    Vertical Offset: {verticalOffset}px
                  </label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={verticalOffset}
                    onChange={(e) =>
                      setVerticalOffset(parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    Blur Radius: {blurRadius}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={blurRadius}
                    onChange={(e) => setBlurRadius(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    Spread Radius: {spreadRadius}px
                  </label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={spreadRadius}
                    onChange={(e) => setSpreadRadius(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    Opacity: {opacity.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inset"
                    checked={inset}
                    onChange={(e) => setInset(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="inset">Inset</label>
                </div>
              </div>
              <div
                id="color-picker"
                className="flex lg:flex-row flex-col lg:space-y-0 space-y-5 w-full justify-between items-center mt-5"
              >
                <div className="space-y-6">
                  <label className="block mb-2">Container Color</label>
                  <div className="relative">
                    <div className="z-10 mt-2">
                      <HexColorPicker
                        color={containerColor}
                        onChange={setContainerColor}
                      />
                      <div className="flex justify-center items-center space-x-2">
                        <FaHashtag />
                        <HexColorInput
                          color={containerColor}
                          onChange={handleColorChange(setContainerColor)}
                          className="mt-2 w-full bg-gray-800 text-white px-2 py-1 rounded focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <label className="block mb-2">Box Color</label>
                  <div className="relative">
                    <div className="z-10 mt-2">
                      <HexColorPicker color={boxColor} onChange={setBoxColor} />
                      <div className="flex justify-center items-center space-x-2">
                        <FaHashtag />
                        <HexColorInput
                          color={boxColor}
                          onChange={handleColorChange(setBoxColor)}
                          className="mt-2 w-full bg-gray-800 text-white px-2 py-1 rounded focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <label className="block mb-2">Shadow Color</label>
                  <div className="relative">
                    <div className="z-10 mt-2">
                      <HexColorPicker color={color} onChange={setColor} />
                      <div className="flex justify-center items-center space-x-2">
                        <FaHashtag />
                        <HexColorInput
                          color={color}
                          onChange={handleColorChange(setColor)}
                          className="mt-2 w-full bg-gray-800 text-white px-2 py-1 rounded focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default BoxShadowGenerator;
