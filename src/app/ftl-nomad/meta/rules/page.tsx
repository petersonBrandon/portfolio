// pages/ftl-nomad/meta/rules/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RulesPage() {
  const rules = [
    {
      id: "RULE_001",
      title: "Observe good manners",
      description:
        "Maintain respectful communication protocols with all crew members and entities encountered during missions.",
      priority: "CRITICAL",
      color: "green",
    },
    {
      id: "RULE_002",
      title: "Obey the judge",
      description:
        "Follow all directives and decisions issued by the designated mission commander or arbitrating authority.",
      priority: "CRITICAL",
      color: "yellow",
    },
    {
      id: "RULE_003",
      title: "Do your homework",
      description:
        "Complete all assigned research, preparation, and analysis tasks before mission deployment.",
      priority: "STANDARD",
      color: "blue",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "text-red-400";
      case "STANDARD":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const getRuleColor = (color: string) => {
    switch (color) {
      case "green":
        return "border-green-400 bg-green-400";
      case "yellow":
        return "border-yellow-400 bg-yellow-400";
      case "blue":
        return "border-blue-400 bg-blue-400";
      default:
        return "border-gray-400 bg-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-blue-400 mb-2">
          MISSION PARAMETERS
        </h1>
        <div className="text-sm text-gray-400 mb-4">
          REGULATORY_FRAMEWORK_v1.0 | COMPLIANCE_REQUIRED
        </div>
        <motion.div
          className="h-px bg-gradient-to-r from-blue-400 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
      </motion.div>

      <motion.div
        className="bg-black bg-opacity-40 p-6 rounded border border-blue-400 border-opacity-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="text-yellow-400 text-lg font-bold mb-4 flex items-center gap-2">
          <span className="text-xs">⚠</span>
          OPERATIONAL_DIRECTIVES
        </div>
        <div className="text-sm text-gray-300 mb-6">
          All crew members must adhere to the following core protocols during
          active duty. Non-compliance may result in disciplinary action or
          mission termination.
        </div>

        <div className="space-y-4">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              className="bg-gray-900 bg-opacity-50 p-4 rounded border border-gray-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <motion.div
                  className={`w-3 h-3 rounded-full ${getRuleColor(
                    rule.color
                  )} opacity-60 mt-1`}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 text-xs font-mono">
                      {rule.id}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getPriorityColor(
                        rule.priority
                      )} bg-opacity-20`}
                    >
                      {rule.priority}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {rule.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
              <motion.div
                className="h-px bg-gradient-to-r from-gray-600 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="bg-black bg-opacity-40 p-4 rounded border border-yellow-400 border-opacity-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="text-yellow-400 text-sm font-bold mb-2 flex items-center gap-2">
          <span className="text-xs">ⓘ</span>
          ENFORCEMENT_NOTICE
        </div>
        <div className="text-xs text-gray-300">
          {`These parameters are enforced by the Ship\'s AI and monitored
          continuously. For clarification on any directive, contact your
          immediate supervisor or access the CODEX database through the
          LORE_ARCHIVE.`}
        </div>
      </motion.div>
    </div>
  );
}
