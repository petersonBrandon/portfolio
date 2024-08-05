"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbCalculator } from "react-icons/tb";
import { ToolPageWrapper } from "@/components";

const InterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [compoundFrequency, setCompoundFrequency] = useState<string>("12");
  const [interestType, setInterestType] = useState<"simple" | "compound">(
    "compound"
  );
  const [contribution, setContribution] = useState<string>("");
  const [contributionFrequency, setContributionFrequency] =
    useState<string>("12");
  const [result, setResult] = useState<{
    total: number;
    interest: number;
    contributions: number;
  } | null>(null);

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

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundFrequency);
    const c = parseFloat(contribution) || 0;
    const cf = parseFloat(contributionFrequency);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n) || isNaN(cf)) {
      toast.error("Please enter valid numbers for all required fields");
      return;
    }

    let totalAmount: number;
    let interestEarned: number;
    let totalContributions: number = 0;

    if (interestType === "simple") {
      totalAmount = p * (1 + r * t);
      totalContributions = c * cf * t;
      totalAmount += totalContributions;
      interestEarned = totalAmount - p - totalContributions;
    } else {
      const ratePerPeriod = r / n;
      const periodsPerYear = n;
      const totalPeriods = t * periodsPerYear;

      if (c > 0) {
        const contributionsPerPeriod = c * (cf / n);
        totalAmount =
          p * Math.pow(1 + ratePerPeriod, totalPeriods) +
          (contributionsPerPeriod *
            (Math.pow(1 + ratePerPeriod, totalPeriods) - 1)) /
            ratePerPeriod;
        totalContributions = contributionsPerPeriod * totalPeriods;
      } else {
        totalAmount = p * Math.pow(1 + ratePerPeriod, totalPeriods);
      }
      interestEarned = totalAmount - p - totalContributions;
    }

    setResult({
      total: Number(totalAmount.toFixed(2)),
      interest: Number(interestEarned.toFixed(2)),
      contributions: Number(totalContributions.toFixed(2)),
    });
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
          <h1 className="text-5xl font-bold mb-8">Interest Calculator</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="mb-6">
            <label
              htmlFor="principal"
              className="block mb-2 text-lg font-semibold"
            >
              Principal Amount:
            </label>
            <input
              type="number"
              id="principal"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
              placeholder="Enter principal amount"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="rate" className="block mb-2 text-lg font-semibold">
              Annual Interest Rate (%):
            </label>
            <input
              type="number"
              id="rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
              placeholder="Enter interest rate"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="time" className="block mb-2 text-lg font-semibold">
              Time (in years):
            </label>
            <input
              type="number"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
              placeholder="Enter time in years"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-lg font-semibold">
              Interest Type:
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="interestType"
                  value="simple"
                  checked={interestType === "simple"}
                  onChange={() => setInterestType("simple")}
                />
                <span className="ml-2">Simple Interest</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="interestType"
                  value="compound"
                  checked={interestType === "compound"}
                  onChange={() => setInterestType("compound")}
                />
                <span className="ml-2">Compound Interest</span>
              </label>
            </div>
          </div>

          {interestType === "compound" && (
            <div className="mb-6">
              <label
                htmlFor="compoundFrequency"
                className="block mb-2 text-lg font-semibold"
              >
                Compound Frequency:
              </label>
              <select
                id="compoundFrequency"
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
              >
                <option value="1">Annually</option>
                <option value="2">Semi-annually</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
                <option value="52">Weekly</option>
                <option value="365">Daily</option>
              </select>
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="contribution"
              className="block mb-2 text-lg font-semibold"
            >
              Regular Contribution (optional):
            </label>
            <input
              type="number"
              id="contribution"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
              placeholder="Enter contribution amount"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="contributionFrequency"
              className="block mb-2 text-lg font-semibold"
            >
              Contribution Frequency:
            </label>
            <select
              id="contributionFrequency"
              value={contributionFrequency}
              onChange={(e) => setContributionFrequency(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
            >
              <option value="1">Annually</option>
              <option value="2">Semi-annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="52">Weekly</option>
              <option value="365">Daily</option>
            </select>
          </div>

          <motion.button
            onClick={calculateInterest}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
            variants={buttonVariants}
            whileTap="tap"
          >
            <TbCalculator size={24} className="mr-2" />
            Calculate Interest
          </motion.button>

          {result !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gray-800 text-white p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2">Result:</h3>
              <p>Total Amount: ${formatNumber(result.total)}</p>
              <p>Interest Earned: ${formatNumber(result.interest)}</p>
              <p>Total Contributions: ${formatNumber(result.contributions)}</p>
            </motion.div>
          )}
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default InterestCalculator;
