"use client";

import { useState, useRef } from "react";
import matter from "gray-matter";
import { LoreEntry } from "@/lib/lore/ftl-lore";

interface LoreCreatorClientProps {
  allLoreEntries: LoreEntry[];
}

interface LoreData {
  title: string;
  category: string;
  tags: string[];
  customTag: string;
  classification: string;
  author: string;
  dateAdded: string;
  lastModified: string;
  summary: string;
  relatedEntries: string[];
  location: string;
  era: string;
  threat: string;
  verified: boolean;
  sourceReliability: string;
  content: string;
}

const CATEGORIES = [
  "technology",
  "history",
  "species",
  "culture",
  "phenomena",
  "organizations",
  "locations",
  "other",
];

const CLASSIFICATIONS = ["PUBLIC", "RESTRICTED", "CLASSIFIED", "TOP_SECRET"];
const THREAT_LEVELS = ["low", "medium", "high", "unknown"];
const SOURCE_RELIABILITY = ["confirmed", "likely", "unverified", "disputed"];

export default function LoreCreatorClient({
  allLoreEntries,
}: LoreCreatorClientProps) {
  const [loreData, setLoreData] = useState<LoreData>({
    title: "",
    category: "other",
    tags: [],
    customTag: "",
    classification: "PUBLIC",
    author: "",
    dateAdded: new Date().toISOString().split("T")[0],
    lastModified: new Date().toISOString().split("T")[0],
    summary: "",
    relatedEntries: [],
    location: "",
    era: "Present Day",
    threat: "low",
    verified: true,
    sourceReliability: "confirmed",
    content: "",
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [relatedEntriesSearch, setRelatedEntriesSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

        // Parse arrays from frontmatter
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

        setLoreData({
          title: frontmatter.title || "",
          category: frontmatter.category || "other",
          tags: parseArray(frontmatter.tags),
          customTag: "",
          classification: frontmatter.classification || "PUBLIC",
          author: frontmatter.author || "",
          dateAdded:
            frontmatter.dateAdded || new Date().toISOString().split("T")[0],
          lastModified:
            frontmatter.lastModified || new Date().toISOString().split("T")[0],
          summary: frontmatter.summary || "",
          relatedEntries: parseArray(frontmatter.relatedEntries),
          location: frontmatter.location || "",
          era: frontmatter.era || "Present Day",
          threat: frontmatter.threat || "low",
          verified: frontmatter.verified !== false,
          sourceReliability: frontmatter.sourceReliability || "confirmed",
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

  const clearForm = () => {
    setLoreData({
      title: "",
      category: "other",
      tags: ["ftl"],
      customTag: "",
      classification: "PUBLIC",
      author: "",
      dateAdded: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      summary: "",
      relatedEntries: [],
      location: "",
      era: "Present Day",
      threat: "low",
      verified: true,
      sourceReliability: "confirmed",
      content: "",
    });
    setUploadedFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addTag = () => {
    if (
      loreData.customTag.trim() &&
      !loreData.tags.includes(loreData.customTag.trim())
    ) {
      setLoreData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.customTag.trim()],
        customTag: "",
      }));
    }
  };

  const removeTag = (tag: string) => {
    setLoreData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const addRelatedEntry = (entry: string) => {
    if (entry && !loreData.relatedEntries.includes(entry)) {
      setLoreData((prev) => ({
        ...prev,
        relatedEntries: [...prev.relatedEntries, entry],
      }));
      setRelatedEntriesSearch("");
    }
  };

  const removeRelatedEntry = (entry: string) => {
    setLoreData((prev) => ({
      ...prev,
      relatedEntries: prev.relatedEntries.filter((e) => e !== entry),
    }));
  };

  const generateMarkdown = () => {
    const frontmatter = {
      title: loreData.title,
      category: loreData.category,
      tags: loreData.tags,
      classification: loreData.classification,
      author: loreData.author,
      dateAdded: loreData.dateAdded,
      lastModified: loreData.lastModified,
      summary: loreData.summary,
      relatedEntries: loreData.relatedEntries,
      location: loreData.location,
      era: loreData.era,
      threat: loreData.threat,
      verified: loreData.verified,
      sourceReliability: loreData.sourceReliability,
    };

    return matter.stringify(loreData.content, frontmatter);
  };

  const downloadMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const filename =
      uploadedFileName ||
      `${loreData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}.md`;

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isFormValid = loreData.title && loreData.content;

  const filteredEntries = allLoreEntries.filter((entry) =>
    entry.title.toLowerCase().includes(relatedEntriesSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          Upload Existing Lore
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="file"
            ref={fileInputRef}
            accept=".md"
            onChange={handleFileUpload}
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
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
            Lore Information
          </h2>
          {uploadedFileName && (
            <span className="text-sm text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded">
              Editing: {uploadedFileName}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={loreData.title}
              onChange={(e) =>
                setLoreData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Lurian Rangers"
            />
          </div>

          {/* Category and Classification */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={loreData.category}
              onChange={(e) =>
                setLoreData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Classification
            </label>
            <select
              value={loreData.classification}
              onChange={(e) =>
                setLoreData((prev) => ({
                  ...prev,
                  classification: e.target.value,
                }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CLASSIFICATIONS.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Author and Location */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Author
            </label>
            <input
              type="text"
              value={loreData.author}
              onChange={(e) =>
                setLoreData((prev) => ({ ...prev, author: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={loreData.location}
              onChange={(e) =>
                setLoreData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Lurian System"
            />
          </div>

          {/* Era and Threat Level */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Era
            </label>
            <input
              type="text"
              value={loreData.era}
              onChange={(e) =>
                setLoreData((prev) => ({ ...prev, era: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Present Day"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Threat Level
            </label>
            <select
              value={loreData.threat}
              onChange={(e) =>
                setLoreData((prev) => ({ ...prev, threat: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {THREAT_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Source Reliability and Verified */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Source Reliability
            </label>
            <select
              value={loreData.sourceReliability}
              onChange={(e) =>
                setLoreData((prev) => ({
                  ...prev,
                  sourceReliability: e.target.value,
                }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SOURCE_RELIABILITY.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center space-x-2 text-gray-300">
              <input
                type="checkbox"
                checked={loreData.verified}
                onChange={(e) =>
                  setLoreData((prev) => ({
                    ...prev,
                    verified: e.target.checked,
                  }))
                }
                className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <span className="text-sm">Verified</span>
            </label>
          </div>

          {/* Dates */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date Added
            </label>
            <input
              type="date"
              value={loreData.dateAdded}
              onChange={(e) =>
                setLoreData((prev) => ({ ...prev, dateAdded: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Last Modified
            </label>
            <input
              type="date"
              value={loreData.lastModified}
              onChange={(e) =>
                setLoreData((prev) => ({
                  ...prev,
                  lastModified: e.target.value,
                }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={loreData.customTag}
              onChange={(e) =>
                setLoreData((prev) => ({ ...prev, customTag: e.target.value }))
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
          {loreData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {loreData.tags.map((tag) => (
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

        {/* Related Entries Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Related Entries
          </label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={relatedEntriesSearch}
                onChange={(e) => setRelatedEntriesSearch(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search for related entries..."
              />
            </div>
            {relatedEntriesSearch && filteredEntries.length > 0 && (
              <div className="bg-gray-700 rounded-md border border-gray-600 max-h-32 overflow-y-auto">
                {filteredEntries.slice(0, 5).map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => addRelatedEntry(entry.title)}
                    className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-600 text-sm"
                  >
                    {entry.title}
                  </button>
                ))}
              </div>
            )}
            {loreData.relatedEntries.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {loreData.relatedEntries.map((entry) => (
                  <span
                    key={entry}
                    className="inline-flex items-center px-2 py-1 bg-purple-600 text-white text-sm rounded-md"
                  >
                    {entry}
                    <button
                      type="button"
                      onClick={() => removeRelatedEntry(entry)}
                      className="ml-2 text-purple-200 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Summary
          </label>
          <textarea
            value={loreData.summary}
            onChange={(e) =>
              setLoreData((prev) => ({ ...prev, summary: e.target.value }))
            }
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief summary of this lore entry..."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content (Markdown)
          </label>
          <textarea
            value={loreData.content}
            onChange={(e) =>
              setLoreData((prev) => ({ ...prev, content: e.target.value }))
            }
            rows={15}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="Enter your lore content here using Markdown formatting..."
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
    </div>
  );
}
