// components/FTLNomadLayout.tsx
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navigationStructure = [
  {
    path: "/ftl-nomad",
    label: ">> MAIN_CONSOLE",
    desc: "Ship Command Center",
    type: "link",
  },
  {
    path: "/ftl-nomad/adventure-logs",
    label: ">> MISSION_LOGS",
    desc: "Adventure Archives",
    type: "link",
  },
  {
    path: "/ftl-nomad/characters",
    label: ">> CREW_ROSTER",
    desc: "Character Database",
    type: "link",
  },
  {
    path: "/ftl-nomad/npcs",
    label: ">> CONTACT_NET",
    desc: "NPC Registry",
    type: "link",
  },
  {
    path: "/ftl-nomad/locations",
    label: ">> STAR_CHARTS",
    desc: "Location Database",
    type: "link",
  },
  {
    id: "lore",
    label: ">> LORE_ARCHIVE",
    desc: "Knowledge Database",
    type: "folder",
    children: [
      {
        path: "/ftl-nomad/lore/codex",
        label: ">> CODEX",
        desc: "Lore Library",
      },
      {
        path: "/ftl-nomad/lore/timeline",
        label: ">> TIMELINE",
        desc: "Universal History",
      },
      {
        path: "/ftl-nomad/lore/rumors",
        label: ">> RUMORS",
        desc: "Intelligence Reports",
      },
      {
        path: "/ftl-nomad/lore/factions",
        label: ">> FACTIONS",
        desc: "Faction Database",
      },
    ],
  },
  {
    id: "media",
    label: ">> MEDIA_BANK",
    desc: "Multimedia Archive",
    type: "folder",
    children: [
      {
        path: "/ftl-nomad/media/gallery",
        label: ">> GALLERY",
        desc: "Visual Archive",
      },
      {
        path: "/ftl-nomad/media/music",
        label: ">> MUSIC",
        desc: "Audio Library",
      },
    ],
  },
  {
    id: "meta",
    label: ">> META_DATA",
    desc: "System Analytics",
    type: "folder",
    children: [
      {
        path: "/ftl-nomad/meta/stats",
        label: ">> STATS",
        desc: "Session Analytics",
      },
      {
        path: "/ftl-nomad/meta/rules",
        label: ">> RULES",
        desc: "Game Parameters",
      },
    ],
  },
];

const StarField = () => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>(
    []
  );

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 50; i++) {
        starArray.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
        });
      }
      setStars(starArray);
    };
    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.5, 1],
            scale: [0, 1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const FTLScanner = ({ skipAnimation = false }: { skipAnimation?: boolean }) => (
  <motion.div
    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60"
    initial={{ scaleX: skipAnimation ? 1 : 0 }}
    animate={{ scaleX: 1 }}
    transition={{
      duration: skipAnimation ? 0 : 1,
      delay: skipAnimation ? 0 : 2,
    }}
  >
    <motion.div
      className="absolute w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"
      animate={{ x: ["-100%", "100%"] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: skipAnimation ? 0 : 2.5,
      }}
    />
  </motion.div>
);

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const bootSteps = [
    "INITIALIZING QUANTUM DRIVE...",
    "LOADING NAVIGATION ARRAYS...",
    "ESTABLISHING NEURAL LINK...",
    "CALIBRATING JUMP COORDINATES...",
    "LIFE SUPPORT SYSTEMS ONLINE...",
    "WELCOME ABOARD, CAPTAIN.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= bootSteps.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center w-full max-w-md">
        <motion.div
          className="text-2xl sm:text-4xl font-bold text-blue-400 mb-6 sm:mb-8"
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          FTL NOMAD
        </motion.div>

        <motion.div
          className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          QUANTUM_DRIVE_v2.6.1
        </motion.div>

        <div className="h-24 sm:h-32 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="text-green-400 font-mono text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {bootSteps[currentStep]}
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="w-full max-w-64 h-1 bg-gray-700 mx-auto mt-4 rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-green-400"
              initial={{ width: "0%" }}
              animate={{
                width: `${((currentStep + 1) / bootSteps.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const NomadStatusIndicator = ({
  label,
  status,
  color = "green",
  delay = 0,
  skipAnimation = false,
}: {
  label: string;
  status: string;
  color?: "green" | "yellow" | "red" | "blue";
  delay?: number;
  skipAnimation?: boolean;
}) => {
  const colorClasses = {
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
    blue: "text-blue-400",
  };

  return (
    <motion.div
      className="flex items-center gap-2 text-xs"
      initial={{ opacity: skipAnimation ? 1 : 0, x: skipAnimation ? 0 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: skipAnimation ? 0 : delay + 3,
        duration: skipAnimation ? 0 : 0.5,
      }}
    >
      <motion.div
        className={`w-2 h-2 rounded-full ${colorClasses[color]}`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-gray-300">{label}:</span>
      <span className={colorClasses[color]}>{status}</span>
    </motion.div>
  );
};

const NavigationMenu = ({
  items,
  pathname,
  onFolderClick,
  hasBooted,
  delay = 0,
  onLinkClick,
}: {
  items: any[];
  pathname: string;
  onFolderClick?: (folderId: string) => void;
  hasBooted: boolean;
  delay?: number;
  onLinkClick?: () => void;
}) => {
  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <motion.div
          key={item.path || item.id}
          initial={{
            x: hasBooted ? 0 : -50,
            opacity: hasBooted ? 1 : 0,
          }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: hasBooted ? 0 : delay + index * 0.1 }}
        >
          {item.type === "folder" ? (
            <button
              onClick={() => onFolderClick?.(item.id)}
              className="block w-full text-left p-2 rounded transition-all duration-200 hover:bg-purple-400 hover:bg-opacity-10 hover:text-purple-300 border border-transparent hover:border-purple-400 hover:border-opacity-30"
            >
              <div className="text-sm font-medium flex items-center gap-2">
                {item.label}
                <span className="text-xs text-gray-400">▶</span>
              </div>
              <div className="text-xs text-gray-400">{item.desc}</div>
            </button>
          ) : (
            <Link
              href={item.path}
              onClick={onLinkClick}
              className={`block w-full text-left p-2 rounded transition-all duration-200 hover:bg-blue-400 hover:bg-opacity-10 hover:text-blue-300 border border-transparent hover:border-blue-400 hover:border-opacity-30 ${
                pathname === item.path
                  ? "bg-blue-400 bg-opacity-20 text-blue-300 border-blue-400 border-opacity-50"
                  : ""
              }`}
            >
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-gray-400">{item.desc}</div>
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const SlidingNavigation = ({
  pathname,
  hasBooted,
  onLinkClick,
}: {
  pathname: string;
  hasBooted: boolean;
  onLinkClick?: () => void;
}) => {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handleFolderClick = (folderId: string) => {
    setDirection("right");
    setCurrentFolder(folderId);
  };

  const handleBack = () => {
    setDirection("left");
    setCurrentFolder(null);
  };

  const currentFolderData = navigationStructure.find(
    (item) => item.id === currentFolder
  );
  const mainItems = navigationStructure.filter((item) => item.type === "link");

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!currentFolder ? (
          <motion.div
            key="main"
            initial={{
              x: direction === "left" ? -300 : 0,
              opacity: direction === "left" ? 0 : 1,
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === "right" ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <NavigationMenu
              items={mainItems}
              pathname={pathname}
              onFolderClick={handleFolderClick}
              hasBooted={hasBooted}
              delay={1.5}
              onLinkClick={onLinkClick}
            />

            {/* Folder items */}
            <div className="mt-4 space-y-1">
              {navigationStructure
                .filter((item) => item.type === "folder")
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{
                      x: hasBooted ? 0 : -50,
                      opacity: hasBooted ? 1 : 0,
                    }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: hasBooted ? 0 : 2.0 + index * 0.1 }}
                  >
                    <button
                      onClick={() => handleFolderClick(item.id!)}
                      className="block w-full text-left p-2 rounded transition-all duration-200 hover:bg-purple-400 hover:bg-opacity-10 hover:text-purple-300 border border-transparent hover:border-purple-400 hover:border-opacity-30"
                    >
                      <div className="text-sm font-medium flex items-center gap-2">
                        {item.label}
                        <span className="text-xs text-gray-400">▶</span>
                      </div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </button>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentFolder}
            initial={{ x: direction === "right" ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === "left" ? 300 : -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Back button */}
            <motion.button
              onClick={handleBack}
              className="block w-full text-left p-2 mb-3 rounded transition-all duration-200 hover:bg-gray-400 hover:bg-opacity-10 hover:text-gray-300 border border-gray-400 border-opacity-30 text-gray-400"
            >
              <div className="text-sm font-medium flex items-center gap-2">
                <span className="text-xs">◀</span>
                &lt;&lt; BACK
              </div>
              <div className="text-xs text-gray-400">Return to Main Menu</div>
            </motion.button>

            {/* Folder header */}
            <motion.div
              className="mb-4 pb-3 border-b border-purple-400 border-opacity-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-lg font-bold text-purple-300 mb-1">
                {currentFolderData?.label.replace(">> ", "")}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                {currentFolderData?.desc}
              </div>
              <motion.div
                className="mt-2 h-px bg-gradient-to-r from-purple-400 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </motion.div>

            {/* Folder contents */}
            <NavigationMenu
              items={currentFolderData?.children || []}
              pathname={pathname}
              hasBooted={true}
              delay={0.3}
              onLinkClick={onLinkClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Navigation Menu
const MobileNavMenu = ({
  isOpen,
  onClose,
  pathname,
  jumpDriveStatus,
  hasBooted,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  jumpDriveStatus: string;
  hasBooted: boolean;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-black bg-opacity-95 border-r border-blue-400 border-opacity-30 z-50 overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="p-4">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-blue-400 text-lg font-bold">
                    FTL NOMAD
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="text-xs text-gray-400 mb-3">
                  QUANTUM_DRIVE_v2.6.1
                </div>
                <div className="h-px bg-gradient-to-r from-blue-400 to-transparent" />
              </div>

              <div className="mb-6">
                <div className="text-yellow-400 text-sm mb-3">
                  NAVIGATION_ARRAY:
                </div>
                <SlidingNavigation
                  pathname={pathname}
                  hasBooted={hasBooted}
                  onLinkClick={onClose}
                />

                <motion.div
                  initial={{
                    x: hasBooted ? 0 : -50,
                    opacity: hasBooted ? 1 : 0,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: hasBooted ? 0 : 2.5 }}
                >
                  <Link
                    href="/"
                    onClick={onClose}
                    className="block w-full text-left p-2 mt-4 rounded transition-all duration-200 hover:bg-red-400 hover:bg-opacity-10 hover:text-red-300 border border-red-400 border-opacity-30 text-red-400"
                  >
                    <div className="text-sm font-medium">
                      &lt;&lt; EXIT_TO_MAIN
                    </div>
                    <div className="text-xs text-gray-400">
                      Return to Quantum OS
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Ship Status section remains the same */}
              <div className="text-xs">
                <div className="text-yellow-400 mb-2">SHIP_STATUS:</div>
                <div className="bg-black bg-opacity-40 p-3 rounded border border-gray-600">
                  <NomadStatusIndicator
                    label="LIFE_SUPPORT"
                    status="NOMINAL"
                    color="green"
                    delay={0}
                    skipAnimation={hasBooted}
                  />
                  <NomadStatusIndicator
                    label="POWER_CORE"
                    status="98%"
                    color="green"
                    delay={0.1}
                    skipAnimation={hasBooted}
                  />
                  <NomadStatusIndicator
                    label="JUMP_DRIVE"
                    status={jumpDriveStatus}
                    color="blue"
                    delay={0.2}
                    skipAnimation={hasBooted}
                  />
                  <NomadStatusIndicator
                    label="SHIELDS"
                    status="ONLINE"
                    color="green"
                    delay={0.3}
                    skipAnimation={hasBooted}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface FTLNomadLayoutProps {
  children: React.ReactNode;
}

export default function FTLNomadLayout({ children }: FTLNomadLayoutProps) {
  const pathname = usePathname();
  const [jumpDriveStatus, setJumpDriveStatus] = useState("READY");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasBooted] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("ftl-nomad-booted");
      return stored === "true";
    }
    return false;
  });

  const [isBooting, setIsBooting] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("ftl-nomad-booted") !== "true";
    }
    return true;
  });

  const [showInterface, setShowInterface] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("ftl-nomad-booted") === "true";
    }
    return false;
  });

  useEffect(() => {
    const statuses = ["READY", "CHARGING", "COOLDOWN", "MAINTENANCE"];
    const interval = setInterval(() => {
      setJumpDriveStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBootComplete = () => {
    setIsBooting(false);
    sessionStorage.setItem("ftl-nomad-booted", "true");
    setTimeout(() => setShowInterface(true), 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-blue-100 font-mono relative">
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {/* Background effects */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-black opacity-80 z-0"
        initial={{ opacity: hasBooted ? 0.8 : 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: hasBooted ? 0 : 2, delay: hasBooted ? 0 : 4 }}
      />
      <div className="fixed inset-0 z-0">
        <StarField />
        <FTLScanner skipAnimation={hasBooted} />
      </div>

      {/* Hexagonal grid overlay */}
      <motion.div
        className="fixed inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
        initial={{ opacity: hasBooted ? 0.05 : 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: hasBooted ? 0 : 1, delay: hasBooted ? 0 : 3 }}
      />

      {/* Mobile Navigation */}
      <MobileNavMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
        jumpDriveStatus={jumpDriveStatus}
        hasBooted={hasBooted}
      />

      <AnimatePresence>
        {showInterface && (
          <motion.div
            className="relative z-10 h-screen flex flex-col lg:flex-row"
            initial={{ opacity: hasBooted ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: hasBooted ? 0 : 1 }}
          >
            {/* Mobile Header*/}
            <motion.div
              className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-black bg-opacity-80 border-b border-blue-400 border-opacity-30 p-4 flex items-center justify-between"
              initial={{ y: hasBooted ? 0 : -50, opacity: hasBooted ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: hasBooted ? 0 : 0.5 }}
            >
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 12h18M3 6h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="text-blue-400 text-lg font-bold">FTL NOMAD</div>
              <div className="text-xs text-gray-400">
                {new Date().toLocaleTimeString()}
              </div>
            </motion.div>

            {/* Desktop Left Panel - Fixed */}
            <motion.div
              className="hidden lg:block w-1/3 h-full p-4 border-r border-blue-400 border-opacity-30 bg-black bg-opacity-60 overflow-y-auto" // Added h-full
              initial={{ x: hasBooted ? 0 : -400, opacity: hasBooted ? 1 : 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: hasBooted ? 0 : 0.8,
                delay: hasBooted ? 0 : 0.2,
              }}
            >
              <motion.div
                className="mb-6"
                initial={{ y: hasBooted ? 0 : -20, opacity: hasBooted ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: hasBooted ? 0 : 0.5 }}
              >
                <div className="text-blue-400 text-xl font-bold mb-1">
                  FTL NOMAD CONSOLE
                </div>
                <div className="text-xs text-gray-400 mb-3">
                  QUANTUM_DRIVE_v2.6.1 | Neural Link: ACTIVE
                </div>
                <motion.div
                  className="h-px bg-gradient-to-r from-blue-400 to-transparent mb-4"
                  initial={{ scaleX: hasBooted ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: hasBooted ? 0 : 0.8,
                    duration: hasBooted ? 0 : 0.8,
                  }}
                />
              </motion.div>

              <div className="mb-6">
                <motion.div
                  className="text-yellow-400 text-sm mb-3 flex items-center gap-2"
                  initial={{ opacity: hasBooted ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: hasBooted ? 0 : 1 }}
                >
                  <span>NAVIGATION_ARRAY:</span>
                  <motion.div
                    className="flex-1 h-px bg-yellow-400 opacity-30"
                    initial={{ scaleX: hasBooted ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: hasBooted ? 0 : 1.2,
                      duration: hasBooted ? 0 : 0.5,
                    }}
                  />
                </motion.div>

                <SlidingNavigation pathname={pathname} hasBooted={hasBooted} />

                <motion.div
                  initial={{
                    x: hasBooted ? 0 : -50,
                    opacity: hasBooted ? 1 : 0,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: hasBooted ? 0 : 2.5 }}
                >
                  <Link
                    href="/"
                    className="block w-full text-left p-2 mt-4 rounded transition-all duration-200 hover:bg-red-400 hover:bg-opacity-10 hover:text-red-300 border border-red-400 border-opacity-30 text-red-400"
                  >
                    <div className="text-sm font-medium">
                      &lt;&lt; EXIT_TO_MAIN
                    </div>
                    <div className="text-xs text-gray-400">
                      Return to Quantum OS
                    </div>
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className="text-xs space-y-3"
                initial={{ opacity: hasBooted ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: hasBooted ? 0 : 2.8 }}
              >
                <div className="text-yellow-400 mb-2 flex items-center gap-2">
                  <span>SHIP_STATUS:</span>
                  <motion.div
                    className="flex-1 h-px bg-yellow-400 opacity-30"
                    initial={{ scaleX: hasBooted ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: hasBooted ? 0 : 3,
                      duration: hasBooted ? 0 : 0.5,
                    }}
                  />
                </div>
                <motion.div
                  className="bg-black bg-opacity-40 p-3 rounded border border-gray-600"
                  initial={{
                    y: hasBooted ? 0 : 20,
                    opacity: hasBooted ? 1 : 0,
                  }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: hasBooted ? 0 : 3.2 }}
                >
                  <NomadStatusIndicator
                    label="LIFE_SUPPORT"
                    status="NOMINAL"
                    color="green"
                    delay={0}
                    skipAnimation={hasBooted}
                  />
                  <NomadStatusIndicator
                    label="POWER_CORE"
                    status="98%"
                    color="green"
                    delay={0.1}
                    skipAnimation={hasBooted}
                  />
                  <NomadStatusIndicator
                    label="JUMP_DRIVE"
                    status={jumpDriveStatus}
                    color="blue"
                    delay={0.2}
                    skipAnimation={hasBooted}
                  />
                  <NomadStatusIndicator
                    label="SHIELDS"
                    status="ONLINE"
                    color="green"
                    delay={0.3}
                    skipAnimation={hasBooted}
                  />
                  <motion.div
                    className="mt-2 pt-2 border-t border-gray-700"
                    initial={{ opacity: hasBooted ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: hasBooted ? 0 : 3.8 }}
                  >
                    <div className="text-gray-400">
                      Current Sector: {pathname.split("/").pop() || "BRIDGE"}
                    </div>
                    <div className="text-gray-400">
                      Ship Time: {new Date().toLocaleTimeString()}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-4 text-xs"
                initial={{ opacity: hasBooted ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: hasBooted ? 0 : 4 }}
              >
                <div className="text-yellow-400 mb-2">CREW_COMM:</div>
                <div className="bg-black bg-opacity-40 p-2 rounded border border-gray-600">
                  <motion.div
                    className="text-green-400"
                    initial={{ opacity: hasBooted ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: hasBooted ? 0 : 4.2 }}
                  >
                    {`● Captain\'s ready room`}
                  </motion.div>
                  <motion.div
                    className="text-blue-400"
                    initial={{ opacity: hasBooted ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: hasBooted ? 0 : 4.4 }}
                  >
                    ● Engineering bay
                  </motion.div>
                  <motion.div
                    className="text-gray-400"
                    initial={{ opacity: hasBooted ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: hasBooted ? 0 : 4.6 }}
                  >
                    ○ Cargo hold
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
              className="flex-1 flex flex-col h-full lg:h-auto" // Added h-full for mobile, h-auto for desktop
              initial={{ x: hasBooted ? 0 : 400, opacity: hasBooted ? 1 : 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: hasBooted ? 0 : 0.8,
                delay: hasBooted ? 0 : 0.4,
              }}
            >
              <motion.div
                className="flex-1 p-4 lg:pt-6 pt-20 bg-black bg-opacity-30 overflow-y-auto" // This now scrolls independently
                initial={{ y: hasBooted ? 0 : 20, opacity: hasBooted ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: hasBooted ? 0 : 1.2 }}
              >
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
