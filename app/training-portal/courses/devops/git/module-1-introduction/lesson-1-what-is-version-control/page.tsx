"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Copy,
  Users,
  GitBranch,
  CheckCircle,
  XCircle,
  Lightbulb,
  Timer,
  Network,
} from "lucide-react";
import InteractiveCard from "../../../../../../../components/training/lesson/InteractiveCard";
import QuizComponent from "../../../../../../../components/training/lesson/QuizComponent";
import LessonLayout from "../../../../../../../components/training/lesson/LessonLayout";
import ResultsComponent from "../../../../../../../components/training/lesson/ResultsComponent";
import { LessonProps, QuizResults } from "../../../../../../../types/lesson";

export default function WhatIsVersionControlLesson() {
  const lessonDetails: LessonProps = {
    lessonTitle: "What is Version Control?",
    moduleTitle: "Introduction",
    lessonNumber: 1,
    moduleNumber: 1,
  };

  const [currentSection, setCurrentSection] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const sections = [
    { id: "intro", title: "The Problem", content: "intro" },
    {
      id: "manual-vs-vcs",
      title: "Manual Backups vs. VCS",
      content: "comparison",
    },
    {
      id: "centralized-vs-distributed",
      title: "Centralized vs. Distributed",
      content: "systems",
    },
    { id: "quiz", title: "Quick Check", content: "quiz" },
  ];

  const handleQuizComplete = (results: QuizResults) => {
    setQuizCompleted(true);
    setQuizResults(results);
    setShowResults(true);
  };

  const handleQuizReset = () => {
    setQuizCompleted(false);
    setQuizResults(null);
    setShowResults(false);
  };

  const handleRetakeQuiz = () => {
    setShowResults(false);
    setQuizResults(null);
  };

  // All your existing section components stay the same...
  const IntroSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-cyan-50 border-2 border-cyan-400 p-6">
        <div className="flex items-center mb-4">
          <Lightbulb className="h-6 w-6 text-cyan-600 mr-3" />
          <h3 className="font-black text-lg uppercase tracking-wider">
            The Scenario
          </h3>
        </div>
        <p className="text-gray-700 mb-4">
          {`Imagine you\'re working on a school project - a 50-page research paper.
          You\'ve been working on it for weeks, and you\'re terrified of losing
          your work.`}
        </p>
        <InteractiveFileExample />
      </div>

      <div className="bg-gray-100 border-2 border-black p-6">
        <h3 className="font-black text-lg uppercase tracking-wider mb-4">
          {`What You\'ll Learn`}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border-2 border-gray-300 p-4">
            <FileText className="h-6 w-6 text-gray-600 mb-2" />
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
              Manual Backups
            </h4>
            <p className="text-xs text-gray-600">
              Traditional file copying vs. modern version control
            </p>
          </div>
          <div className="bg-white border-2 border-gray-300 p-4">
            <Network className="h-6 w-6 text-gray-600 mb-2" />
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
              System Types
            </h4>
            <p className="text-xs text-gray-600">
              Centralized vs. distributed version control
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const InteractiveFileExample = () => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const files = [
      {
        name: "research_paper.docx",
        version: "Original",
        date: "Jan 15",
        issues: ["What if it gets corrupted?"],
      },
      {
        name: "research_paper_backup.docx",
        version: "Backup",
        date: "Jan 16",
        issues: ["Which is the latest?"],
      },
      {
        name: "research_paper_final.docx",
        version: "Final",
        date: "Jan 20",
        issues: ["Is this really final?"],
      },
      {
        name: "research_paper_final_v2.docx",
        version: "Final v2",
        date: "Jan 22",
        issues: ["Confusing naming!"],
      },
      {
        name: "research_paper_FINAL_FINAL.docx",
        version: "Final Final",
        date: "Jan 25",
        issues: ["This is getting ridiculous!"],
      },
    ];

    return (
      <div className="mt-6">
        <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
          Your Project Folder (Click to explore)
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {files.map((file) => (
            <InteractiveCard
              key={file.name}
              title={file.name}
              subtitle={`${file.date} • ${file.version}`}
              icon={<FileText className="h-4 w-4 text-gray-600" />}
              isSelected={selectedFile === file.name}
              onClick={() =>
                setSelectedFile(selectedFile === file.name ? null : file.name)
              }
              expandedContent={
                <div>
                  <p className="text-xs text-red-600 font-medium">Issues:</p>
                  <ul className="text-xs text-gray-600 mt-1">
                    {file.issues.map((issue, i) => (
                      <li key={i} className="flex items-center">
                        <XCircle className="h-3 w-3 text-red-500 mr-1" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          ))}
        </div>
      </div>
    );
  };

  const ComparisonSection = () => {
    const [activeTab, setActiveTab] = useState<"manual" | "vcs">("manual");
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-gray-100 border-2 border-black p-6">
          <h3 className="font-black text-lg uppercase tracking-wider mb-4">
            Manual Backups vs. Version Control
          </h3>
          <div className="flex border-2 border-gray-300 bg-white">
            <button
              onClick={() => setActiveTab("manual")}
              className={`flex-1 p-4 font-bold text-sm uppercase tracking-wider transition-all ${
                activeTab === "manual"
                  ? "bg-red-400 text-black"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Manual Backups
            </button>
            <button
              onClick={() => setActiveTab("vcs")}
              className={`flex-1 p-4 font-bold text-sm uppercase tracking-wider transition-all ${
                activeTab === "vcs"
                  ? "bg-green-400 text-black"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Version Control
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "manual" && (
              <motion.div
                key="manual"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-red-50 border-2 border-red-300 p-6 mt-4"
              >
                <div className="flex items-center mb-4">
                  <XCircle className="h-6 w-6 text-red-600 mr-3" />
                  <h4 className="font-bold text-lg">Manual Backup Problems</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Copy className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">
                        Confusing file names
                      </p>
                      <p className="text-xs text-gray-600">
                        project_final_v2_REAL_final.docx
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Timer className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">No change tracking</p>
                      <p className="text-xs text-gray-600">
                        What changed between versions?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">
                        Collaboration nightmare
                      </p>
                      <p className="text-xs text-gray-600">
                        Emailing files back and forth
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "vcs" && (
              <motion.div
                key="vcs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-green-50 border-2 border-green-300 p-6 mt-4"
              >
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <h4 className="font-bold text-lg">
                    Version Control Benefits
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <GitBranch className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">
                        Automatic versioning
                      </p>
                      <p className="text-xs text-gray-600">
                        Every change is tracked with a message
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Timer className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Complete history</p>
                      <p className="text-xs text-gray-600">
                        See exactly what changed and when
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">
                        Seamless collaboration
                      </p>
                      <p className="text-xs text-gray-600">
                        Multiple people can work simultaneously
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  const SystemsSection = () => {
    const [selectedSystem, setSelectedSystem] = useState<
      "centralized" | "distributed" | null
    >(null);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-gray-100 border-2 border-black p-6">
          <h3 className="font-black text-lg uppercase tracking-wider mb-4">
            Centralized vs. Distributed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InteractiveCard
              title="Centralized"
              subtitle="One central server holds everything"
              icon={<Network className="h-6 w-6 text-blue-600" />}
              isSelected={selectedSystem === "centralized"}
              onClick={() =>
                setSelectedSystem(
                  selectedSystem === "centralized" ? null : "centralized"
                )
              }
              expandedContent={
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                    <span>Simple to understand</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                    <span>Easy access control</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <XCircle className="h-3 w-3 text-red-500 mr-1" />
                    <span>Single point of failure</span>
                  </div>
                </div>
              }
            />

            <InteractiveCard
              title="Distributed"
              subtitle="Everyone has the complete history"
              icon={<GitBranch className="h-6 w-6 text-green-600" />}
              isSelected={selectedSystem === "distributed"}
              onClick={() =>
                setSelectedSystem(
                  selectedSystem === "distributed" ? null : "distributed"
                )
              }
              expandedContent={
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                    <span>No single point of failure</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                    <span>Work offline</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <XCircle className="h-3 w-3 text-red-500 mr-1" />
                    <span>Steeper learning curve</span>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </motion.div>
    );
  };

  const QuizSection = () => {
    const questions = [
      {
        id: "q1",
        question: "What is a major problem with manual backups?",
        options: [
          "They take up too much disk space",
          "File names become confusing and hard to track",
          "They are too secure",
          "They work too well",
        ],
        correct: 1,
      },
      {
        id: "q2",
        question: "In a distributed version control system:",
        options: [
          "Only one person can work at a time",
          "You need internet for all operations",
          "Everyone has the complete project history",
          "There is always a central server",
        ],
        correct: 2,
      },
      {
        id: "q3",
        question: "Git is an example of which type of version control?",
        options: ["Centralized", "Distributed", "Manual", "Automated"],
        correct: 1,
      },
    ];

    if (showResults && quizResults) {
      return (
        <ResultsComponent
          results={quizResults}
          onRetakeQuiz={handleRetakeQuiz}
        />
      );
    }

    return (
      <QuizComponent
        key="version-control-quiz"
        questions={questions}
        onComplete={handleQuizComplete}
        onReset={handleQuizReset}
      />
    );
  };

  return (
    <LessonLayout
      lessonTitle={lessonDetails.lessonTitle}
      moduleTitle={lessonDetails.moduleTitle}
      lessonNumber={lessonDetails.lessonNumber}
      moduleNumber={lessonDetails.moduleNumber}
      sections={sections}
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      isLessonComplete={quizCompleted}
      onContinue={
        "/training-portal/courses/devops/git/module-1-introduction/lesson-2-what-is-git"
      }
      completionMessage={
        "Great job! You now understand the basics of version control systems."
      }
    >
      {currentSection === 0 && <IntroSection />}
      {currentSection === 1 && <ComparisonSection />}
      {currentSection === 2 && <SystemsSection />}
      {currentSection === 3 && <QuizSection />}
    </LessonLayout>
  );
}
