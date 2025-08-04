"use client";

import { useState, useRef } from "react";
import matter from "gray-matter";
import { NPC } from "@/lib/ftl-npc";

interface NPCCreatorClientProps {
  existingNPCs: NPC[];
}

interface NPCData {
  name: string;
  species: string;
  faction: string;
  location: string;
  disposition: "friendly" | "neutral" | "hostile" | "unknown";
  status: "alive" | "deceased" | "missing" | "unknown";
  firstMet: string;
  lastSeen: string;
  relationships: string[];
  customRelationship: string;
  tags: string[];
  customTag: string;
  content: string;
}

const DISPOSITION_OPTIONS = [
  "friendly",
  "neutral",
  "hostile",
  "unknown",
] as const;
const STATUS_OPTIONS = ["alive", "deceased", "missing", "unknown"] as const;

export default function NPCCreatorClient({
  existingNPCs,
}: NPCCreatorClientProps) {
  const [npcData, setNPCData] = useState<NPCData>({
    name: "",
    species: "",
    faction: "",
    location: "",
    disposition: "unknown",
    status: "unknown",
    firstMet: "",
    lastSeen: "",
    relationships: [],
    customRelationship: "",
    tags: [],
    customTag: "",
    content: "",
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [relationshipSearch, setRelationshipSearch] = useState("");
  const [showRelationshipDropdown, setShowRelationshipDropdown] =
    useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter NPCs for relationship search
  const filteredNPCs = existingNPCs.filter(
    (npc) =>
      npc.name.toLowerCase().includes(relationshipSearch.toLowerCase()) &&
      !npcData.relationships.includes(npc.name) &&
      npc.name !== npcData.name
  );

  // Get current date in YYYY-M-D format
  const getCurrentDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  };

  // Set current dates
  const setCurrentDates = () => {
    const currentDate = getCurrentDate();
    setNPCData((prev) => ({
      ...prev,
      firstMet: currentDate,
      lastSeen: currentDate,
    }));
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".md")) {
      alert("Please select a markdown (.md) file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;

      try {
        const parsed = matter(content);
        const frontmatter = parsed.data;

        // Parse relationships and tags (could be string or array)
        const parseArray = (value: any) => {
          if (Array.isArray(value)) return value;
          if (typeof value === "string") {
            return value
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean);
          }
          return [];
        };

        setNPCData({
          name: frontmatter.name || "",
          species: frontmatter.species || "",
          faction: frontmatter.faction || "",
          location: frontmatter.location || "",
          disposition: frontmatter.disposition || "unknown",
          status: frontmatter.status || "unknown",
          firstMet: frontmatter.firstMet || "",
          lastSeen: frontmatter.lastSeen || "",
          relationships: parseArray(frontmatter.relationships),
          customRelationship: "",
          tags: parseArray(frontmatter.tags),
          customTag: "",
          content: parsed.content,
        });

        setUploadedFileName(file.name);
      } catch (error) {
        console.error("Error parsing markdown file:", error);
        alert("Error parsing the markdown file. Please check the file format.");
      }
    };

    reader.readAsText(file);
  };

  // Clear form and reset to default state
  const clearForm = () => {
    setNPCData({
      name: "",
      species: "",
      faction: "",
      location: "",
      disposition: "unknown",
      status: "unknown",
      firstMet: "",
      lastSeen: "",
      relationships: [],
      customRelationship: "",
      tags: [],
      customTag: "",
      content: "",
    });
    setUploadedFileName("");
    setRelationshipSearch("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Add relationship from search
  const addRelationshipFromSearch = (npcName: string) => {
    if (!npcData.relationships.includes(npcName)) {
      setNPCData((prev) => ({
        ...prev,
        relationships: [...prev.relationships, npcName],
      }));
    }
    setRelationshipSearch("");
    setShowRelationshipDropdown(false);
  };

  // Add custom relationship
  const addCustomRelationship = () => {
    if (
      npcData.customRelationship.trim() &&
      !npcData.relationships.includes(npcData.customRelationship.trim())
    ) {
      setNPCData((prev) => ({
        ...prev,
        relationships: [...prev.relationships, prev.customRelationship.trim()],
        customRelationship: "",
      }));
    }
  };

  // Remove relationship
  const removeRelationship = (relationshipName: string) => {
    setNPCData((prev) => ({
      ...prev,
      relationships: prev.relationships.filter(
        (name) => name !== relationshipName
      ),
    }));
  };

  // Add tag
  const addTag = () => {
    if (
      npcData.customTag.trim() &&
      !npcData.tags.includes(npcData.customTag.trim())
    ) {
      setNPCData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.customTag.trim()],
        customTag: "",
      }));
    }
  };

  // Remove tag
  const removeTag = (tag: string) => {
    setNPCData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const generateMarkdown = () => {
    // const tagsList = `[${npcData.tags.map((t) => `"${t}"`)}]`;
    const frontmatter = {
      name: npcData.name,
      species: npcData.species,
      faction: npcData.faction,
      location: npcData.location,
      disposition: npcData.disposition,
      status: npcData.status,
      firstMet: npcData.firstMet,
      lastSeen: npcData.lastSeen,
      relationships: npcData.relationships,
      tags: npcData.tags,
    };

    // Remove empty fields from frontmatter
    Object.keys(frontmatter).forEach((key) => {
      const value = frontmatter[key as keyof typeof frontmatter];
      if (value === "" || (Array.isArray(value) && value.length === 0)) {
        delete frontmatter[key as keyof typeof frontmatter];
      }
    });

    return matter.stringify(npcData.content, frontmatter);
  };

  const downloadMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    // Use uploaded filename if available, otherwise generate from name
    const filename =
      uploadedFileName ||
      `${npcData.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}.md`;

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isFormValid = npcData.name && npcData.content;

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          Upload Existing NPC
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="file"
              ref={fileInputRef}
              accept=".md"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
          <button
            onClick={clearForm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Clear Form
          </button>
        </div>
        {uploadedFileName && (
          <div className="mt-3 p-3 bg-green-900/30 border border-green-600 rounded-md">
            <p className="text-green-300 text-sm">
              📄 Loaded: <span className="font-medium">{uploadedFileName}</span>
            </p>
          </div>
        )}
      </div>

      {/* Form Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-100">
            NPC Information
          </h2>
          {uploadedFileName && (
            <span className="text-sm text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded">
              Editing: {uploadedFileName}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Name */}
          <div className="md:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={npcData.name}
              onChange={(e) =>
                setNPCData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dr Mayra Reiss"
            />
          </div>

          {/* Species */}
          <div>
            <label
              htmlFor="species"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Species
            </label>
            <input
              type="text"
              id="species"
              value={npcData.species}
              onChange={(e) =>
                setNPCData((prev) => ({ ...prev, species: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Human"
            />
          </div>

          {/* Faction */}
          <div>
            <label
              htmlFor="faction"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Faction
            </label>
            <input
              type="text"
              id="faction"
              value={npcData.faction}
              onChange={(e) =>
                setNPCData((prev) => ({ ...prev, faction: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Unknown"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={npcData.location}
              onChange={(e) =>
                setNPCData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nox Station"
            />
          </div>

          {/* Disposition */}
          <div>
            <label
              htmlFor="disposition"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Disposition
            </label>
            <select
              id="disposition"
              value={npcData.disposition}
              onChange={(e) =>
                setNPCData((prev) => ({
                  ...prev,
                  disposition: e.target.value as typeof npcData.disposition,
                }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {DISPOSITION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Status
            </label>
            <select
              id="status"
              value={npcData.status}
              onChange={(e) =>
                setNPCData((prev) => ({
                  ...prev,
                  status: e.target.value as typeof npcData.status,
                }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* First Met */}
          <div>
            <label
              htmlFor="firstMet"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              First Met
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="firstMet"
                value={npcData.firstMet}
                onChange={(e) =>
                  setNPCData((prev) => ({ ...prev, firstMet: e.target.value }))
                }
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2025-7-25"
              />
              <button
                type="button"
                onClick={setCurrentDates}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                Today
              </button>
            </div>
          </div>

          {/* Last Seen */}
          <div>
            <label
              htmlFor="lastSeen"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Last Seen
            </label>
            <input
              type="text"
              id="lastSeen"
              value={npcData.lastSeen}
              onChange={(e) =>
                setNPCData((prev) => ({ ...prev, lastSeen: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2025-7-25"
            />
          </div>
        </div>

        {/* Tags Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Tags
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={npcData.customTag}
              onChange={(e) =>
                setNPCData((prev) => ({ ...prev, customTag: e.target.value }))
              }
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add custom tag"
              onKeyPress={(e) => e.key === "Enter" && addTag()}
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add
            </button>
          </div>
          {npcData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {npcData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-sm rounded-md"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-blue-200 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Relationships */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Relationships
          </label>

          {/* Search existing NPCs */}
          <div className="relative mb-4">
            <input
              type="text"
              value={relationshipSearch}
              onChange={(e) => {
                setRelationshipSearch(e.target.value);
                setShowRelationshipDropdown(e.target.value.length > 0);
              }}
              onFocus={() =>
                setShowRelationshipDropdown(relationshipSearch.length > 0)
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search existing NPCs..."
            />

            {showRelationshipDropdown && filteredNPCs.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-40 overflow-y-auto">
                {filteredNPCs.slice(0, 10).map((npc) => (
                  <button
                    key={npc.name}
                    type="button"
                    onClick={() => addRelationshipFromSearch(npc.name)}
                    className="w-full px-3 py-2 text-left text-gray-100 hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  >
                    {npc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Custom relationship input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={npcData.customRelationship}
              onChange={(e) =>
                setNPCData((prev) => ({
                  ...prev,
                  customRelationship: e.target.value,
                }))
              }
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add custom relationship"
              onKeyPress={(e) => e.key === "Enter" && addCustomRelationship()}
            />
            <button
              type="button"
              onClick={addCustomRelationship}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add
            </button>
          </div>

          {/* Selected relationships display */}
          {npcData.relationships.length > 0 && (
            <div>
              <p className="text-sm text-gray-400 mb-2">Relationships:</p>
              <div className="flex flex-wrap gap-2">
                {npcData.relationships.map((relationship) => (
                  <span
                    key={relationship}
                    className="inline-flex items-center px-2 py-1 bg-purple-600 text-white text-sm rounded-md"
                  >
                    {relationship}
                    <button
                      type="button"
                      onClick={() => removeRelationship(relationship)}
                      className="ml-2 text-purple-200 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            NPC Description (Markdown) *
          </label>
          <textarea
            id="content"
            value={npcData.content}
            onChange={(e) =>
              setNPCData((prev) => ({ ...prev, content: e.target.value }))
            }
            rows={10}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="**# Dr Mayra Reiss**&#10;More info to come"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {previewMode ? "Hide Preview" : "Show Preview"}
        </button>

        <button
          onClick={downloadMarkdown}
          disabled={!isFormValid}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download Markdown
        </button>

        {uploadedFileName && (
          <div className="text-sm text-gray-400 flex items-center">
            💾 Will save as:{" "}
            <span className="ml-1 font-mono">{uploadedFileName}</span>
          </div>
        )}
      </div>

      {/* Preview Section */}
      {previewMode && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Preview</h2>
          <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-gray-300 whitespace-pre-wrap">
            {generateMarkdown()}
          </pre>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showRelationshipDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowRelationshipDropdown(false)}
        />
      )}
    </div>
  );
}
