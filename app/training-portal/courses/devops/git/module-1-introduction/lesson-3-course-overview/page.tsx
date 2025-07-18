"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Target,
  Users,
  Code,
  CheckCircle,
  XCircle,
  Lightbulb,
  Trophy,
  Zap,
  Clock,
  ArrowRight,
  Star,
  Puzzle,
  Play,
} from "lucide-react";
import InteractiveCard from "../../../../../../../components/training/lesson/InteractiveCard";
import QuizComponent from "../../../../../../../components/training/lesson/QuizComponent";
import LessonLayout from "../../../../../../../components/training/lesson/LessonLayout";
import ResultsComponent from "../../../../../../../components/training/lesson/ResultsComponent";
import { QuizResults } from "../../../../../../../types/lesson";

interface LessonProps {
  lessonTitle: string;
  moduleTitle: string;
  lessonNumber: number;
  moduleNumber: number;
}

export default function CourseOverviewLesson({
  lessonTitle = "Overview of This Course",
  moduleTitle = "Git Fundamentals",
  lessonNumber = 3,
  moduleNumber = 1,
}: LessonProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completed, setCompleted] = useState(false);

  const sections = [
    { id: "intro", title: "What to Expect", content: "intro" },
    {
      id: "learning-path",
      title: "Learning Journey",
      content: "path",
    },
    {
      id: "interactive-features",
      title: "Interactive Features",
      content: "features",
    },
  ];

  const IntroSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-400 p-6">
        <div className="flex items-center mb-4">
          <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
          <h3 className="font-black text-lg uppercase tracking-wider">
            Welcome to Git Fundamentals
          </h3>
        </div>
        <p className="text-gray-700 mb-4">
          {`This comprehensive course will take you through 10 modules covering
          everything from Git basics to advanced workflows and real-world
          scenarios. You\'ll learn through hands-on exercises and interactive
          challenges.`}
        </p>
        <CourseGoalsComponent />
      </div>

      <div className="bg-gray-100 border-2 border-black p-6">
        <h3 className="font-black text-lg uppercase tracking-wider mb-4">
          Course Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border-2 border-gray-300 p-4">
            <Puzzle className="h-6 w-6 text-purple-600 mb-2" />
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
              Interactive Challenges
            </h4>
            <p className="text-xs text-gray-600">
              Hands-on exercises that simulate real-world scenarios
            </p>
          </div>
          <div className="bg-white border-2 border-gray-300 p-4">
            <Target className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
              Progressive Learning
            </h4>
            <p className="text-xs text-gray-600">
              Build skills step-by-step from basics to advanced
            </p>
          </div>
          <div className="bg-white border-2 border-gray-300 p-4">
            <Trophy className="h-6 w-6 text-yellow-600 mb-2" />
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
              Free Access
            </h4>
            <p className="text-xs text-gray-600">
              Complete course with no account required
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const CourseGoalsComponent = () => {
    const goals = [
      {
        icon: <Code className="h-5 w-5 text-blue-600" />,
        title: "Master Git Commands",
        description: "Learn essential Git commands and workflows",
        timeframe: "Modules 1-3",
      },
      {
        icon: <Users className="h-5 w-5 text-green-600" />,
        title: "Collaborate Effectively",
        description: "Work with teams using branching and merging",
        timeframe: "Modules 4-7",
      },
      {
        icon: <Zap className="h-5 w-5 text-yellow-600" />,
        title: "Advanced Workflows",
        description: "Handle complex scenarios and troubleshoot issues",
        timeframe: "Modules 8-10",
      },
    ];

    return (
      <div className="mt-6">
        <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
          {`What You\'ll Achieve`}
        </h4>
        <div className="space-y-3">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="flex items-start bg-white border-2 border-gray-200 p-4 rounded-none"
            >
              <div className="mr-3 mt-1">{goal.icon}</div>
              <div className="flex-1">
                <h5 className="font-bold text-sm">{goal.title}</h5>
                <p className="text-xs text-gray-600 mb-1">{goal.description}</p>
                <span className="text-xs text-blue-600 font-medium">
                  {goal.timeframe}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LearningPathSection = () => {
    const [selectedModule, setSelectedModule] = useState<number | null>(null);

    const modules = [
      {
        number: 1,
        title: "Introduction to Git",
        lessons: 3,
        description:
          "Understanding what Git is, why it's useful, and course overview",
        topics: ["Version Control", "Git vs Other VCS", "Course Structure"],
        difficulty: "Beginner",
        estimatedTime: "1-2 hours",
      },
      {
        number: 2,
        title: "Getting Started",
        lessons: 4,
        description: "Set up Git locally and explore its basic structure",
        topics: [
          "Installation",
          "Configuration",
          "First Repository",
          "Git States",
        ],
        difficulty: "Beginner",
        estimatedTime: "2-3 hours",
      },
      {
        number: 3,
        title: "Tracking Changes",
        lessons: 5,
        description: "Learn to stage, commit, and view changes in a repository",
        topics: ["Git Status", "Staging", "Commits", "Diffs", "History"],
        difficulty: "Beginner",
        estimatedTime: "3-4 hours",
      },
      {
        number: 4,
        title: "Managing Files",
        lessons: 4,
        description: "Understand how Git handles file changes and operations",
        topics: [
          "Moving Files",
          "Deleting Files",
          "Ignoring Files",
          "Undoing Changes",
        ],
        difficulty: "Beginner",
        estimatedTime: "2-3 hours",
      },
      {
        number: 5,
        title: "Branching and Merging",
        lessons: 5,
        description: "Master parallel development and basic team workflows",
        topics: [
          "Branching",
          "Merging",
          "Conflict Resolution",
          "Branch Management",
        ],
        difficulty: "Intermediate",
        estimatedTime: "4-5 hours",
      },
      {
        number: 6,
        title: "Working with Remotes",
        lessons: 5,
        description: "Push and pull code from GitHub and other remotes",
        topics: [
          "Remote Repositories",
          "Cloning",
          "Push/Pull",
          "Tracking Branches",
        ],
        difficulty: "Intermediate",
        estimatedTime: "3-4 hours",
      },
      {
        number: 7,
        title: "Collaboration Workflows",
        lessons: 5,
        description: "Learn how teams collaborate using Git",
        topics: [
          "Git Workflows",
          "Pull Requests",
          "Forking",
          "Rebase vs Merge",
        ],
        difficulty: "Intermediate",
        estimatedTime: "4-5 hours",
      },
      {
        number: 8,
        title: "Rewriting History",
        lessons: 5,
        description: "Safely alter past commits and recover from mistakes",
        topics: ["Amending Commits", "Rebasing", "Cherry-picking", "Reflog"],
        difficulty: "Advanced",
        estimatedTime: "3-4 hours",
      },
      {
        number: 9,
        title: "Advanced Git Tools",
        lessons: 5,
        description: "Use Git's more powerful and flexible tools",
        topics: ["Stashing", "Submodules", "Git Hooks", "Searching History"],
        difficulty: "Advanced",
        estimatedTime: "4-5 hours",
      },
      {
        number: 10,
        title: "Real-World Challenges",
        lessons: 5,
        description: "Apply Git to real-life scenarios and error handling",
        topics: ["Broken Push", "Bad Merge", "Messy History", "Team Scenarios"],
        difficulty: "Advanced",
        estimatedTime: "3-4 hours",
      },
    ];

    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case "Beginner":
          return "text-green-600 bg-green-100";
        case "Intermediate":
          return "text-yellow-600 bg-yellow-100";
        case "Advanced":
          return "text-red-600 bg-red-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-gray-100 border-2 border-black p-6">
          <h3 className="font-black text-lg uppercase tracking-wider mb-4">
            Your Learning Journey
          </h3>
          <div className="space-y-4">
            {modules.map((module, index) => (
              <div key={module.number} className="relative">
                <InteractiveCard
                  title={`Module ${module.number}: ${module.title}`}
                  subtitle={`${module.lessons} lessons • ${module.estimatedTime}`}
                  icon={<BookOpen className="h-5 w-5 text-blue-600" />}
                  isSelected={selectedModule === module.number}
                  onClick={() =>
                    setSelectedModule(
                      selectedModule === module.number ? null : module.number
                    )
                  }
                  expandedContent={
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        {module.description}
                      </p>
                      <div className="flex items-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(
                            module.difficulty
                          )}`}
                        >
                          {module.difficulty}
                        </span>
                        <Clock className="h-3 w-3 text-gray-500 ml-3 mr-1" />
                        <span className="text-xs text-gray-600">
                          {module.estimatedTime}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">
                          Key Topics:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {module.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const InteractiveFeaturesSection = () => {
    const [activeFeature, setActiveFeature] = useState<string | null>(null);

    const features = [
      {
        id: "challenges",
        title: "Interactive Challenges",
        icon: <Puzzle className="h-6 w-6 text-purple-600" />,
        description: "Hands-on coding exercises in simulated environments",
        benefits: [
          "Practice Git commands safely",
          "Immediate feedback on your actions",
          "Real-world scenario simulation",
        ],
        preview: "Try commands like 'git add', 'git commit', 'git push'",
      },
      {
        id: "quizzes",
        title: "Knowledge Checks",
        icon: <Target className="h-6 w-6 text-green-600" />,
        description: "Quick quizzes to reinforce learning",
        benefits: [
          "Test your understanding",
          "Identify knowledge gaps",
          "Reinforce key concepts",
        ],
        preview: "Multiple choice and scenario-based questions",
      },
      {
        id: "simulations",
        title: "Git Simulations",
        icon: <Play className="h-6 w-6 text-blue-600" />,
        description: "Interactive Git repository simulations",
        benefits: [
          "Visualize Git operations",
          "See branch histories",
          "Practice merging scenarios",
        ],
        preview: "Visual representation of Git workflows",
      },
      {
        id: "free-access",
        title: "Free & Open Access",
        icon: <Star className="h-6 w-6 text-yellow-600" />,
        description: "Complete course with no account required",
        benefits: [
          "No registration needed",
          "Start learning immediately",
          "Access all content for free",
        ],
        preview: "Jump right in and start your Git journey",
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
            Interactive Learning Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <InteractiveCard
                key={feature.id}
                title={feature.title}
                subtitle={feature.description}
                icon={feature.icon}
                isSelected={activeFeature === feature.id}
                onClick={() =>
                  setActiveFeature(
                    activeFeature === feature.id ? null : feature.id
                  )
                }
                expandedContent={
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        Benefits:
                      </p>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center text-xs">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                      <p className="text-xs text-blue-700">
                        <strong>Preview:</strong> {feature.preview}
                      </p>
                    </div>
                  </div>
                }
              />
            ))}
          </div>
        </div>

        <div className="bg-cyan-50 border-2 border-cyan-400 p-6">
          <div className="flex items-center mb-4">
            <Lightbulb className="h-6 w-6 text-cyan-600 mr-3" />
            <h3 className="font-black text-lg uppercase tracking-wider">
              Learning Tips
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-bold text-sm uppercase tracking-wider">
                How to Succeed
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  Take your time with each lesson
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  Practice commands in the challenges
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  {`Don\'t skip the quizzes`}
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm uppercase tracking-wider">
                Get Help When Needed
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  Review previous lessons
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  Use the help documentation
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  Ask questions in discussions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <LessonLayout
      lessonTitle={lessonTitle}
      moduleTitle={moduleTitle}
      lessonNumber={lessonNumber}
      moduleNumber={moduleNumber}
      sections={sections}
      currentSection={currentSection}
      onSectionChange={(index: number) => {
        setCurrentSection(index);
        console.log(index);
        if (index === sections.length - 1) setCompleted(true);
      }}
      isLessonComplete={completed}
      onContinue={
        "/training-portal/courses/devops/git/module-2-getting-started/lesson-1-installing-git"
      }
      completionMessage={
        "Excellent! You're now ready to dive into your Git learning journey. Let's start with installing Git!"
      }
    >
      {currentSection === 0 && <IntroSection />}
      {currentSection === 1 && <LearningPathSection />}
      {currentSection === 2 && <InteractiveFeaturesSection />}
    </LessonLayout>
  );
}
