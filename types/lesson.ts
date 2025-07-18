// types/lesson.ts

import { ReactNode } from "react";

export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

export interface QuizResult {
  questionId: string;
  question: string;
  options: string[];
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
}

export interface QuizResults {
  score: number;
  totalQuestions: number;
  percentage: number;
  results: QuizResult[];
}

export interface QuizComponentProps {
  questions: Question[];
  onComplete: (results: QuizResults) => void;
  onReset: () => void;
}

export interface ResultsComponentProps {
  results: QuizResults;
  onRetakeQuiz: () => void;
}

export interface LessonProps {
  lessonTitle: string;
  moduleTitle: string;
  lessonNumber: number;
  moduleNumber: number;
}

export interface InteractiveCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  children?: ReactNode;
  expandedContent?: ReactNode;
  disabled?: boolean;
}

export interface Section {
  id: string;
  title: string;
  content: string;
}

export interface LessonLayoutProps {
  lessonTitle: string;
  moduleTitle: string;
  lessonNumber: number;
  moduleNumber: number;
  sections: Section[];
  currentSection: number;
  onSectionChange: (index: number) => void;
  children: React.ReactNode;
  isLessonComplete?: boolean;
  onContinue: string;
  completionMessage: string;
}

export interface CompletionBannerProps {
  title: string;
  message: string;
  onContinue?: () => void;
  buttonText?: string;
  icon?: React.ReactNode;
  variant?: "success" | "info" | "warning";
}

export interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}
