// components/SciFiLayout.tsx
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ScanLine = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div
      className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
      style={{
        top: "20%",
        animation: "scan 3s linear infinite",
      }}
    />
    <style jsx>{`
      @keyframes scan {
        0% {
          top: 0%;
        }
        100% {
          top: 100%;
        }
      }
    `}</style>
  </div>
);

const GlitchText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`${className} ${
        glitch ? "animate-pulse text-red-400" : ""
      } transition-colors duration-100`}
    >
      {children}
    </span>
  );
};

interface SciFiLayoutProps {
  children: React.ReactNode;
}

export default function SciFiLayout({ children }: SciFiLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: "/", label: "./home", desc: "System initialization" },
    { path: "/about", label: "./about", desc: "Personal data archive" },
    { path: "/ftl-nomad", label: "./ftl-nomad", desc: "FTL Nomad Campaign DB" },
    // { path: "/skills", label: "./skills", desc: "System diagnostics" },
    // { path: "/projects", label: "./projects", desc: "Mission logs" },
    // { path: "/contact", label: "./contact", desc: "Communication protocols" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-50" />
      <ScanLine />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
               linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
             `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Mobile Header */}
      <div className="lg:hidden relative z-50 bg-black border-b border-cyan-400 border-opacity-30 p-4">
        <div className="flex justify-between items-center">
          <div>
            <GlitchText className="text-cyan-400 text-lg font-bold">
              QUANTUM_OS
            </GlitchText>
            <div className="text-xs text-gray-500">
              v3.14.159 | Neural Interface Active
            </div>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 hover:bg-cyan-400 hover:bg-opacity-10 rounded transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <div
                className={`h-0.5 w-full bg-cyan-400 transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <div
                className={`h-0.5 w-full bg-cyan-400 transition-opacity duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <div
                className={`h-0.5 w-full bg-cyan-400 transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-90 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-80 h-full bg-black border-r border-cyan-400 border-opacity-30 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          <div className="mb-6">
            <div className="text-orange-400 text-sm mb-2">NAVIGATION_MENU:</div>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeMobileMenu}
                className={`block w-full text-left p-3 mb-2 rounded transition-all duration-200 hover:bg-cyan-400 hover:bg-opacity-10 hover:text-cyan-300 ${
                  pathname === item.path
                    ? "bg-cyan-400 bg-opacity-20 text-cyan-300"
                    : ""
                }`}
              >
                <div className="text-sm">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </Link>
            ))}
          </div>

          <div className="text-xs">
            <div className="text-orange-400 mb-2">SYSTEM_STATUS:</div>
            <div className="bg-black bg-opacity-30 p-3 rounded border border-gray-700">
              <div className="text-green-400">✓ OPERATIONAL</div>
              <div className="text-cyan-400">Current Path: {pathname}</div>
              <div className="text-gray-400">
                Uptime: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 h-screen flex">
        {/* Desktop Left Panel - Terminal Navigation */}
        <div className="hidden lg:block w-1/4 p-6 border-r border-cyan-400 border-opacity-30 bg-black bg-opacity-40">
          <div className="mb-6">
            <GlitchText className="text-cyan-400 text-xl font-bold">
              QUANTUM_OS
            </GlitchText>
            <div className="text-xs text-gray-500 mt-1">
              v3.14.159 | Neural Interface Active
            </div>
          </div>

          <div className="mb-6">
            <div className="text-orange-400 text-sm mb-2">NAVIGATION_MENU:</div>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block w-full text-left p-2 mb-1 rounded transition-all duration-200 hover:bg-cyan-400 hover:bg-opacity-10 hover:text-cyan-300 ${
                  pathname === item.path
                    ? "bg-cyan-400 bg-opacity-20 text-cyan-300"
                    : ""
                }`}
              >
                <div className="text-sm">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </Link>
            ))}
          </div>

          <div className="text-xs">
            <div className="text-orange-400 mb-2">SYSTEM_STATUS:</div>
            <div className="bg-black bg-opacity-30 p-2 rounded border border-gray-700">
              <div className="text-green-400">✓ OPERATIONAL</div>
              <div className="text-cyan-400">Current Path: {pathname}</div>
              <div className="text-gray-400">
                Uptime: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 lg:p-6 bg-black bg-opacity-20 overflow-y-auto pt-0 lg:pt-6">
          {children}
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-cyan-400 border-opacity-30 p-2 text-xs z-50">
        <div className="flex flex-col sm:flex-row justify-between text-gray-400 gap-1 sm:gap-0">
          <span>STATUS: Online | MODE: Interactive</span>
          <span className="text-xs">
            <span className="hidden sm:inline">
              {new Date().toLocaleString()} | Stardate:{" "}
              {(Date.now() / 86400000 + 2440587.5).toFixed(2)}
            </span>
            <span className="sm:hidden">
              {new Date().toLocaleTimeString()} | SD:{" "}
              {(Date.now() / 86400000 + 2440587.5).toFixed(1)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
