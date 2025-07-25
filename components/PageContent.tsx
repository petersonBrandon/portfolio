"use client";

import React, { useState, useEffect } from "react";

interface TerminalPromptProps {
  children: string;
  delay?: number;
}

export const TerminalPrompt = ({
  children,
  delay = 0,
}: TerminalPromptProps) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= children.length) {
          setDisplayText(children.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [children, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="font-mono whitespace-pre-line">
      {displayText}
      <span
        className={`${showCursor ? "opacity-100" : "opacity-0"} text-cyan-400`}
      >
        ▋
      </span>
    </span>
  );
};

interface PageContentProps {
  title: string;
  children: React.ReactNode;
}

export const PageContent = ({ title, children }: PageContentProps) => {
  return (
    <div>
      <div className="text-cyan-400 text-lg mb-4 border-b border-cyan-400 border-opacity-30 pb-2">
        {title}
      </div>
      <div className="h-full overflow-y-auto">{children}</div>
    </div>
  );
};
