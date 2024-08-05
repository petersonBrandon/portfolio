"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaRedo, FaClock, FaStopwatch } from "react-icons/fa";
import { ToolPageWrapper } from "@/components";
import useSound from "use-sound";

const StopwatchTimer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"stopwatch" | "timer">("stopwatch");
  const [inputHours, setInputHours] = useState("");
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");

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
        setTime((prevTime) => {
          if (mode === "stopwatch") {
            return prevTime + 1;
          } else if (prevTime > 0) {
            return prevTime - 1;
          } else {
            // @ts-ignore
            clearInterval(interval);
            setIsActive(false);
            playComplete(); // Play sound when timer completes
            return 0;
          }
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, mode, playComplete]);

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
    setTime(0);
    setInputHours("");
    setInputMinutes("");
    setInputSeconds("");
  };

  const changeMode = (newMode: "stopwatch" | "timer") => {
    setMode(newMode);
    resetTimer();
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    const totalSeconds =
      (parseInt(inputHours) || 0) * 3600 +
      (parseInt(inputMinutes) || 0) * 60 +
      (parseInt(inputSeconds) || 0);

    if (totalSeconds > 0) {
      setTime(totalSeconds);
      setIsActive(true);
      playStart(); // Play start sound
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
          <h1 className="text-5xl font-bold mb-8">Stopwatch & Timer</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="text-6xl font-bold mb-4">{formatTime(time)}</div>
            <div className="flex justify-center space-x-4 mb-4">
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
            <div className="flex justify-center space-x-4">
              <motion.button
                onClick={() => changeMode("stopwatch")}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  mode === "stopwatch" ? "bg-green-500" : "bg-gray-700"
                }`}
                variants={buttonVariants}
                whileTap="tap"
              >
                <FaStopwatch className="mr-2" /> Stopwatch
              </motion.button>
              <motion.button
                onClick={() => changeMode("timer")}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  mode === "timer" ? "bg-purple-500" : "bg-gray-700"
                }`}
                variants={buttonVariants}
                whileTap="tap"
              >
                <FaClock className="mr-2" /> Timer
              </motion.button>
            </div>
          </div>

          {mode === "timer" && !isActive && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-4 mb-4"
            >
              <input
                type="number"
                placeholder="HH"
                min="0"
                max="23"
                value={inputHours}
                onChange={(e) => setInputHours(e.target.value)}
                className="w-16 px-2 py-1 bg-gray-800 text-white rounded"
              />
              <input
                type="number"
                placeholder="MM"
                min="0"
                max="59"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                className="w-16 px-2 py-1 bg-gray-800 text-white rounded"
              />
              <input
                type="number"
                placeholder="SS"
                min="0"
                max="59"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(e.target.value)}
                className="w-16 px-2 py-1 bg-gray-800 text-white rounded"
              />
              <motion.button
                onClick={startTimer}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded-lg transition-colors duration-300"
                variants={buttonVariants}
                whileTap="tap"
              >
                Set
              </motion.button>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="text-center mt-8">
            <h2 className="text-2xl font-semibold mb-4">How to use</h2>
            <ul className="text-left list-disc list-inside">
              <li>Choose between Stopwatch and Timer mode</li>
              <li>
                For Stopwatch: Click Play to start, Pause to stop, and Reset to
                clear
              </li>
              <li>
                For Timer: Set hours, minutes, and seconds, then click Set to
                start the countdown
              </li>
              <li>The timer will play a sound when it completes</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.main>
    </ToolPageWrapper>
  );
};

export default StopwatchTimer;
