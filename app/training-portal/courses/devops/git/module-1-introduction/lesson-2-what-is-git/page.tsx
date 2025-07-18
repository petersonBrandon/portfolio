"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  GitBranch,
  CheckCircle,
  XCircle,
  Lightbulb,
  Database,
  Network,
  Zap,
} from "lucide-react";
import InteractiveCard from "../../../../../../../components/training/lesson/InteractiveCard";
import QuizComponent from "../../../../../../../components/training/lesson/QuizComponent";
import LessonLayout from "../../../../../../../components/training/lesson/LessonLayout";
import ResultsComponent from "../../../../../../../components/training/lesson/ResultsComponent";
import { LessonProps, QuizResults } from "../../../../../../../types/lesson";

export default function WhatIsGitLesson() {
  const lessonDetails: LessonProps = {
    lessonTitle: "What is Git and Why Use It?",
    moduleTitle: "Introduction",
    lessonNumber: 2,
    moduleNumber: 1,
  };
  const [currentSection, setCurrentSection] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const sections = [
    { id: "history", title: "History of Git", content: "history" },
    { id: "comparisons", title: "Git vs Others", content: "comparisons" },
    { id: "use-cases", title: "Use Cases", content: "use-cases" },
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

  const HistorySection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-cyan-50 border-2 border-cyan-400 p-6">
        <div className="flex items-center mb-4">
          <Clock className="h-6 w-6 text-cyan-600 mr-3" />
          <h3 className="font-black text-lg uppercase tracking-wider">
            The Birth of Git
          </h3>
        </div>
        <GitTimelineInteractive />
      </div>
    </motion.div>
  );

  const GitTimelineInteractive = () => {
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    const events = [
      {
        id: "2005-problem",
        year: "2005",
        title: "The Problem",
        description: "BitKeeper license withdrawn from Linux kernel project",
        details:
          "Linux kernel development used proprietary BitKeeper VCS. When free license was revoked, Linus Torvalds needed a replacement.",
        icon: <XCircle className="h-5 w-5 text-red-600" />,
        color: "red",
      },
      {
        id: "2005-creation",
        year: "2005",
        title: "Git is Born",
        description: "Linus Torvalds creates Git in just 2 weeks",
        details:
          "Designed for speed, distributed workflow, and handling large projects with thousands of contributors efficiently.",
        icon: <Lightbulb className="h-5 w-5 text-yellow-600" />,
        color: "yellow",
      },
      {
        id: "2005-adoption",
        year: "2005",
        title: "Linux Adoption",
        description: "Linux kernel switches to Git within months",
        details:
          "Proved Git could handle one of the world's largest open source projects with complex branching and merging needs.",
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        color: "green",
      },
      {
        id: "2008-github",
        year: "2008",
        title: "GitHub Launch",
        description: "GitHub makes Git accessible to everyone",
        details:
          "Web-based hosting service with pull requests, issue tracking, and social features accelerated Git adoption.",
        icon: <Network className="h-5 w-5 text-blue-600" />,
        color: "blue",
      },
    ];

    return (
      <div className="space-y-4">
        {events.map((event) => (
          <InteractiveCard
            key={event.id}
            title={`${event.year}: ${event.title}`}
            subtitle={event.description}
            icon={event.icon}
            isSelected={selectedEvent === event.id}
            onClick={() =>
              setSelectedEvent(selectedEvent === event.id ? null : event.id)
            }
            expandedContent={
              <div className="mt-3 p-3 bg-white border-2 border-gray-200">
                <p className="text-sm text-gray-700">{event.details}</p>
              </div>
            }
          />
        ))}
      </div>
    );
  };

  const ComparisonsSection = () => {
    const [activeComparison, setActiveComparison] = useState<
      "svn" | "mercurial"
    >("svn");

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-gray-100 border-2 border-black p-6">
          <h3 className="font-black text-lg uppercase tracking-wider mb-4">
            Git vs. Other Version Control Systems
          </h3>

          <div className="flex border-2 border-gray-300 bg-white mb-4">
            <button
              onClick={() => setActiveComparison("svn")}
              className={`flex-1 p-4 font-bold text-sm uppercase tracking-wider transition-all ${
                activeComparison === "svn"
                  ? "bg-blue-400 text-black"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Git vs SVN
            </button>
            <button
              onClick={() => setActiveComparison("mercurial")}
              className={`flex-1 p-4 font-bold text-sm uppercase tracking-wider transition-all ${
                activeComparison === "mercurial"
                  ? "bg-purple-400 text-black"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Git vs Mercurial
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeComparison === "svn" && (
              <motion.div
                key="svn"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="bg-green-50 border-2 border-green-300 p-4">
                  <h4 className="font-bold text-lg mb-3 text-green-700">
                    Git Advantages
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Database className="h-4 w-4 text-green-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Distributed</p>
                        <p className="text-xs text-gray-600">
                          Full history on every machine
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <GitBranch className="h-4 w-4 text-green-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Fast branching</p>
                        <p className="text-xs text-gray-600">
                          Create branches in milliseconds
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Zap className="h-4 w-4 text-green-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Works offline</p>
                        <p className="text-xs text-gray-600">
                          Commit, branch, merge without network
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border-2 border-orange-300 p-4">
                  <h4 className="font-bold text-lg mb-3 text-orange-700">
                    SVN Advantages
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Simpler model</p>
                        <p className="text-xs text-gray-600">
                          Easier to understand initially
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Database className="h-4 w-4 text-orange-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">
                          Better for binaries
                        </p>
                        <p className="text-xs text-gray-600">
                          Handles large binary files well
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-4 w-4 text-orange-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">
                          Centralized control
                        </p>
                        <p className="text-xs text-gray-600">
                          Easier permission management
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeComparison === "mercurial" && (
              <motion.div
                key="mercurial"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="bg-green-50 border-2 border-green-300 p-4">
                  <h4 className="font-bold text-lg mb-3 text-green-700">
                    Git Advantages
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Network className="h-4 w-4 text-green-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Larger ecosystem</p>
                        <p className="text-xs text-gray-600">
                          GitHub, GitLab, extensive tooling
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <GitBranch className="h-4 w-4 text-green-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">
                          Powerful branching
                        </p>
                        <p className="text-xs text-gray-600">
                          Advanced merge strategies
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Zap className="h-4 w-4 text-green-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">
                          Better performance
                        </p>
                        <p className="text-xs text-gray-600">
                          Faster on large repositories
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border-2 border-purple-300 p-4">
                  <h4 className="font-bold text-lg mb-3 text-purple-700">
                    Mercurial Advantages
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Simpler commands</p>
                        <p className="text-xs text-gray-600">
                          More consistent interface
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Database className="h-4 w-4 text-purple-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">
                          Better Windows support
                        </p>
                        <p className="text-xs text-gray-600">
                          Historically more Windows-friendly
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-4 w-4 text-purple-600 mr-2 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Consistent UI</p>
                        <p className="text-xs text-gray-600">
                          Less confusing command variations
                        </p>
                      </div>
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

  const UseCasesSection = () => {
    const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);

    const useCases = [
      {
        id: "solo",
        title: "Solo Development",
        icon: <Users className="h-6 w-6 text-blue-600" />,
        description: "Perfect for individual projects",
        benefits: [
          "Track changes and experiment safely",
          "Maintain different versions",
          "Backup across multiple locations",
          "Document development process",
        ],
        example: "Personal website, mobile app, or research project",
      },
      {
        id: "team",
        title: "Team Development",
        icon: <Network className="h-6 w-6 text-green-600" />,
        description: "Essential for collaborative projects",
        benefits: [
          "Multiple developers on same codebase",
          "Coordinate changes and resolve conflicts",
          "Code reviews before merging",
          "Track contributions and changes",
        ],
        example: "Startup product, corporate software, or team hackathon",
      },
      {
        id: "opensource",
        title: "Open Source Projects",
        icon: <GitBranch className="h-6 w-6 text-purple-600" />,
        description: "Enables global collaboration",
        benefits: [
          "Anyone can contribute via forks",
          "Maintainers review and merge",
          "Complete contribution history",
          "Distributed development worldwide",
        ],
        example: "Linux kernel, React, or any GitHub project",
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-gray-100 border-2 border-black p-6">
          <h3 className="font-black text-lg uppercase tracking-wider mb-4">
            Git Use Cases
          </h3>
          <div className="space-y-4">
            {useCases.map((useCase) => (
              <InteractiveCard
                key={useCase.id}
                title={useCase.title}
                subtitle={useCase.description}
                icon={useCase.icon}
                isSelected={selectedUseCase === useCase.id}
                onClick={() =>
                  setSelectedUseCase(
                    selectedUseCase === useCase.id ? null : useCase.id
                  )
                }
                expandedContent={
                  <div className="mt-3 space-y-3">
                    <div className="bg-white border-2 border-gray-200 p-3">
                      <p className="font-medium text-sm mb-2">Benefits:</p>
                      <ul className="space-y-1">
                        {useCase.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start text-xs">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-cyan-50 border-2 border-cyan-200 p-3">
                      <p className="font-medium text-sm">Example:</p>
                      <p className="text-xs text-gray-600">{useCase.example}</p>
                    </div>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const QuizSection = () => {
    const questions = [
      {
        id: "q1",
        question: "Who created Git and when?",
        options: [
          "Bill Gates in 2000",
          "Linus Torvalds in 2005",
          "Mark Zuckerberg in 2008",
          "Tim Berners-Lee in 1999",
        ],
        correct: 1,
      },
      {
        id: "q2",
        question: "What is a major advantage of Git over SVN?",
        options: [
          "Git is centralized",
          "Git requires internet for all operations",
          "Git has distributed architecture with offline capabilities",
          "Git only works on Linux",
        ],
        correct: 2,
      },
      {
        id: "q3",
        question: "Which use case is NOT ideal for Git?",
        options: [
          "Solo development projects",
          "Team collaboration on software",
          "Open source projects",
          "None - Git works well for all of these",
        ],
        correct: 3,
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
        key="what-is-git-quiz"
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
        "/training-portal/courses/devops/git/module-1-introduction/lesson-3-course-overview"
      }
      completionMessage={
        "Excellent! You now understand what Git is and why it's so powerful."
      }
    >
      {currentSection === 0 && <HistorySection />}
      {currentSection === 1 && <ComparisonsSection />}
      {currentSection === 2 && <UseCasesSection />}
      {currentSection === 3 && <QuizSection />}
    </LessonLayout>
  );
}
