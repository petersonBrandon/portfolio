"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Monitor,
  Apple,
  Smartphone,
  CheckCircle,
  XCircle,
  Terminal,
  Globe,
  Package,
  Settings,
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

export default function InstallingGitLesson({
  lessonTitle = "Installing Git",
  moduleTitle = "Git Setup",
  lessonNumber = 1,
  moduleNumber = 2,
}: LessonProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const sections = [
    { id: "intro", title: "Installation Overview", content: "intro" },
    { id: "windows", title: "Windows Installation", content: "windows" },
    { id: "macos", title: "macOS Installation", content: "macos" },
    { id: "linux", title: "Linux Installation", content: "linux" },
    {
      id: "verification",
      title: "Verify Installation",
      content: "verification",
    },
    { id: "quiz", title: "Installation Check", content: "quiz" },
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

  const IntroSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-blue-50 border-2 border-blue-400 p-6">
        <div className="flex items-center mb-4">
          <Download className="h-6 w-6 text-blue-600 mr-3" />
          <h3 className="font-black text-lg uppercase tracking-wider">
            Getting Git Ready
          </h3>
        </div>
        <p className="text-gray-700 mb-4">
          Before you can use Git, you need to install it on your computer. The
          installation process differs depending on your operating system.
        </p>
        <div className="bg-yellow-100 border-2 border-yellow-400 p-4 mt-4">
          <p className="text-sm font-medium text-yellow-800">
            💡 <strong>Pro Tip:</strong> Git comes pre-installed on most Linux
            distributions and macOS, but you might want to install the latest
            version.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 border-2 border-black p-6">
        <h3 className="font-black text-lg uppercase tracking-wider mb-4">
          What You'll Learn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border-2 border-gray-300 p-4">
            <Monitor className="h-6 w-6 text-gray-600 mb-2" />
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
              Windows Setup
            </h4>
            <p className="text-xs text-gray-600">
              Git for Windows with Git Bash
            </p>
          </div>
          <div className="bg-white border-2 border-gray-300 p-4">
            <Apple className="h-6 w-6 text-gray-600 mb-2" />
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
              macOS Setup
            </h4>
            <p className="text-xs text-gray-600">
              Homebrew and official installer
            </p>
          </div>
          <div className="bg-white border-2 border-gray-300 p-4">
            <Smartphone className="h-6 w-6 text-gray-600 mb-2" />
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
              Linux Setup
            </h4>
            <p className="text-xs text-gray-600">
              Package managers and building from source
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const WindowsSection = () => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const installationMethods = [
      {
        id: "official",
        name: "Official Git for Windows",
        difficulty: "Recommended",
        icon: <Globe className="h-5 w-5 text-blue-600" />,
        steps: [
          "Visit git-scm.com/download/win",
          "Click 'Download for Windows'",
          "Run the downloaded .exe file",
          "Follow the installation wizard",
          "Keep default settings (recommended)",
        ],
        pros: ["Includes Git Bash", "Easy installation", "Regular updates"],
        cons: ["Larger download size"],
      },
      {
        id: "winget",
        name: "Windows Package Manager",
        difficulty: "Advanced",
        icon: <Package className="h-5 w-5 text-green-600" />,
        steps: [
          "Open Command Prompt as Administrator",
          "Run: winget install --id Git.Git -e --source winget",
          "Wait for installation to complete",
          "Restart your terminal",
        ],
        pros: ["Command-line installation", "Easy updates"],
        cons: ["Requires Windows 10/11", "No Git Bash by default"],
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-blue-50 border-2 border-blue-400 p-6">
          <div className="flex items-center mb-4">
            <Monitor className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="font-black text-lg uppercase tracking-wider">
              Windows Installation
            </h3>
          </div>

          <div className="space-y-4">
            {installationMethods.map((method) => (
              <InteractiveCard
                key={method.id}
                title={method.name}
                subtitle={`Difficulty: ${method.difficulty}`}
                icon={method.icon}
                isSelected={selectedMethod === method.id}
                onClick={() =>
                  setSelectedMethod(
                    selectedMethod === method.id ? null : method.id
                  )
                }
                expandedContent={
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-bold text-sm uppercase tracking-wider mb-2">
                        Installation Steps
                      </h5>
                      <ol className="list-decimal list-inside space-y-1 text-xs">
                        {method.steps.map((step, i) => (
                          <li key={i} className="text-gray-700">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="font-medium text-xs text-green-600 mb-1">
                          Pros
                        </h6>
                        <ul className="space-y-1">
                          {method.pros.map((pro, i) => (
                            <li key={i} className="flex items-center text-xs">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium text-xs text-red-600 mb-1">
                          Cons
                        </h6>
                        <ul className="space-y-1">
                          {method.cons.map((con, i) => (
                            <li key={i} className="flex items-center text-xs">
                              <XCircle className="h-3 w-3 text-red-500 mr-1" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
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

  const MacOSSection = () => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const installationMethods = [
      {
        id: "homebrew",
        name: "Homebrew",
        difficulty: "Recommended",
        icon: <Package className="h-5 w-5 text-orange-600" />,
        steps: [
          "Install Homebrew if not already installed",
          "Open Terminal",
          "Run: brew install git",
          "Wait for installation to complete",
        ],
        pros: ["Easy updates", "Latest version", "Package management"],
        cons: ["Requires Homebrew installation"],
      },
      {
        id: "official",
        name: "Official Installer",
        difficulty: "Simple",
        icon: <Globe className="h-5 w-5 text-blue-600" />,
        steps: [
          "Visit git-scm.com/download/mac",
          "Download the .dmg file",
          "Open the installer",
          "Follow installation prompts",
        ],
        pros: ["No dependencies", "Straightforward"],
        cons: ["Manual updates", "May be older version"],
      },
      {
        id: "xcode",
        name: "Xcode Command Line Tools",
        difficulty: "Developer",
        icon: <Terminal className="h-5 w-5 text-gray-600" />,
        steps: [
          "Open Terminal",
          "Run: xcode-select --install",
          "Click 'Install' in the popup",
          "Wait for installation",
        ],
        pros: ["Includes other dev tools", "Apple maintained"],
        cons: ["Older Git version", "Large download"],
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-orange-50 border-2 border-orange-400 p-6">
          <div className="flex items-center mb-4">
            <Apple className="h-6 w-6 text-orange-600 mr-3" />
            <h3 className="font-black text-lg uppercase tracking-wider">
              macOS Installation
            </h3>
          </div>

          <div className="space-y-4">
            {installationMethods.map((method) => (
              <InteractiveCard
                key={method.id}
                title={method.name}
                subtitle={`Difficulty: ${method.difficulty}`}
                icon={method.icon}
                isSelected={selectedMethod === method.id}
                onClick={() =>
                  setSelectedMethod(
                    selectedMethod === method.id ? null : method.id
                  )
                }
                expandedContent={
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-bold text-sm uppercase tracking-wider mb-2">
                        Installation Steps
                      </h5>
                      <ol className="list-decimal list-inside space-y-1 text-xs">
                        {method.steps.map((step, i) => (
                          <li key={i} className="text-gray-700">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="font-medium text-xs text-green-600 mb-1">
                          Pros
                        </h6>
                        <ul className="space-y-1">
                          {method.pros.map((pro, i) => (
                            <li key={i} className="flex items-center text-xs">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium text-xs text-red-600 mb-1">
                          Cons
                        </h6>
                        <ul className="space-y-1">
                          {method.cons.map((con, i) => (
                            <li key={i} className="flex items-center text-xs">
                              <XCircle className="h-3 w-3 text-red-500 mr-1" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
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

  const LinuxSection = () => {
    const [selectedDistro, setSelectedDistro] = useState<string | null>(null);

    const distributions = [
      {
        id: "ubuntu",
        name: "Ubuntu/Debian",
        command: "sudo apt install git",
        icon: <Package className="h-5 w-5 text-orange-600" />,
        manager: "APT",
      },
      {
        id: "fedora",
        name: "Fedora/RHEL/CentOS",
        command: "sudo dnf install git",
        icon: <Package className="h-5 w-5 text-blue-600" />,
        manager: "DNF",
      },
      {
        id: "arch",
        name: "Arch Linux",
        command: "sudo pacman -S git",
        icon: <Package className="h-5 w-5 text-cyan-600" />,
        manager: "Pacman",
      },
      {
        id: "opensuse",
        name: "openSUSE",
        command: "sudo zypper install git",
        icon: <Package className="h-5 w-5 text-green-600" />,
        manager: "Zypper",
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-green-50 border-2 border-green-400 p-6">
          <div className="flex items-center mb-4">
            <Smartphone className="h-6 w-6 text-green-600 mr-3" />
            <h3 className="font-black text-lg uppercase tracking-wider">
              Linux Installation
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 text-sm">
              Select your Linux distribution to see the installation command:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {distributions.map((distro) => (
                <InteractiveCard
                  key={distro.id}
                  title={distro.name}
                  subtitle={`Package Manager: ${distro.manager}`}
                  icon={distro.icon}
                  isSelected={selectedDistro === distro.id}
                  onClick={() =>
                    setSelectedDistro(
                      selectedDistro === distro.id ? null : distro.id
                    )
                  }
                  expandedContent={
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-bold text-sm uppercase tracking-wider mb-2">
                          Installation Command
                        </h5>
                        <div className="bg-black text-green-400 p-3 rounded font-mono text-xs">
                          {distro.command}
                        </div>
                      </div>
                      <div>
                        <h6 className="font-medium text-xs text-blue-600 mb-1">
                          Additional Steps
                        </h6>
                        <ol className="list-decimal list-inside space-y-1 text-xs">
                          <li>Update package list first</li>
                          <li>Run the installation command</li>
                          <li>Verify installation with `git --version`</li>
                        </ol>
                      </div>
                    </div>
                  }
                />
              ))}
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-400 p-4">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
                Building from Source
              </h4>
              <p className="text-xs text-gray-700 mb-2">
                For the latest version or custom builds:
              </p>
              <div className="bg-black text-green-400 p-3 rounded font-mono text-xs">
                git clone https://github.com/git/git.git
                <br />
                cd git
                <br />
                make configure
                <br />
                ./configure --prefix=/usr/local
                <br />
                make all
                <br />
                sudo make install
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const VerificationSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-purple-50 border-2 border-purple-400 p-6">
        <div className="flex items-center mb-4">
          <CheckCircle className="h-6 w-6 text-purple-600 mr-3" />
          <h3 className="font-black text-lg uppercase tracking-wider">
            Verify Installation
          </h3>
        </div>

        <div className="space-y-4">
          <div className="bg-white border-2 border-gray-300 p-4">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3">
              Check Git Version
            </h4>
            <div className="bg-black text-green-400 p-3 rounded font-mono text-sm mb-3">
              git --version
            </div>
            <p className="text-xs text-gray-600">
              Expected output: git version 2.x.x (version may vary)
            </p>
          </div>

          <div className="bg-white border-2 border-gray-300 p-4">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3">
              Check Git Help
            </h4>
            <div className="bg-black text-green-400 p-3 rounded font-mono text-sm mb-3">
              git --help
            </div>
            <p className="text-xs text-gray-600">
              Should display Git's help information and available commands
            </p>
          </div>

          <div className="bg-white border-2 border-gray-300 p-4">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3">
              Test Basic Command
            </h4>
            <div className="bg-black text-green-400 p-3 rounded font-mono text-sm mb-3">
              git status
            </div>
            <p className="text-xs text-gray-600">
              Should show "not a git repository" message (this is normal)
            </p>
          </div>
        </div>

        <div className="bg-red-100 border-2 border-red-400 p-4 mt-6">
          <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
            Troubleshooting
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <XCircle className="h-3 w-3 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Command not found</p>
                <p className="text-gray-600">
                  Restart your terminal or add Git to your PATH
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <XCircle className="h-3 w-3 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Permission denied</p>
                <p className="text-gray-600">
                  Run installation with administrator privileges
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const QuizSection = () => {
    const questions = [
      {
        id: "q1",
        question: "What is the recommended way to install Git on Windows?",
        options: [
          "Using Windows Package Manager",
          "Git for Windows from git-scm.com",
          "Building from source",
          "Using PowerShell",
        ],
        correct: 1,
      },
      {
        id: "q2",
        question: "Which command verifies that Git is installed correctly?",
        options: ["git check", "git --version", "git status", "git verify"],
        correct: 1,
      },
      {
        id: "q3",
        question: "On macOS, what does 'xcode-select --install' provide?",
        options: [
          "Only Git",
          "Xcode IDE",
          "Command line tools including Git",
          "Homebrew package manager",
        ],
        correct: 2,
      },
      {
        id: "q4",
        question: "What is the typical package manager command for Ubuntu?",
        options: [
          "sudo dnf install git",
          "sudo apt install git",
          "sudo pacman -S git",
          "sudo zypper install git",
        ],
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
        key="installing-git-quiz"
        questions={questions}
        onComplete={handleQuizComplete}
        onReset={handleQuizReset}
      />
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
      onSectionChange={setCurrentSection}
      isLessonComplete={quizCompleted}
      onContinue={
        "/training-portal/courses/devops/git/module-2-setup/lesson-2-initial-git-configuration"
      }
      completionMessage={
        "Excellent! You've successfully learned how to install Git on different operating systems."
      }
    >
      {currentSection === 0 && <IntroSection />}
      {currentSection === 1 && <WindowsSection />}
      {currentSection === 2 && <MacOSSection />}
      {currentSection === 3 && <LinuxSection />}
      {currentSection === 4 && <VerificationSection />}
      {currentSection === 5 && <QuizSection />}
    </LessonLayout>
  );
}
