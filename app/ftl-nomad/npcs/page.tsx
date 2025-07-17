import React from "react";

import NPCList from "./NPCList";
import { getAllNPCs, getNPCFilterOptions } from "../../../lib/ftl-npc";

export default async function NPCsPage() {
  try {
    const [npcs, filterOptions] = await Promise.all([
      getAllNPCs(),
      getNPCFilterOptions(),
    ]);

    return (
      <div className="space-y-6">
        <div className="opacity-100">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">
            CONTACT NETWORK
          </h1>
          <p className="text-gray-400 mb-4">
            NPC Registry & Relationship Tracker
          </p>
          <div className="h-px bg-gradient-to-r from-blue-400 to-transparent mb-6" />
        </div>

        <NPCList initialNpcs={npcs} filterOptions={filterOptions} />
      </div>
    );
  } catch (error) {
    console.error("Error loading NPCs:", error);
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-2">
            Error loading contacts
          </div>
          <div className="text-gray-500 text-sm">
            Please try refreshing the page
          </div>
        </div>
      </div>
    );
  }
}
