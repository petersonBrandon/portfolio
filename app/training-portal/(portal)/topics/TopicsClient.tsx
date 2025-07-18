// app/training-portal/topics/TopicsClient.tsx
"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Play,
  Code,
  Target,
  Zap,
  Award,
  ArrowRight,
  Users,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Course } from "../../../../lib/training/getCourses";
import { useMemo } from "react";

interface TopicsClientProps {
  courses: Course[];
}

export default function TopicsClient({ courses }: TopicsClientProps) {
  // Group courses by category and get category info
  const categoryData = useMemo(() => {
    const categoryMap = new Map<string, Course[]>();

    courses.forEach((course) => {
      const category = course.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(course);
    });

    const categoryInfo = {
      frontend: {
        title: "Frontend Development",
        description:
          "Learn to build beautiful, interactive user interfaces with modern web technologies.",
        icon: Code,
        color: "bg-blue-500",
        skills: ["HTML & CSS", "JavaScript", "React", "UI/UX Design"],
        difficulty: "Beginner to Advanced",
      },
      backend: {
        title: "Backend Development",
        description:
          "Master server-side programming, databases, and API development.",
        icon: Target,
        color: "bg-green-500",
        skills: ["Node.js", "Databases", "APIs", "Authentication"],
        difficulty: "Intermediate",
      },
      devops: {
        title: "DevOps & Infrastructure",
        description:
          "Learn deployment, monitoring, and infrastructure management.",
        icon: Zap,
        color: "bg-purple-500",
        skills: ["Docker", "CI/CD", "Cloud Services", "Monitoring"],
        difficulty: "Intermediate to Advanced",
      },
      "best-practices": {
        title: "Best Practices",
        description:
          "Essential skills for writing clean, maintainable, and professional code.",
        icon: Award,
        color: "bg-orange-500",
        skills: ["Code Quality", "Testing", "Documentation", "Collaboration"],
        difficulty: "All Levels",
      },
    };

    return Array.from(categoryMap.entries()).map(([category, courselist]) => ({
      category,
      courses: courselist,
      ...categoryInfo[category as keyof typeof categoryInfo],
    }));
  }, [courses]);

  const totalCourses = courses.length;
  const avgCoursesPerCategory = Math.round(totalCourses / categoryData.length);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black p-6 border-4 border-cyan-400"
      >
        <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
          Learning Topics
        </h1>
        <p className="text-cyan-400 font-bold uppercase text-sm">
          {categoryData.length} Topic Areas • {totalCourses} Total Courses •
          Structured Learning Paths
        </p>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white border-4 border-black p-6 text-center">
          <BookOpen className="h-8 w-8 text-black mx-auto mb-2" />
          <div className="text-2xl font-black text-black">{totalCourses}</div>
          <div className="text-sm font-bold text-gray-600 uppercase">
            Total Courses
          </div>
        </div>
        <div className="bg-white border-4 border-black p-6 text-center">
          <Users className="h-8 w-8 text-black mx-auto mb-2" />
          <div className="text-2xl font-black text-black">
            {categoryData.length}
          </div>
          <div className="text-sm font-bold text-gray-600 uppercase">
            Learning Paths
          </div>
        </div>
        <div className="bg-white border-4 border-black p-6 text-center">
          <Clock className="h-8 w-8 text-black mx-auto mb-2" />
          <div className="text-2xl font-black text-black">Self-Paced</div>
          <div className="text-sm font-bold text-gray-600 uppercase">
            Learning Style
          </div>
        </div>
      </motion.div>

      {/* Topic Categories */}
      <div className="space-y-8">
        {categoryData.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white border-4 border-black p-8"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Category Info */}
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-black border-2 border-black mr-4">
                      <Icon className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-black uppercase">
                        {category.title}
                      </h2>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm font-bold text-gray-600 uppercase">
                          {category.courses.length} Courses
                        </span>
                        <span className="text-sm font-bold text-gray-600 uppercase">
                          {category.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 font-bold leading-relaxed mb-4">
                    {category.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-black text-black uppercase mb-3">
                      What You'll Learn
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {category.skills.map((skill) => (
                        <div key={skill} className="flex items-center">
                          <Star className="h-4 w-4 text-cyan-400 mr-2" />
                          <span className="text-sm font-bold text-gray-700">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/training-portal/browse?category=${category.category}`}
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-black text-white px-6 py-3 border-2 border-black hover:bg-white hover:text-black transition-all font-bold uppercase text-sm flex items-center"
                    >
                      View All {category.title} Courses{" "}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </motion.button>
                  </Link>
                </div>

                {/* Course List */}
                <div className="lg:w-1/2">
                  <h3 className="text-lg font-black text-black uppercase mb-4 border-b-2 border-gray-300 pb-2">
                    Featured Courses
                  </h3>
                  <div className="space-y-3">
                    {category.courses.slice(0, 4).map((course) => (
                      <div
                        key={course.slug}
                        className="bg-gray-100 border-2 border-gray-400 p-4 hover:border-black transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-black text-black text-sm mb-1">
                              {course.title}
                            </h4>
                            <span className="text-xs font-bold text-gray-600 uppercase">
                              {category.category.replace("-", " ")}
                            </span>
                          </div>
                          <Link href={course.launchPath}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-cyan-400 border-2 border-black p-2 hover:bg-cyan-500 transition-colors group-hover:scale-105"
                            >
                              <Play className="h-4 w-4 text-black" />
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    ))}

                    {category.courses.length > 4 && (
                      <Link
                        href={`/training-portal/browse?category=${category.category}`}
                      >
                        <div className="bg-gray-200 border-2 border-gray-400 p-4 hover:border-black transition-all duration-200 text-center">
                          <span className="font-bold text-gray-700 text-sm flex items-center justify-center">
                            View {category.courses.length - 4} More Courses
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </span>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-black border-4 border-cyan-400 p-8 text-center"
      >
        <h2 className="text-2xl font-black text-white uppercase mb-4">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="text-cyan-400 font-bold mb-6">
          Pick a topic that interests you and begin building your skills today.
        </p>
        <Link href="/training-portal/browse">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-cyan-400 text-black px-8 py-4 border-2 border-white hover:bg-cyan-500 transition-all font-black uppercase text-sm flex items-center justify-center mx-auto"
          >
            Browse All Courses <ArrowRight className="h-4 w-4 ml-2" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
