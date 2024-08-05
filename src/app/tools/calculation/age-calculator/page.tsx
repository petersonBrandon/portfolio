"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCalculator } from "react-icons/tb";

import { ToolPageWrapper } from "@/components";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);

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

  const calculateAge = useCallback(() => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const now = new Date();

    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365.25);
    const months = Math.floor((diffDays % 365.25) / 30.44);
    const days = Math.floor((diffDays % 365.25) % 30.44);
    const hours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    setResult({ years, months, days, hours, minutes, seconds });
  }, [birthDate]);

  useEffect(() => {
    if (result) {
      const timer = setInterval(calculateAge, 1000);
      return () => clearInterval(timer);
    }
  }, [result, calculateAge]);

  const getInterestingFacts = (result: AgeResult) => {
    const totalMonths = result.years * 12 + result.months;
    const totalDays = Math.floor(
      (new Date().getTime() - new Date(birthDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const totalHours = totalDays * 24 + result.hours;
    const totalMinutes = totalHours * 60 + result.minutes;
    const totalSeconds = totalMinutes * 60 + result.seconds;

    return {
      totalMonths,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
    };
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
          <h1 className="text-5xl font-bold mb-8">Age Calculator</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-3xl mx-auto"
        >
          <div className="mb-4">
            <label htmlFor="birthDate" className="block mb-2">
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>

          <motion.button
            onClick={calculateAge}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-300 flex justify-center items-center"
            variants={buttonVariants}
            whileTap="tap"
          >
            <TbCalculator size={24} className="mr-2" />
            Calculate Age
          </motion.button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 bg-gray-800 rounded-lg p-6"
              >
                <h2 className="text-xl font-bold mb-4">You are:</h2>
                <div className="flex flex-wrap justify-between items-center mb-8">
                  <span className="text-2xl flex flex-col justify-center items-center">
                    <p>{result.years}</p> <p>years</p>
                  </span>
                  <span className="text-2xl flex flex-col justify-center items-center">
                    <p>{result.months}</p> <p>months</p>
                  </span>
                  <span className="text-2xl flex flex-col justify-center items-center">
                    <p>{result.days}</p> <p>days</p>
                  </span>
                  <span className="text-2xl flex flex-col justify-center items-center">
                    <p>{result.hours}</p> <p>hours</p>
                  </span>
                  <span className="text-2xl flex flex-col justify-center items-center">
                    <p>{result.minutes}</p> <p>minutes</p>
                  </span>
                  <span className="text-2xl flex flex-col justify-center items-center">
                    <p>{result.seconds}</p> <p>seconds</p>
                  </span>
                  <span className="text-2xl flex flex-col justify-center items-center">
                    old
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-4">
                  Time that has passed since your birth:
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(getInterestingFacts(result)).map(
                    ([key, value]) => (
                      <div key={key} className="bg-gray-700 p-4 rounded-lg">
                        <p className="text-lg font-semibold">
                          {value.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-300">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.main>
    </ToolPageWrapper>
  );
};

export default AgeCalculator;
