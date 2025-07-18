// app/training-portal/browse/BrowseClient.tsx
"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Play,
  Search,
  Filter,
  Grid,
  List,
  Code,
  Target,
  Zap,
  Award,
  X,
} from "lucide-react";
import Link from "next/link";
import { Course } from "../../../../lib/training/getCourses";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface BrowseClientProps {
  courses: Course[];
}

export default function BrowseClient({ courses }: BrowseClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") || null
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    (searchParams.get("view") as "grid" | "list") || "grid"
  );

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory) params.set("category", selectedCategory);
    if (viewMode !== "grid") params.set("view", viewMode);

    const newUrl = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.replace(newUrl);
  }, [searchTerm, selectedCategory, viewMode, pathname, router]);

  // Get unique categories and their counts
  const categories = useMemo(() => {
    const categoryMap = new Map<string, { count: number; icon: any }>();

    const categoryIcons = {
      frontend: Code,
      backend: Target,
      devops: Zap,
      "best-practices": Award,
    };

    courses.forEach((course) => {
      const category = course.category;
      if (categoryMap.has(category)) {
        categoryMap.get(category)!.count++;
      } else {
        categoryMap.set(category, {
          count: 1,
          icon:
            categoryIcons[category as keyof typeof categoryIcons] || BookOpen,
        });
      }
    });

    return Array.from(categoryMap.entries()).map(([name, data]) => ({
      name,
      count: data.count,
      icon: data.icon,
    }));
  }, [courses]);

  // Filter courses based on search and category
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  const formatCategoryName = (category: string) => {
    return category.replace("-", " ").toUpperCase();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black p-6 border-4 border-cyan-400"
      >
        <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
          Browse All Courses
        </h1>
        <p className="text-cyan-400 font-bold uppercase text-sm">
          {courses.length} courses available • All free • No prerequisites
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border-4 border-black p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 focus:border-black focus:outline-none font-bold"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-black" />
              <span className="font-black text-sm uppercase">View:</span>
              <div className="flex border-2 border-black">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border-4 border-black p-6"
      >
        <h2 className="text-2xl font-black text-black uppercase mb-4 border-b-2 border-black pb-2">
          Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 border-2 font-bold uppercase text-sm transition-all ${
              !selectedCategory
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-400 hover:border-black"
            }`}
          >
            All ({courses.length})
          </motion.button>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 border-2 font-bold uppercase text-sm transition-all flex items-center ${
                  selectedCategory === category.name
                    ? "bg-cyan-400 text-black border-black"
                    : "bg-white text-black border-gray-400 hover:border-black"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {formatCategoryName(category.name)} ({category.count})
              </motion.button>
            );
          })}
        </div>

        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-gray-100 border-2 border-gray-400 flex items-center justify-between"
          >
            <span className="font-bold text-gray-700">
              Showing {filteredCourses.length} courses in{" "}
              {formatCategoryName(selectedCategory)}
            </span>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-gray-500 hover:text-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border-4 border-black p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-black uppercase border-b-2 border-black pb-2">
            {searchTerm
              ? `Search Results (${filteredCourses.length})`
              : selectedCategory
              ? `${selectedCategory} Courses`
              : "All Courses"}
          </h2>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-black text-gray-600 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 font-bold">
              Try adjusting your search terms or category filters
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={
                  viewMode === "grid"
                    ? "bg-gray-100 border-2 border-gray-400 p-4 hover:border-black transition-all duration-200"
                    : "bg-gray-100 border-2 border-gray-400 p-4 hover:border-black transition-all duration-200 flex items-center justify-between"
                }
              >
                <div className={viewMode === "list" ? "flex-1" : ""}>
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-black text-white text-xs font-bold uppercase">
                      {formatCategoryName(course.category)}
                    </span>
                  </div>
                  <h3 className="font-black text-black text-lg mb-3">
                    {course.title}
                  </h3>

                  {viewMode === "grid" && (
                    <Link href={course.launchPath}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-cyan-400 border-2 border-black p-3 hover:bg-cyan-500 transition-colors flex items-center justify-center"
                      >
                        <Play className="h-5 w-5 text-black mr-2" />
                        <span className="font-black text-black">
                          START COURSE
                        </span>
                      </motion.button>
                    </Link>
                  )}
                </div>

                {viewMode === "list" && (
                  <div className="ml-4">
                    <Link href={course.launchPath}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-cyan-400 border-2 border-black px-6 py-2 hover:bg-cyan-500 transition-colors flex items-center"
                      >
                        <Play className="h-4 w-4 text-black mr-2" />
                        <span className="font-black text-black text-sm">
                          START
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
