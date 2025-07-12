// components/ftl-nomad/CrewMemberCard.tsx
"use client";

import { CrewMember } from "@/lib/ftl-crew";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface CrewMemberCardProps {
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

export function CrewMemberCard({ member }: CrewMemberCardProps) {
  return (
    <Link href={`/ftl-nomad/characters/${member.slug}`}>
      <motion.div
        className={`bg-black bg-opacity-60 p-4 rounded border ${getStatusBorder(
          member.status
        )} border-opacity-50 hover:border-opacity-80 transition-all duration-200 hover:bg-opacity-80 cursor-pointer`}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Header with status indicator */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className={`w-3 h-3 rounded-full ${getStatusColor(
              member.status
            )} bg-opacity-50`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span
            className={`text-xs px-2 py-1 rounded ${getStatusColor(
              member.status
            )} bg-opacity-20 uppercase font-semibold border border-current border-opacity-30`}
          >
            {member.status}
          </span>
        </div>

        {/* Main content area with photo and identification */}
        <div className="flex items-start gap-4 mb-4">
          {/* Left side - Personnel identification */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-blue-400 mb-1 font-mono leading-tight">
              {member.name}
            </h3>
            <p className="text-sm text-gray-300 italic mb-3 leading-tight">
              {`"${member.concept}"`}
            </p>

            {/* Character specifications */}
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-gray-400">SPECIES:</span>
                <span className="text-blue-300">{member.species}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ARCHETYPE:</span>
                <span className="text-green-300">{member.archetype}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">OPERATOR:</span>
                <span className="text-yellow-300">{member.player}</span>
              </div>
            </div>
          </div>

          {/* Right side - Personnel photo */}
          <div className="flex-shrink-0">
            <div className="w-20 h-28 rounded border-2 border-blue-400 border-opacity-50 overflow-hidden bg-gray-800 flex items-center justify-center">
              <Image
                src={member.imageUrl || "/ftl/crew/images/anon.svg"}
                alt={member.name}
                width={80}
                height={112}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to anonymous placeholder
                  e.currentTarget.src = "/ftl/crew/images/anon.svg";
                }}
              />
            </div>
          </div>
        </div>

        {/* Personnel record excerpt */}
        {member.backstory && (
          <div className="mb-3 pt-3 border-t border-blue-400 border-opacity-20">
            <div className="text-xs text-gray-400 mb-1">PERSONNEL_RECORD:</div>
            <p className="text-xs text-gray-300 leading-relaxed font-mono">
              {member.backstory}
            </p>
          </div>
        )}

        {/* Service record */}
        <div className="pt-2 border-t border-gray-600 border-opacity-30 text-xs text-gray-500 font-mono">
          {member.joinDate && (
            <div className="flex justify-between mb-1">
              <span>ENLISTED:</span>
              <span>{member.joinDate}</span>
            </div>
          )}
          {member.lastSeen && member.status !== "active" && (
            <div className="flex justify-between mb-1">
              <span>LAST_CONTACT:</span>
              <span>{member.lastSeen}</span>
            </div>
          )}
        </div>

        {/* Click indicator */}
        <div className="mt-3 text-center">
          <div className="text-xs text-blue-400 font-mono">
            &gt;&gt; ACCESS_FULL_RECORD
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
