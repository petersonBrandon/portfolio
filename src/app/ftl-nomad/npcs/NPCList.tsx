"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type NPC } from "@/lib/ftl-npc";
import Link from "next/link";
import Image from "next/image";

// Existing components (DispositionBadge, StatusBadge) remain the same
const DispositionBadge = ({ disposition }: { disposition: string }) => {
  const colors = {
    friendly: "bg-green-500 text-green-100",
    neutral: "bg-yellow-500 text-yellow-100",
    hostile: "bg-red-500 text-red-100",
    unknown: "bg-gray-500 text-gray-100",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
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
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        colors[status as keyof typeof colors] || colors.unknown
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
};

// Variation 1: Compact Horizontal Card
const CompactNPCCard = ({ npc }: { npc: NPC }) => {
  return (
    <motion.div
      className="bg-black bg-opacity-40 border border-blue-400 border-opacity-30 rounded-lg p-3 hover:border-opacity-60 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/ftl-nomad/npcs/${npc.slug}`}
        className="flex items-center gap-3"
      >
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src={npc.imageUrl || "/ftl/npcs/images/anon.svg"}
            alt={npc.name}
            width={48}
            height={48}
            className="rounded-full border-2 border-blue-400 border-opacity-30"
          />
          <div className="absolute -bottom-1 -right-1">
            <div
              className={`w-3 h-3 rounded-full border-2 border-black ${
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

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-blue-200 truncate">
                {npc.name}
              </h3>
              <div className="text-xs text-gray-400">
                {npc.species} • {npc.location}
              </div>
            </div>
            <div className="flex gap-2 ml-2">
              <DispositionBadge disposition={npc.disposition} />
              <StatusBadge status={npc.status} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Variation 2: Vertical Card
const VerticalNPCCard = ({ npc }: { npc: NPC }) => {
  return (
    <motion.div
      className="bg-black bg-opacity-40 border border-blue-400 border-opacity-30 rounded-lg p-4 hover:border-opacity-60 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/ftl-nomad/npcs/${npc.slug}`} className="block">
        <div className="text-center mb-4">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <Image
              src={npc.imageUrl || "/ftl/npcs/images/anon.svg"}
              alt={npc.name}
              width={80}
              height={80}
              className="rounded-full border-2 border-blue-400 border-opacity-30"
            />
            <div className="absolute -bottom-1 -right-1">
              <div
                className={`w-4 h-4 rounded-full border-2 border-black ${
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
          <h3 className="text-lg font-semibold text-blue-200 mb-1">
            {npc.name}
          </h3>
          <div className="text-sm text-gray-400 mb-2">
            {npc.species} • {npc.faction}
          </div>
          <div className="flex justify-center gap-2 mb-3">
            <DispositionBadge disposition={npc.disposition} />
            <StatusBadge status={npc.status} />
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-300 mb-2">
            <div className="text-yellow-400">Location:</div>
            <div>{npc.location}</div>
          </div>

          <p className="text-sm text-gray-400 mb-3 line-clamp-3">
            {npc.description}
          </p>

          <div className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            View Details →
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Variation 3: Minimal Card
const MinimalNPCCard = ({ npc }: { npc: NPC }) => {
  return (
    <motion.div
      className="bg-black bg-opacity-20 border-l-4 border-blue-400 border-opacity-50 p-3 hover:border-opacity-80 hover:bg-opacity-30 transition-all duration-300"
      whileHover={{ x: 4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/ftl-nomad/npcs/${npc.slug}`}
        className="flex items-center gap-3"
      >
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={npc.imageUrl || "/ftl/npcs/images/anon.svg"}
            alt={npc.name}
            width={40}
            height={40}
            className="rounded-full border border-blue-400 border-opacity-30"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-blue-200 truncate">
                {npc.name}
              </h3>
              <div className="text-xs text-gray-400">
                {npc.species} • {npc.location}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  npc.disposition === "friendly"
                    ? "bg-green-500"
                    : npc.disposition === "hostile"
                    ? "bg-red-500"
                    : npc.disposition === "neutral"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
              />
              <span className="text-xs text-gray-400">{npc.disposition}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Variation 4: Detailed Card with Timeline
const DetailedNPCCard = ({ npc }: { npc: NPC }) => {
  return (
    <motion.div
      className="bg-black bg-opacity-40 border border-blue-400 border-opacity-30 rounded-lg p-5 hover:border-opacity-60 transition-all duration-300"
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/ftl-nomad/npcs/${npc.slug}`} className="block">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={npc.imageUrl || "/ftl/npcs/images/anon.svg"}
              alt={npc.name}
              width={64}
              height={64}
              className="rounded-full border-2 border-blue-400 border-opacity-30"
            />
            <div className="absolute -bottom-1 -right-1">
              <div
                className={`w-4 h-4 rounded-full border-2 border-black ${
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

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-blue-200">
                  {npc.name}
                </h3>
                <div className="text-sm text-gray-400">
                  {npc.species} • {npc.faction}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <DispositionBadge disposition={npc.disposition} />
                <StatusBadge status={npc.status} />
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-3 line-clamp-2">
              {npc.description}
            </p>

            {/* Timeline */}
            <div className="bg-black bg-opacity-30 rounded p-3 mb-3">
              <div className="text-xs text-yellow-400 mb-2">TIMELINE</div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Current Location:</span>
                  <span className="text-blue-300">{npc.location}</span>
                </div>
                {npc.firstMet && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">First Met:</span>
                    <span className="text-blue-300">{npc.firstMet}</span>
                  </div>
                )}
                {npc.lastSeen && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Last Seen:</span>
                    <span className="text-blue-300">{npc.lastSeen}</span>
                  </div>
                )}
              </div>
            </div>

            {npc.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {npc.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-600 bg-opacity-30 text-blue-200 text-xs rounded border border-blue-400 border-opacity-30"
                  >
                    {tag}
                  </span>
                ))}
                {npc.tags.length > 3 && (
                  <span className="text-xs text-gray-400 px-2 py-1">
                    +{npc.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-blue-400 border-opacity-20">
          <div className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            View Full Profile →
          </div>
          {npc.relationships.length > 0 && (
            <div className="text-xs text-gray-400">
              {npc.relationships.length} relationship
              {npc.relationships.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

// Updated NPCCard component with variation selection
const NPCCard = ({
  npc,
  variant = "default",
}: {
  npc: NPC;
  variant?: "default" | "compact" | "vertical" | "minimal" | "detailed";
}) => {
  switch (variant) {
    case "compact":
      return <CompactNPCCard npc={npc} />;
    case "vertical":
      return <VerticalNPCCard npc={npc} />;
    case "minimal":
      return <MinimalNPCCard npc={npc} />;
    case "detailed":
      return <DetailedNPCCard npc={npc} />;
    default:
      return (
        <motion.div
          className="bg-black bg-opacity-40 border border-blue-400 border-opacity-30 rounded-lg p-4 hover:border-opacity-60 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href={`/ftl-nomad/npcs/${npc.slug}`}
            className="flex items-start gap-4"
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={npc.imageUrl || "/ftl/npcs/images/anon.svg"}
                alt={npc.name}
                width={64}
                height={64}
                className="rounded-full border-2 border-blue-400 border-opacity-30"
              />
              <div className="absolute -bottom-1 -right-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 border-black ${
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

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-blue-200 truncate">
                    {npc.name}
                  </h3>
                  <div className="text-sm text-gray-400">
                    {npc.species} • {npc.faction}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <DispositionBadge disposition={npc.disposition} />
                  <StatusBadge status={npc.status} />
                </div>
              </div>

              <div className="text-sm text-gray-300 mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-yellow-400">Location:</span>
                  <span>{npc.location}</span>
                </div>
                {npc.firstMet && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400">First Met:</span>
                    <span>{npc.firstMet}</span>
                  </div>
                )}
                {npc.lastSeen && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400">Last Seen:</span>
                    <span>{npc.lastSeen}</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {npc.description}
              </p>

              {npc.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {npc.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-600 bg-opacity-30 text-blue-200 text-xs rounded border border-blue-400 border-opacity-30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {npc.relationships.length > 0 && (
                <div className="text-sm text-gray-400 mb-3">
                  <span className="text-yellow-400">Relationships:</span>{" "}
                  {npc.relationships.join(", ")}
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                  View Details →
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      );
  }
};

export {
  NPCCard,
  CompactNPCCard,
  VerticalNPCCard,
  MinimalNPCCard,
  DetailedNPCCard,
};

const FilterPanel = ({
  filters,
  onFilterChange,
  filterOptions,
}: {
  filters: any;
  onFilterChange: (key: string, value: string) => void;
  filterOptions: any;
}) => {
  return (
    <div className="bg-black bg-opacity-40 border border-blue-400 border-opacity-30 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-blue-200 mb-4">
        Filter Contacts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-2">
            Species
          </label>
          <select
            value={filters.species}
            onChange={(e) => onFilterChange("species", e.target.value)}
            className="w-full bg-black bg-opacity-60 border border-blue-400 border-opacity-30 rounded px-3 py-2 text-blue-100 focus:border-opacity-60 focus:outline-none"
          >
            <option value="">All Species</option>
            {filterOptions.species.map((species: string) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-2">
            Faction
          </label>
          <select
            value={filters.faction}
            onChange={(e) => onFilterChange("faction", e.target.value)}
            className="w-full bg-black bg-opacity-60 border border-blue-400 border-opacity-30 rounded px-3 py-2 text-blue-100 focus:border-opacity-60 focus:outline-none"
          >
            <option value="">All Factions</option>
            {filterOptions.factions.map((faction: string) => (
              <option key={faction} value={faction}>
                {faction}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => onFilterChange("location", e.target.value)}
            className="w-full bg-black bg-opacity-60 border border-blue-400 border-opacity-30 rounded px-3 py-2 text-blue-100 focus:border-opacity-60 focus:outline-none"
          >
            <option value="">All Locations</option>
            {filterOptions.locations.map((location: string) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-2">
            Disposition
          </label>
          <select
            value={filters.disposition}
            onChange={(e) => onFilterChange("disposition", e.target.value)}
            className="w-full bg-black bg-opacity-60 border border-blue-400 border-opacity-30 rounded px-3 py-2 text-blue-100 focus:border-opacity-60 focus:outline-none"
          >
            <option value="">All Dispositions</option>
            {filterOptions.dispositions.map((disposition: string) => (
              <option key={disposition} value={disposition}>
                {disposition.charAt(0).toUpperCase() + disposition.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full bg-black bg-opacity-60 border border-blue-400 border-opacity-30 rounded px-3 py-2 text-blue-100 focus:border-opacity-60 focus:outline-none"
          >
            <option value="">All Statuses</option>
            {filterOptions.statuses.map((status: string) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search NPCs..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full bg-black bg-opacity-60 border border-blue-400 border-opacity-30 rounded px-3 py-2 text-blue-100 focus:border-opacity-60 focus:outline-none placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

interface NPCListProps {
  initialNpcs: NPC[];
  filterOptions: any;
}

export default function NPCList({ initialNpcs, filterOptions }: NPCListProps) {
  const [filteredNpcs, setFilteredNpcs] = useState<NPC[]>(initialNpcs);
  const [filters, setFilters] = useState({
    species: "",
    faction: "",
    location: "",
    disposition: "",
    status: "",
    search: "",
  });

  useEffect(() => {
    let filtered = initialNpcs;

    // Apply filters
    if (filters.species) {
      filtered = filtered.filter((npc) => npc.species === filters.species);
    }
    if (filters.faction) {
      filtered = filtered.filter((npc) => npc.faction === filters.faction);
    }
    if (filters.location) {
      filtered = filtered.filter((npc) => npc.location === filters.location);
    }
    if (filters.disposition) {
      filtered = filtered.filter(
        (npc) => npc.disposition === filters.disposition
      );
    }
    if (filters.status) {
      filtered = filtered.filter((npc) => npc.status === filters.status);
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (npc) =>
          npc.name.toLowerCase().includes(searchTerm) ||
          npc.species.toLowerCase().includes(searchTerm) ||
          npc.faction.toLowerCase().includes(searchTerm) ||
          npc.location.toLowerCase().includes(searchTerm) ||
          npc.description.toLowerCase().includes(searchTerm) ||
          npc.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    setFilteredNpcs(filtered);
  }, [initialNpcs, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      species: "",
      faction: "",
      location: "",
      disposition: "",
      status: "",
      search: "",
    });
  };

  return (
    <>
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />

      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-sm text-gray-400">
          Showing {filteredNpcs.length} of {initialNpcs.length} contacts
        </div>
        {(filters.species ||
          filters.faction ||
          filters.location ||
          filters.disposition ||
          filters.status ||
          filters.search) && (
          <button
            onClick={clearFilters}
            className="text-red-400 hover:text-red-300 text-sm transition-colors"
          >
            Clear Filters
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {filteredNpcs.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-gray-400 text-lg mb-2">No contacts found</div>
            <div className="text-gray-500 text-sm">
              Try adjusting your filters or search terms
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {filteredNpcs.map((npc, index) => (
              <motion.div
                key={npc.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NPCCard npc={npc} variant="minimal" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
