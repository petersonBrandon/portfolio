// app/training-portal/TrainingPortalClient.tsx
"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Play,
  ArrowRight,
  Zap,
  Target,
  Award,
} from "lucide-react";
import Link from "next/link";
import { Course } from "../../../lib/training/getCourses";

interface TrainingPortalClientProps {
  courses: Course[];
}

export default function TrainingPortalClient({
  courses,
}: TrainingPortalClientProps) {
  const featuredCourses = courses.slice(0, 3);

  // const categories = [
  //   {
  //     name: "Frontend",
  //     count: courses.filter((c) => c.category === "frontend").length,
  //     icon: BookOpen,
  //   },
  //   {
  //     name: "Backend",
  //     count: courses.filter((c) => c.category === "backend").length,
  //     icon: Target,
  //   },
  //   {
  //     name: "DevOps",
  //     count: courses.filter((c) => c.category === "devops").length,
  //     icon: Zap,
  //   },
  //   {
  //     name: "Best Practices",
  //     count: courses.filter((c) => c.category === "best-practices").length,
  //     icon: Award,
  //   },
  // ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black p-6 border-4 border-cyan-400"
      >
        <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
          Free Training Portal
        </h1>
        <p className="text-cyan-400 font-bold uppercase text-sm">
          Learn at your own pace • No account required • Always free
        </p>
      </motion.div>

      {/* Categories */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              whileHover={{ scale: 1.02 }}
              className="bg-white border-4 border-black p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-gray-600 mb-1">
                    {category.name.toUpperCase()}
                  </p>
                  <p className="text-2xl font-black text-black">
                    {category.count}
                  </p>
                  <p className="text-xs font-bold text-gray-600">COURSES</p>
                </div>
                <div className="p-3 border-2 border-black bg-cyan-400">
                  <Icon className="h-6 w-6 text-black" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div> */}

      {/* Featured Courses */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border-4 border-black p-6"
      >
        <h2 className="text-2xl font-black text-black uppercase mb-6 border-b-2 border-black pb-2">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <div
              key={course.slug}
              className="bg-gray-100 border-2 border-gray-400 p-4 hover:border-black transition-all duration-200"
            >
              <h3 className="font-black text-black text-lg mb-2">
                {course.title}
              </h3>
              <p className="text-xs font-bold text-gray-600 mb-3 uppercase">
                {course.category.replace("-", " ")}
              </p>
              <Link href={course.launchPath}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-cyan-400 border-2 border-black p-3 hover:bg-cyan-500 transition-colors flex items-center justify-center"
                >
                  <Play className="h-5 w-5 text-black mr-2" />
                  <span className="font-black text-black">START COURSE</span>
                </motion.button>
              </Link>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Browse All */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border-4 border-black p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-black uppercase mb-2">
              Browse All Courses ({courses.length})
            </h2>
            <p className="text-gray-600 font-bold">
              Explore our complete library of training materials
            </p>
          </div>
          <Link href="/training-portal/browse">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="bg-black text-white px-6 py-3 border-2 border-black hover:bg-white hover:text-black transition-all font-bold uppercase text-sm flex items-center"
            >
              Browse All <ArrowRight className="h-4 w-4 ml-2" />
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
