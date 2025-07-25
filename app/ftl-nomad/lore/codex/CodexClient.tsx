"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Book,
  Shield,
  Clock,
  MapPin,
  Users,
  Zap,
  AlertTriangle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { LoreEntry, LoreSearchResult } from "../../../../lib/lore/ftl-lore";
import { customMarkdownComponents } from "../../../../lib/markdownComponents";

// Map string icon names to Lucide React components
const iconComponents: { [key: string]: React.ElementType } = {
  Book,
  Zap,
  Clock,
  Users,
  AlertTriangle,
  Shield,
  Search,
  MapPin,
};

interface CodexClientPageProps {
  initialEntries: LoreEntry[];
  categories: { id: string; name: string; icon: string }[];
}

function getClassificationColor(classification: string): string {
  switch (classification) {
    case "PUBLIC":
      return "text-green-400";
    case "RESTRICTED":
      return "text-yellow-400";
    case "CLASSIFIED":
      return "text-orange-400";
    case "TOP_SECRET":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

function getThreatColor(threat?: string): string {
  switch (threat) {
    case "Low":
      return "text-green-400";
    case "Medium":
      return "text-yellow-400";
    case "High":
      return "text-red-400";
    case "Unknown":
      return "text-gray-400";
    default:
      return "text-gray-400";
  }
}

function getReliabilityColor(reliability?: string): string {
  switch (reliability) {
    case "Confirmed":
      return "text-green-400";
    case "Likely":
      return "text-blue-400";
    case "Unverified":
      return "text-yellow-400";
    case "Disputed":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

export default function CodexClientPage({
  initialEntries,
  categories: initialCategories,
}: CodexClientPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState<LoreEntry | null>(null);
  const [filteredEntries, setFilteredEntries] =
    useState<LoreSearchResult[]>(initialEntries);
  const [allEntries, setAllEntries] = useState<LoreEntry[]>(initialEntries); // Keep allEntries for stats
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Initial loading is handled by server component

  // Handle search and category filtering via API calls
  useEffect(() => {
    const performFiltering = async () => {
      // If there's no search term and category is 'all', show all initial entries
      if (!searchTerm.trim() && selectedCategory === "all") {
        setFilteredEntries(allEntries);
        return;
      }

      setIsSearching(true);
      try {
        let results: LoreSearchResult[] = [];

        if (searchTerm.trim()) {
          // Fetch from search API
          const response = await fetch(
            `/api/lore/search?query=${encodeURIComponent(searchTerm)}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          results = await response.json();
        } else if (selectedCategory !== "all") {
          // Fetch from category API
          const response = await fetch(
            `/api/lore/category?category=${encodeURIComponent(
              selectedCategory
            )}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          results = await response.json();
        }

        // Apply category filter to search results if both are active
        // This client-side filtering is necessary because the search API returns all results,
        // and we need to narrow them down if a category is also selected.
        if (searchTerm.trim() && selectedCategory !== "all") {
          results = results.filter(
            (entry) => entry.category === selectedCategory
          );
        }

        setFilteredEntries(results);
      } catch (error) {
        console.error("Error filtering entries:", error);
        // Optionally, display an error message to the user
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce the filtering to prevent too many API calls
    const handler = setTimeout(() => {
      performFiltering();
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, selectedCategory, allEntries]); // allEntries is a dependency because it's used in the initial state reset

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleEntryClick = (entry: LoreEntry) => {
    setSelectedEntry(entry);
  };

  const getVerifiedCount = () => {
    return allEntries.filter((entry) => entry.verified).length;
  };

  const getClassifiedCount = () => {
    return allEntries.filter((entry) => entry.classification !== "PUBLIC")
      .length;
  };

  if (isLoading) {
    return (
      <div className="text-green-400 font-mono flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-400">Loading knowledge base...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-green-400 font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Categories and Search */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Search */}
          <div className="mb-6">
            <div className="text-yellow-400 text-sm mb-2">SEARCH_QUERY:</div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search knowledge base..."
                className="w-full bg-black bg-opacity-60 border border-gray-600 rounded px-10 py-2 text-green-400 placeholder-gray-500 focus:border-blue-400 focus:outline-none text-sm"
              />
              {isSearching && (
                <div className="absolute right-3 top-3">
                  <motion.div
                    className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <div className="text-yellow-400 text-sm mb-2">CATEGORIES:</div>
            <div className="space-y-1">
              {initialCategories.map((category) => {
                const Icon = iconComponents[category.icon]; // Get the React component from the map
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full flex items-center gap-2 p-2 rounded transition-all text-left text-sm ${
                      selectedCategory === category.id
                        ? "bg-blue-400 bg-opacity-20 text-blue-300 border border-blue-400 border-opacity-50"
                        : "hover:bg-blue-400 hover:bg-opacity-10 hover:text-blue-300"
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-black bg-opacity-60 border border-gray-600 rounded p-3">
            <div className="text-yellow-400 text-sm mb-2">DATABASE_STATS:</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Entries:</span>
                <span className="text-green-400">{allEntries.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Filtered Results:</span>
                <span className="text-blue-400">{filteredEntries.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Verified:</span>
                <span className="text-green-400">{getVerifiedCount()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Classified:</span>
                <span className="text-red-400">{getClassifiedCount()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Entries List */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-yellow-400 text-sm mb-4">
            KNOWLEDGE_ENTRIES: [{filteredEntries.length} FOUND]
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="bg-black bg-opacity-60 border border-gray-600 rounded p-4 hover:border-blue-400 hover:border-opacity-50 transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleEntryClick(entry)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-blue-400 font-bold text-lg">
                          {entry.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${getClassificationColor(
                            entry.classification
                          )}`}
                        >
                          {entry.classification}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                        <span className="uppercase">{entry.category}</span>
                        {entry.author && <span>By: {entry.author}</span>}
                        <span>
                          {new Date(entry.dateAdded).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-3">
                    {entry.summary ||
                      ("excerpt" in entry ? entry.excerpt : "") ||
                      "No summary available"}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs">
                      {entry.threat && (
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          <span className="text-gray-400">Threat:</span>
                          <span className={getThreatColor(entry.threat)}>
                            {entry.threat}
                          </span>
                        </div>
                      )}
                      {entry.sourceReliability && (
                        <div className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          <span className="text-gray-400">Reliability:</span>
                          <span
                            className={getReliabilityColor(
                              entry.sourceReliability
                            )}
                          >
                            {entry.sourceReliability}
                          </span>
                        </div>
                      )}
                      {entry.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="text-gray-400">
                            {entry.location}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-1">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-700 bg-opacity-50 text-xs rounded text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredEntries.length === 0 && (
              <motion.div
                className="text-center py-8 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Book className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No entries found matching your criteria.</p>
                <p className="text-sm">
                  Try adjusting your search or category filter.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Entry Detail Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div
              className="bg-gray-900 border border-blue-400 border-opacity-50 rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-blue-400">
                  {selectedEntry.title}
                </h2>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-400">Classification:</span>
                  <span
                    className={`ml-2 ${getClassificationColor(
                      selectedEntry.classification
                    )}`}
                  >
                    {selectedEntry.classification}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Category:</span>
                  <span className="ml-2 text-green-400 uppercase">
                    {selectedEntry.category}
                  </span>
                </div>
                {selectedEntry.author && (
                  <div>
                    <span className="text-gray-400">Author:</span>
                    <span className="ml-2 text-blue-400">
                      {selectedEntry.author}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400">Date Added:</span>
                  <span className="ml-2 text-gray-300">
                    {new Date(selectedEntry.dateAdded).toLocaleDateString()}
                  </span>
                </div>
                {selectedEntry.era && (
                  <div>
                    <span className="text-gray-400">Era:</span>
                    <span className="ml-2 text-gray-300">
                      {selectedEntry.era}
                    </span>
                  </div>
                )}
                {selectedEntry.location && (
                  <div>
                    <span className="text-gray-400">Location:</span>
                    <span className="ml-2 text-gray-300">
                      {selectedEntry.location}
                    </span>
                  </div>
                )}
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300">
                  <ReactMarkdown components={customMarkdownComponents}>
                    {selectedEntry.content}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedEntry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700 bg-opacity-50 text-xs rounded text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  {selectedEntry.threat && (
                    <div>
                      <span className="text-gray-400">Threat Level:</span>
                      <span
                        className={`ml-2 ${getThreatColor(
                          selectedEntry.threat
                        )}`}
                      >
                        {selectedEntry.threat}
                      </span>
                    </div>
                  )}
                  {selectedEntry.sourceReliability && (
                    <div>
                      <span className="text-gray-400">Source Reliability:</span>
                      <span
                        className={`ml-2 ${getReliabilityColor(
                          selectedEntry.sourceReliability
                        )}`}
                      >
                        {selectedEntry.sourceReliability}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-400">Verified:</span>
                    <span
                      className={`ml-2 ${
                        selectedEntry.verified
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {selectedEntry.verified ? "Yes" : "No"}
                    </span>
                  </div>
                  {selectedEntry.lastModified && (
                    <div>
                      <span className="text-gray-400">Last Modified:</span>
                      <span className="ml-2 text-gray-300">
                        {new Date(
                          selectedEntry.lastModified
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
