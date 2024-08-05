"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import { ToolPageWrapper } from "@/components";
import useSound from "use-sound";

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work");

  // Add sound effects
  const [playStart] = useSound("/sounds/blip.mp3");
  const [playStop] = useSound("/sounds/blip.mp3");
  const [playComplete] = useSound("/sounds/complete.mp3");

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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // @ts-ignore
          clearInterval(interval);
          setIsActive(false);
          playComplete(); // Play sound when timer completes
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, playComplete]);

  const toggleTimer = () => {
    if (!isActive) {
      playStart(); // Play start sound
    } else {
      playStop(); // Play stop sound
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    playStop(); // Play stop sound
    switch (mode) {
      case "work":
        setMinutes(25);
        break;
      case "shortBreak":
        setMinutes(5);
        break;
      case "longBreak":
        setMinutes(15);
        break;
    }
    setSeconds(0);
  };

  const changeMode = (newMode: "work" | "shortBreak" | "longBreak") => {
    setMode(newMode);
    setIsActive(false);
    playStop(); // Play stop sound
    switch (newMode) {
      case "work":
        setMinutes(25);
        break;
      case "shortBreak":
        setMinutes(5);
        break;
      case "longBreak":
        setMinutes(15);
        break;
    }
    setSeconds(0);
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
          <h1 className="text-5xl font-bold mb-8">Pomodoro Timer</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="text-6xl font-bold mb-4">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
            <div className="flex justify-center space-x-4">
              <motion.button
                onClick={toggleTimer}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                variants={buttonVariants}
                whileTap="tap"
              >
                {isActive ? <FaPause /> : <FaPlay />}
              </motion.button>
              <motion.button
                onClick={resetTimer}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                variants={buttonVariants}
                whileTap="tap"
              >
                <FaRedo />
              </motion.button>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <motion.button
              onClick={() => changeMode("work")}
              className={`px-4 py-2 rounded-lg ${
                mode === "work" ? "bg-green-500" : "bg-gray-700"
              }`}
              variants={buttonVariants}
              whileTap="tap"
            >
              Work
            </motion.button>
            <motion.button
              onClick={() => changeMode("shortBreak")}
              className={`px-4 py-2 rounded-lg ${
                mode === "shortBreak" ? "bg-blue-500" : "bg-gray-700"
              }`}
              variants={buttonVariants}
              whileTap="tap"
            >
              Short Break
            </motion.button>
            <motion.button
              onClick={() => changeMode("longBreak")}
              className={`px-4 py-2 rounded-lg ${
                mode === "longBreak" ? "bg-purple-500" : "bg-gray-700"
              }`}
              variants={buttonVariants}
              whileTap="tap"
            >
              Long Break
            </motion.button>
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              How to use the Pomodoro Technique
            </h2>
            <ol className="text-left list-decimal list-inside">
              <li>Choose a task to work on</li>
              <li>Set the timer for 25 minutes (Work)</li>
              <li>Work on the task until the timer rings</li>
              <li>Take a short break (5 minutes)</li>
              <li>Repeat steps 1-4 three times</li>
              <li>
                After the fourth work session, take a longer break (15-30
                minutes)
              </li>
            </ol>
          </motion.div>
        </motion.div>
      </motion.main>
    </ToolPageWrapper>
  );
};

export default PomodoroTimer;
