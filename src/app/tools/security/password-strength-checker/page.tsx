"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { ToolPageWrapper } from "@/components";

const PasswordStrengthChecker: React.FC = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const checkPasswordStrength = (pass: string) => {
    let score = 0;
    let feedback = [];

    // Length check
    if (pass.length < 8) {
      feedback.push("Make it at least 8 characters long");
    } else {
      score += pass.length > 12 ? 2 : 1;
    }

    // Complexity checks
    if (/[A-Z]/.test(pass)) score++;
    else feedback.push("Add uppercase letters");
    if (/[a-z]/.test(pass)) score++;
    else feedback.push("Add lowercase letters");
    if (/[0-9]/.test(pass)) score++;
    else feedback.push("Add numbers");
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    else feedback.push("Add special characters");

    // Repeated characters
    if (/(.)\1{2,}/.test(pass)) {
      score--;
      feedback.push("Avoid repeated characters");
    }

    // Common words or patterns
    const commonPatterns = ["password", "123", "qwerty", "admin"];
    if (
      commonPatterns.some((pattern) => pass.toLowerCase().includes(pattern))
    ) {
      score -= 2;
      feedback.push("Avoid common words or patterns");
    }

    setStrength(Math.max(0, Math.min(5, score)));
    setFeedback(feedback.join(". "));
  };

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  const getStrengthColor = () => {
    const colors = ["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9"];
    return colors[strength] || colors[0];
  };

  const getStrengthText = () => {
    const texts = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
    return texts[strength] || texts[0];
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <h1 className="text-5xl font-bold mb-8">Password Strength Checker</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-lg font-semibold"
            >
              Enter your password:
            </label>
            <div className="relative flex justify-center w-full items-center bg-gray-800 text-white rounded-lg px-4 py-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg pr-10 focus:outline-none"
                placeholder="Type your password here"
              />
              <motion.button
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-white transition-colors duration-300"
                variants={buttonVariants}
                whileTap="tap"
              >
                {showPassword ? <TbEyeOff size={24} /> : <TbEye size={24} />}
              </motion.button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Strength:</span>
              <span style={{ color: getStrengthColor() }}>
                {getStrengthText()}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${(strength / 5) * 100}%`,
                  backgroundColor: getStrengthColor(),
                }}
              ></div>
            </div>
          </div>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 text-white p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2">Suggestions to improve:</h3>
              <p>{feedback}</p>
            </motion.div>
          )}
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default PasswordStrengthChecker;
