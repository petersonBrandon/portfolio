// app/training-portal/layout.tsx
"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { BookOpen, Users, Home, Search, List } from "lucide-react";

interface TrainingPortalLayoutProps {
  children: ReactNode;
}

export default function TrainingPortalLayout({
  children,
}: TrainingPortalLayoutProps) {
  const pathname = usePathname();

  const navigationItems = [
    { href: "/training-portal", icon: Home, label: "HOME" },
    { href: "/training-portal/topics", icon: List, label: "TOPICS" },
    { href: "/training-portal/browse", icon: BookOpen, label: "BROWSE" },
    { href: "/training-portal/about", icon: Users, label: "ABOUT" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black border-b-4 border-cyan-400"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start h-16">
            <div className="flex items-center">
              <div className="bg-cyan-400 p-2 border-2 border-black">
                <BookOpen className="h-8 w-8 text-black" />
              </div>
              <span className="ml-4 text-xl font-black text-white uppercase tracking-wider">
                Libre Training
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white border-r-4 border-black min-h-[calc(100vh-4rem)]"
        >
          <nav className="p-6">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center px-4 py-4 border-2 transition-all duration-200 ${
                        isActive(item.href)
                          ? "bg-cyan-400 border-black text-black"
                          : "border-gray-300 text-gray-700 hover:border-black hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span className="font-black text-sm">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </motion.aside>

        <main className="flex-1 p-8 bg-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
