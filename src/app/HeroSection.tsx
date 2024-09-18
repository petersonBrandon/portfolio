"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Wave from "react-wavify";
import { FaArrowDown } from "react-icons/fa";

const animations = [
  {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: (i: number) => ({ delay: i * 0.1, duration: 0.5 }),
  },
  {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: (i: number) => ({ delay: i * 0.1, duration: 0.5 }),
  },
  {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: (i: number) => ({
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
    }),
  },
  {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    transition: (i: number) => ({ delay: i * 0.1, duration: 0.5 }),
  },
];

const rotatingWords = [
  "Brandon Peterson",
  "Developer",
  "Quality Engineer",
  "Optimizationist",
  "Strategist",
];

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(animations[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % rotatingWords.length
      );
      setCurrentAnimation(
        animations[Math.floor(Math.random() * animations.length)]
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col pt-64 lg:pt-0 lg:justify-center items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-700 z-0"></div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-80 transform flex justify-center items-end">
          <Wave
            fill="#111827"
            paused={false}
            style={{ display: "flex", height: "100%" }}
            options={{
              height: 100,
              amplitude: 90,
              speed: 0.15,
              points: 3,
            }}
          />
        </div>
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="z-10 text-center w-full flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl lg:text-9xl font-bold mb-4 text-white lg:h-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWordIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {rotatingWords[currentWordIndex]
                .split("")
                .map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={currentAnimation.initial}
                    animate={currentAnimation.animate}
                    transition={currentAnimation.transition(index)}
                    style={{ display: "inline-block" }}
                    className={`${letter === " " && "w-3 lg:w-10"}`}
                  >
                    {letter}
                  </motion.span>
                ))}
            </motion.div>
          </AnimatePresence>
        </h1>
        <h2 className="text-xl w-3/4 md:w-full text-center lg:text-3xl mb-8 text-blue-200">
          Quality Engineer & Full Stack Developer
        </h2>
        <Link
          href="/about"
          className="bg-white text-blue-800 px-8 py-3 rounded-full font-bold hover:bg-blue-100 transition duration-300"
        >
          Learn More
        </Link>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-10 z-10 animate-bounce text-white text-4xl"
      >
        <FaArrowDown />
      </motion.div>
    </motion.section>
  );
}
