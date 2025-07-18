// components/lesson/ResultsComponent.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { ResultsComponentProps } from "../../../types/lesson";

export default function ResultsComponent({
  results,
  onRetakeQuiz,
}: ResultsComponentProps) {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-50 border-green-400";
    if (percentage >= 70) return "bg-yellow-50 border-yellow-400";
    return "bg-red-50 border-red-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gray-100 border-2 border-black p-6">
        <h3 className="font-black text-lg uppercase tracking-wider mb-4">
          Quiz Results
        </h3>

        {/* Score Summary */}
        <div
          className={`p-6 border-2 mb-6 ${getScoreBgColor(results.percentage)}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Trophy className="h-8 w-8 text-gray-600 mr-3" />
              <div>
                <h4 className="font-bold text-xl">
                  {results.score}/{results.totalQuestions}
                </h4>
                <p
                  className={`text-2xl font-black ${getScoreColor(
                    results.percentage
                  )}`}
                >
                  {results.percentage}%
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetakeQuiz}
              className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 border-2 border-black uppercase tracking-wider text-sm transition-all flex items-center"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </motion.button>
          </div>

          {results.percentage === 100 && (
            <p className="text-green-600 font-medium">
              🎉 Perfect score! You've mastered this topic!
            </p>
          )}
          {results.percentage >= 70 && results.percentage < 100 && (
            <p className="text-yellow-600 font-medium">
              👍 Good job! You're ready to move on.
            </p>
          )}
          {results.percentage < 70 && (
            <p className="text-red-600 font-medium">
              📚 Consider reviewing the material and retaking the quiz.
            </p>
          )}
        </div>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h4 className="font-bold text-lg uppercase tracking-wider">
            Question Review
          </h4>

          {results.results.map((result, index) => (
            <motion.div
              key={result.questionId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-2 border-gray-300 p-4"
            >
              <div className="flex items-start mb-3">
                {result.isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h5 className="font-bold text-sm mb-2">
                    {index + 1}. {result.question}
                  </h5>

                  {/* Show user's answer if wrong */}
                  {!result.isCorrect && result.userAnswer >= 0 && (
                    <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded">
                      <p className="text-xs text-red-700 font-medium">
                        Your answer:
                      </p>
                      <p className="text-sm text-red-800">
                        {result.options[result.userAnswer]}
                      </p>
                    </div>
                  )}

                  {/* Show correct answer */}
                  <div className="p-2 bg-green-50 border border-green-200 rounded">
                    <p className="text-xs text-green-700 font-medium">
                      Correct answer:
                    </p>
                    <p className="text-sm text-green-800">
                      {result.options[result.correctAnswer]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
