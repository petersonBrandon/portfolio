// components/ftl-nomad/CrewMemberDetail.tsx
"use client";

import { CrewMember } from "@/lib/ftl-crew";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { customMarkdownComponents } from "@/lib/markdownComponents";

interface CrewMemberDetailProps {
  member: CrewMember;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-400 bg-green-400";
    case "inactive":
      return "text-yellow-400 bg-yellow-400";
    case "deceased":
      return "text-red-400 bg-red-400";
    case "missing":
      return "text-orange-400 bg-orange-400";
    default:
      return "text-gray-400 bg-gray-400";
  }
};

const getStatusBorder = (status: string) => {
  switch (status) {
    case "active":
      return "border-green-400";
    case "inactive":
      return "border-yellow-400";
    case "deceased":
      return "border-red-400";
    case "missing":
      return "border-orange-400";
    default:
      return "border-gray-400";
  }
};

export function CrewMemberDetail({ member }: CrewMemberDetailProps) {
  return (
    <motion.div
      className="space-y-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="border-b border-blue-400 border-opacity-30 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/ftl-nomad/characters"
            className="text-blue-400 hover:text-blue-300 transition-colors font-mono text-sm"
          >
            &lt;&lt; BACK_TO_ROSTER
          </Link>
          <div
            className={`px-3 py-1 rounded text-xs ${getStatusColor(
              member.status
            )} bg-opacity-20 uppercase font-semibold border border-current border-opacity-30`}
          >
            {member.status}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-blue-400 mb-2 font-mono">
          PERSONNEL FILE: {member.name.toUpperCase()}
        </h1>
        <p className="text-gray-300 italic">{`"${member.concept}"`}</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Basic Info with Photo */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className={`bg-black bg-opacity-60 p-6 rounded border ${getStatusBorder(
              member.status
            )} border-opacity-50`}
          >
            {/* Main info section with photo */}
            <div className="flex items-start gap-6 mb-6">
              {/* Left side - Basic Information */}
              <div className="flex-1 min-w-0">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-blue-400 mb-1 font-mono">
                    {member.name}
                  </h2>
                  <div className="text-gray-400 font-mono text-sm">
                    Personnel ID: {member.slug.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between border-b border-gray-600 border-opacity-30 pb-2">
                    <span className="text-gray-400">SPECIES:</span>
                    <span className="text-blue-300 font-semibold">
                      {member.species}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-600 border-opacity-30 pb-2">
                    <span className="text-gray-400">ARCHETYPE:</span>
                    <span className="text-green-300 font-semibold">
                      {member.archetype}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-600 border-opacity-30 pb-2">
                    <span className="text-gray-400">OPERATOR:</span>
                    <span className="text-yellow-300 font-semibold">
                      {member.player}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-600 border-opacity-30 pb-2">
                    <span className="text-gray-400">STATUS:</span>
                    <span
                      className={`${getStatusColor(
                        member.status
                      )} font-semibold uppercase`}
                    >
                      {member.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - Personnel Photo */}
              <div className="flex-shrink-0">
                <div className="w-32 h-44 rounded border-2 border-blue-400 border-opacity-50 overflow-hidden bg-gray-800 flex items-center justify-center">
                  <Image
                    src={member.imageUrl || "/ftl/crew/images/anon.svg"}
                    alt={member.name}
                    width={128}
                    height={176}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/ftl/crew/images/anon.svg";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Service Record */}
            <div className="pt-4 border-t border-blue-400 border-opacity-20">
              <div className="text-blue-400 text-sm mb-3 font-mono">
                SERVICE_RECORD:
              </div>
              <div className="font-mono text-sm">
                {member.joinDate && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">ENLISTED:</span>
                    <span className="text-gray-300">{member.joinDate}</span>
                  </div>
                )}
                {member.lastSeen && member.status !== "active" && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">LAST_CONTACT:</span>
                    <span className="text-gray-300">{member.lastSeen}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Detailed Information */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-black bg-opacity-60 p-6 rounded border border-blue-400 border-opacity-30 h-full">
            <div className="text-blue-400 text-lg font-bold mb-4 font-mono border-b border-blue-400 border-opacity-30 pb-2">
              PERSONNEL_RECORD_DETAIL:
            </div>

            <div className="prose prose-invert prose-blue max-w-none">
              <ReactMarkdown components={customMarkdownComponents}>
                {member.notes}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
