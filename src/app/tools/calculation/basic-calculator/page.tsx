"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbBackspace, TbEqual, TbHistory } from "react-icons/tb";

import { ToolPageWrapper } from "@/components";

interface HistoryItem {
  calculation: string;
  result: string;
}

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

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

  const handleNumberClick = useCallback((num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  }, []);

  const handleOperationClick = useCallback(
    (operation: string) => {
      if (previousValue === null) {
        setPreviousValue(parseFloat(display));
        setDisplay("0");
        setCurrentOperation(operation);
      } else {
        handleEqual();
        setCurrentOperation(operation);
      }
    },
    [display, previousValue]
  );

  const handleEqual = useCallback(() => {
    if (previousValue !== null && currentOperation) {
      const current = parseFloat(display);
      let result: number;
      switch (currentOperation) {
        case "+":
          result = previousValue + current;
          break;
        case "-":
          result = previousValue - current;
          break;
        case "*":
          result = previousValue * current;
          break;
        case "/":
          result = previousValue / current;
          break;
        default:
          return;
      }
      const calculationString = `${previousValue} ${currentOperation} ${current}`;
      const resultString = result.toString();
      setDisplay(resultString);
      setPreviousValue(null);
      setCurrentOperation(null);

      // Add to history
      setHistory((prev) => {
        const newHistory = [
          { calculation: calculationString, result: resultString },
          ...prev,
        ];
        return newHistory.slice(0, 20); // Keep only the last 20 items
      });
    }
  }, [display, previousValue, currentOperation]);

  const handleClear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setCurrentOperation(null);
  }, []);

  const handleBackspace = useCallback(() => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      const key = event.key;

      if (/^[0-9.]$/.test(key)) {
        handleNumberClick(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperationClick(key);
      } else if (key === "Enter" || key === "=") {
        handleEqual();
      } else if (key === "Backspace") {
        handleBackspace();
      } else if (key === "Escape") {
        handleClear();
      }
    },
    [
      handleNumberClick,
      handleOperationClick,
      handleEqual,
      handleBackspace,
      handleClear,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
          <h1 className="text-5xl font-bold mb-8">Calculator</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-xs mx-auto"
        >
          <div className="mb-4">
            <input
              type="text"
              value={display}
              readOnly
              className="w-full bg-gray-800 text-white text-right px-4 py-2 rounded-lg focus:outline-none text-2xl"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              "7",
              "8",
              "9",
              "/",
              "4",
              "5",
              "6",
              "*",
              "1",
              "2",
              "3",
              "-",
              "0",
              ".",
              "+",
            ].map((btn) => (
              <motion.button
                key={btn}
                onClick={() =>
                  btn === "+" || btn === "-" || btn === "*" || btn === "/"
                    ? handleOperationClick(btn)
                    : handleNumberClick(btn)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-300"
                variants={buttonVariants}
                whileTap="tap"
              >
                {btn}
              </motion.button>
            ))}
            <motion.button
              onClick={handleBackspace}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-300 flex justify-center items-center"
              variants={buttonVariants}
              whileTap="tap"
            >
              <TbBackspace size={24} />
            </motion.button>
            <motion.button
              onClick={handleClear}
              className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg transition-colors duration-300 flex justify-center items-center"
              variants={buttonVariants}
              whileTap="tap"
            >
              C
            </motion.button>
            <motion.button
              onClick={handleEqual}
              className="bg-green-600 hover:bg-green-700 text-white p-2 col-span-2 rounded-lg transition-colors duration-300 flex justify-center items-center"
              variants={buttonVariants}
              whileTap="tap"
            >
              <TbEqual size={24} />
            </motion.button>
            <motion.button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors duration-300 flex justify-center items-center"
              variants={buttonVariants}
              whileTap="tap"
            >
              <TbHistory size={24} />
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-xs mx-auto"
            >
              <h2 className="text-xl font-bold mb-4">History</h2>
              <ul className="space-y-2">
                {history.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.calculation} = {item.result}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </ToolPageWrapper>
  );
};

export default Calculator;
