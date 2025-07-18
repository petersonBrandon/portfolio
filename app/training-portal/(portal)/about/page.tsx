// app/training-portal/about/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  Heart,
  BookOpen,
  Users,
  Zap,
  Target,
  Award,
  Globe,
  Code,
  Lightbulb,
  GraduationCap,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const principles = [
    {
      icon: Globe,
      title: "Always Free",
      description:
        "No paywalls, no subscriptions, no hidden costs. Education should be accessible to everyone.",
    },
    {
      icon: BookOpen,
      title: "Learn at Your Pace",
      description:
        "Self-paced learning that fits your schedule. Start, pause, and resume whenever you want.",
    },
    {
      icon: Users,
      title: "No Account Required",
      description:
        "Jump right in without creating accounts or sharing personal information.",
    },
    {
      icon: Lightbulb,
      title: "Practical Focus",
      description:
        "Real-world skills and projects that you can apply immediately in your learning journey.",
    },
  ];

  const features = [
    {
      icon: Code,
      title: "Beginner-Friendly",
      description:
        "Perfect for middle school and high school students starting their tech journey.",
    },
    {
      icon: Target,
      title: "Skill-Based Learning",
      description:
        "Courses designed around specific skills you can master and build upon.",
    },
    {
      icon: Zap,
      title: "Interactive Content",
      description:
        "Hands-on exercises and projects that make learning engaging and memorable.",
    },
    {
      icon: Award,
      title: "Progressive Difficulty",
      description:
        "Start with basics and gradually advance to more complex topics.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black p-8 border-4 border-cyan-400"
      >
        <div className="flex items-center mb-4">
          <div className="p-3 bg-cyan-400 border-2 border-white mr-4">
            <Heart className="h-8 w-8 text-black" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-wider">
              About Libre Training
            </h1>
            <p className="text-cyan-400 font-bold uppercase text-sm mt-2">
              Free • Accessible • For Everyone
            </p>
          </div>
        </div>
        <p className="text-white text-lg font-bold leading-relaxed">
          {`Our mission is simple: make quality technical education accessible to
          everyone, regardless of background or financial situation. Whether
          you\'re a middle schooler curious about coding or a high schooler
          planning your future, we\'re here to help you learn and grow.`}
        </p>
      </motion.div>

      {/* Why We Exist */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border-4 border-black p-8"
      >
        <h2 className="text-3xl font-black text-black uppercase mb-6 border-b-2 border-black pb-2">
          Why We Exist
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-black text-black mb-4 uppercase">
              Breaking Down Barriers
            </h3>
            <p className="text-gray-700 font-bold leading-relaxed mb-4">
              Too many talented young people are held back by expensive courses,
              complicated registration processes, and learning materials that
              assume prior knowledge. We believe that curiosity and
              determination should be the only prerequisites for learning.
            </p>
            <p className="text-gray-700 font-bold leading-relaxed">
              This platform was born from a simple desire: to help younger
              siblings and students everywhere discover the joy of technology
              and build skills that will serve them throughout their lives.
            </p>
          </div>
          <div className="bg-gray-100 border-2 border-gray-400 p-6">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-black mr-3" />
              <h3 className="text-xl font-black text-black uppercase">
                Our Promise
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Star className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 font-bold">
                  Content designed for real understanding, not just completion
                </span>
              </li>
              <li className="flex items-start">
                <Star className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 font-bold">
                  {`Age-appropriate explanations that don\'t talk down to learners`}
                </span>
              </li>
              <li className="flex items-start">
                <Star className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 font-bold">
                  Practical projects you can be proud to show off
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Core Principles */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border-4 border-black p-8"
      >
        <h2 className="text-3xl font-black text-black uppercase mb-6 border-b-2 border-black pb-2">
          Our Core Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gray-100 border-2 border-gray-400 p-6 hover:border-black transition-all duration-200"
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-cyan-400 border-2 border-black mr-3">
                    <Icon className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-lg font-black text-black uppercase">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-gray-700 font-bold leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* What Makes Us Different */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border-4 border-black p-8"
      >
        <h2 className="text-3xl font-black text-black uppercase mb-6 border-b-2 border-black pb-2">
          What Makes Us Different
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start"
              >
                <div className="p-2 bg-black border-2 border-black mr-4 flex-shrink-0">
                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-black uppercase mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 font-bold leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Get Started */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-black border-4 border-cyan-400 p-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-black text-white uppercase mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-cyan-400 font-bold text-lg mb-6">
            No sign-ups, no hassles. Just pick a course and begin your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/training-portal/browse">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-cyan-400 text-black px-8 py-4 border-2 border-white hover:bg-cyan-500 transition-all font-black uppercase text-sm flex items-center justify-center"
              >
                Browse All Courses <ArrowRight className="h-4 w-4 ml-2" />
              </motion.button>
            </Link>
            <Link href="/training-portal/topics">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-8 py-4 border-2 border-white hover:bg-gray-100 transition-all font-black uppercase text-sm flex items-center justify-center"
              >
                Explore Topics <BookOpen className="h-4 w-4 ml-2" />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
