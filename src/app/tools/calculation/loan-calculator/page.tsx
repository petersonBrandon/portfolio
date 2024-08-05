"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCalculator, TbDownload, TbTable } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import { ToolPageWrapper } from "@/components";

interface AmortizationItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface LoanSummary {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("");
  const [loanSummary, setLoanSummary] = useState<LoanSummary | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<
    AmortizationItem[]
  >([]);
  const [showAmortization, setShowAmortization] = useState(false);

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

  const calculateLoan = useCallback(() => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const termInMonths = parseFloat(loanTerm) * 12;

    if (isNaN(principal) || isNaN(rate) || isNaN(termInMonths)) {
      alert("Please enter valid numbers for all fields.");
      return;
    }

    const monthlyPayment =
      (principal * rate * Math.pow(1 + rate, termInMonths)) /
      (Math.pow(1 + rate, termInMonths) - 1);

    const schedule: AmortizationItem[] = [];
    let balance = principal;
    let totalInterest = 0;

    for (let month = 1; month <= termInMonths; month++) {
      const interest = balance * rate;
      const principalPayment = monthlyPayment - interest;
      balance -= principalPayment;
      totalInterest += interest;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest,
        balance: Math.max(0, balance),
      });

      if (balance <= 0) break;
    }

    const totalAmount = principal + totalInterest;

    setLoanSummary({
      monthlyPayment,
      totalInterest,
      totalAmount,
    });
    setAmortizationSchedule(schedule);
  }, [loanAmount, interestRate, loanTerm]);

  const exportToCSV = () => {
    if (amortizationSchedule.length === 0) {
      toast.error("No data to export. Please calculate the loan first.");
      return;
    }

    const headers = ["Month", "Payment", "Principal", "Interest", "Balance"];
    const csvContent = [
      headers.join(","),
      ...amortizationSchedule.map((item) =>
        [
          item.month,
          item.payment.toFixed(2),
          item.principal.toFixed(2),
          item.interest.toFixed(2),
          item.balance.toFixed(2),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "amortization_schedule.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast.success("Amortization schedule exported successfully!");
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
          <h1 className="text-5xl font-bold mb-8">Loan Calculator</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-md mx-auto"
        >
          <div className="mb-4 space-y-4">
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Loan Amount"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
            />
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Interest Rate (%)"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
            />
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="Loan Term (years)"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>

          <motion.button
            onClick={calculateLoan}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-300 flex justify-center items-center"
            variants={buttonVariants}
            whileTap="tap"
          >
            <TbCalculator size={24} className="mr-2" /> Calculate
          </motion.button>

          {loanSummary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center space-y-2"
            >
              <div className="p-3 rounded-lg bg-gray-800 flex justify-between items-center">
                <h2 className="text-xl text-gray-400 font-bold">
                  Monthly Payment
                </h2>
                <p className="text-2xl">
                  ${loanSummary.monthlyPayment.toFixed(2)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-800 flex justify-between items-center">
                <h2 className="text-xl text-gray-400 font-bold">
                  Total Interest Paid
                </h2>
                <p className="text-2xl">
                  ${loanSummary.totalInterest.toFixed(2)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-800 flex justify-between items-center">
                <h2 className="text-xl text-gray-400 font-bold">
                  Total Amount Paid
                </h2>
                <p className="text-2xl">
                  ${loanSummary.totalAmount.toFixed(2)}
                </p>
              </div>
            </motion.div>
          )}

          {amortizationSchedule.length > 0 && (
            <div className="flex space-x-2 mt-4">
              <motion.button
                onClick={() => setShowAmortization(!showAmortization)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors duration-300 flex justify-center items-center"
                variants={buttonVariants}
                whileTap="tap"
              >
                <TbTable size={24} className="mr-2" />{" "}
                {showAmortization ? "Hide" : "Show"} Schedule
              </motion.button>
              <motion.button
                onClick={exportToCSV}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-300 flex justify-center items-center"
                variants={buttonVariants}
                whileTap="tap"
              >
                <TbDownload size={24} />
              </motion.button>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {showAmortization && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-4xl mx-auto overflow-x-auto"
            >
              <h2 className="text-xl font-bold mb-4">Amortization Schedule</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 lg:text-2xl">Month</th>
                    <th className="text-left p-2 lg:text-2xl">Payment</th>
                    <th className="text-left p-2 lg:text-2xl">Principal</th>
                    <th className="text-left p-2 lg:text-2xl">Interest</th>
                    <th className="text-left p-2 lg:text-2xl">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.map((item) => (
                    <tr key={item.month}>
                      <td className="p-2">{item.month}</td>
                      <td className="p-2">${item.payment.toFixed(2)}</td>
                      <td className="p-2">${item.principal.toFixed(2)}</td>
                      <td className="p-2">${item.interest.toFixed(2)}</td>
                      <td className="p-2">${item.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default LoanCalculator;
