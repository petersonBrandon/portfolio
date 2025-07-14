"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { type NPC } from "@/lib/ftl-npc";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Users, Tag, Clock, Calendar } from "lucide-react";

const DispositionBadge = ({ disposition }: { disposition: string }) => {
  const colors = {
    friendly: "bg-green-500 text-green-100",
    neutral: "bg-yellow-500 text-yellow-100",
    hostile: "bg-red-500 text-red-100",
    unknown: "bg-gray-500 text-gray-100",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[disposition as keyof typeof colors] || colors.unknown
      }`}
    >
      {disposition.toUpperCase()}
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    alive: "bg-green-600 text-green-100",
    deceased: "bg-red-600 text-red-100",
    missing: "bg-orange-600 text-orange-100",
    unknown: "bg-gray-600 text-gray-100",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[status as keyof typeof colors] || colors.unknown
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
};

const InfoCard = ({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
}) => (
  <motion.div
    className="bg-black bg-opacity-40 border border-blue-400 border-opacity-30 rounded-lg p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-5 h-5 text-blue-400" />
      <h3 className="text-lg font-semibold text-blue-200">{title}</h3>
    </div>
    <div className="text-gray-300">{children}</div>
  </motion.div>
);

export default function NPCDetailClient({ npc }: { npc: NPC }) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "notes" | "relationships"
  >("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/ftl-nomad/npcs"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Contact Network
        </Link>

        <div className="h-px bg-gradient-to-r from-blue-400 to-transparent mb-6" />
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Character Info */}
        <motion.div
          className="lg:col-span-1 space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Character Portrait */}
          <div className="bg-black bg-opacity-40 border border-blue-400 border-opacity-30 rounded-lg p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={npc.imageUrl || "/ftl/npcs/images/anon.svg"}
                alt={npc.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-blue-400 border-opacity-30"
              />
              <div className="absolute -bottom-2 -right-2">
                <div
                  className={`w-8 h-8 rounded-full border-4 border-black ${
                    npc.status === "alive"
                      ? "bg-green-500"
                      : npc.status === "deceased"
                      ? "bg-red-500"
                      : npc.status === "missing"
                      ? "bg-orange-500"
                      : "bg-gray-500"
                  }`}
                />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-blue-200 mb-2">
              {npc.name}
            </h1>
            <p className="text-gray-400 mb-4">{npc.species}</p>

            <div className="flex flex-col gap-2">
              <DispositionBadge disposition={npc.disposition} />
              <StatusBadge status={npc.status} />
            </div>
          </div>

          {/* Quick Stats */}
          <InfoCard title="Quick Info" icon={Users}>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-yellow-400">Faction:</span>
                <span>{npc.faction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-400">Location:</span>
                <span>{npc.location}</span>
              </div>
              {npc.firstMet && (
                <div className="flex justify-between">
                  <span className="text-yellow-400">First Met:</span>
                  <span>{npc.firstMet}</span>
                </div>
              )}
              {npc.lastSeen && (
                <div className="flex justify-between">
                  <span className="text-yellow-400">Last Seen:</span>
                  <span>{npc.lastSeen}</span>
                </div>
              )}
            </div>
          </InfoCard>

          {/* Tags */}
          {npc.tags.length > 0 && (
            <InfoCard title="Tags" icon={Tag}>
              <div className="flex flex-wrap gap-2">
                {npc.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-600 bg-opacity-30 text-blue-200 text-sm rounded border border-blue-400 border-opacity-30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </InfoCard>
          )}
        </motion.div>

        {/* Right Column - Detailed Info */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Tab Navigation */}
          <div className="bg-black bg-opacity-40 border border-blue-400 border-opacity-30 rounded-lg p-1">
            <div className="flex space-x-1">
              {[
                { key: "overview", label: "Overview" },
                { key: "notes", label: "Notes" },
                { key: "relationships", label: "Relationships" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-blue-100"
                      : "text-gray-400 hover:text-blue-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-black bg-opacity-40 border border-blue-400 border-opacity-30 rounded-lg p-6">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-blue-200 mb-4">
                  Character Overview
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {npc.description}
                  </p>
                  {npc.notes && (
                    <div className="text-gray-300 leading-relaxed">
                      {npc.notes.split("\n").map((line, index) => (
                        <p key={index} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "notes" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-blue-200 mb-4">
                  Personal Notes
                </h3>
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {npc.notes || "No notes recorded for this contact."}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "relationships" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-blue-200 mb-4">
                  Known Relationships
                </h3>
                {npc.relationships.length > 0 ? (
                  <div className="space-y-3">
                    {npc.relationships.map((relationship, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-blue-600 bg-opacity-20 rounded border border-blue-400 border-opacity-30"
                      >
                        <Users className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-300">{relationship}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">
                    No known relationships recorded.
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
