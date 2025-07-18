// components/lesson/QuizComponent.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import {
  QuizComponentProps,
  QuizResult,
  QuizResults,
} from "../../../types/lesson";

export default function QuizComponent({
  questions,
  onComplete,
  onReset,
}: QuizComponentProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex.toString(),
    }));
  };

  const handleSubmit = () => {
    const results = getDetailedResults();
    setShowResults(true);
    onComplete(results);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    onReset();
  };

  const getDetailedResults = (): QuizResults => {
    let correct = 0;
    const results: QuizResult[] = questions.map((q) => {
      const userAnswer = parseInt(answers[q.id] || "-1");
      const isCorrect = userAnswer === q.correct;
      if (isCorrect) correct++;

      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        userAnswer,
        correctAnswer: q.correct,
        isCorrect,
      };
    });

    return {
      score: correct,
      totalQuestions: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
      results,
    };
  };

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gray-100 border-2 border-black p-6">
        <h3 className="font-black text-lg uppercase tracking-wider mb-4">
          Quick Knowledge Check
        </h3>

        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <div
              key={question.id}
              className="bg-white border-2 border-gray-300 p-4"
            >
              <h4 className="font-bold text-sm mb-4">
                {qIndex + 1}. {question.question}
              </h4>

              <div className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <motion.label
                    key={oIndex}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`flex items-center p-3 border-2 cursor-pointer transition-all ${
                      answers[question.id] === oIndex.toString()
                        ? "bg-cyan-100 border-cyan-400"
                        : "border-gray-200 hover:bg-gray-50"
                    } ${
                      showResults && oIndex === question.correct
                        ? "bg-green-100 border-green-400"
                        : ""
                    } ${
                      showResults &&
                      answers[question.id] === oIndex.toString() &&
                      oIndex !== question.correct
                        ? "bg-red-100 border-red-400"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={oIndex}
                      checked={answers[question.id] === oIndex.toString()}
                      onChange={() => handleAnswerSelect(question.id, oIndex)}
                      className="mr-3"
                      disabled={showResults}
                    />
                    <span className="text-sm">{option}</span>
                    {showResults && oIndex === question.correct && (
                      <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                    )}
                  </motion.label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!showResults && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            className="mt-6 bg-cyan-400 hover:bg-cyan-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-bold py-3 px-6 border-2 border-black uppercase tracking-wider text-sm transition-all"
          >
            Check Answers
          </motion.button>
        )}

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-cyan-50 border-2 border-cyan-400"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg mb-2">Results</h4>
                <p className="text-sm">
                  You got {getDetailedResults().score} out of {questions.length}{" "}
                  questions correct! ({getDetailedResults().percentage}%)
                </p>
                {getDetailedResults().score === questions.length && (
                  <p className="text-sm text-green-600 mt-2">
                    🎉 Perfect! You're ready for the next lesson!
                  </p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 border-2 border-black uppercase tracking-wider text-sm transition-all"
              >
                Reset Quiz
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
