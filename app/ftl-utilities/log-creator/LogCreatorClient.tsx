"use client";

import { useState, useRef } from "react";
import matter from "gray-matter";
import { CrewMember } from "@/lib/ftl-crew";

interface LogCreatorClientProps {
  activeCrew: CrewMember[];
}

interface LogData {
  title: string;
  date: string;
  earthDate: string;
  crew: string[];
  customCrew: string;
  content: string;
}

export default function LogCreatorClient({
  activeCrew,
}: LogCreatorClientProps) {
  const [logData, setLogData] = useState<LogData>({
    title: "",
    date: "",
    earthDate: "",
    crew: activeCrew.map((member) => member.name),
    customCrew: "",
    content: "",
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate current dates
  const getCurrentDates = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(currentYear, 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    setLogData((prev) => ({
      ...prev,
      date: `${currentYear + 376}.${dayOfYear.toString().padStart(3, "0")}`,
      earthDate: now.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }),
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

        // Parse crew from frontmatter (could be string or array)
        let crewArray: string[] = [];
        if (typeof frontmatter.crew === "string") {
          crewArray = frontmatter.crew
            .split(",")
            .map((name: string) => name.trim())
            .filter(Boolean);
        } else if (Array.isArray(frontmatter.crew)) {
          crewArray = frontmatter.crew;
        }

        setLogData({
          title: frontmatter.title || "",
          date: frontmatter.date || "",
          earthDate: frontmatter.earthDate || "",
          crew: crewArray,
          customCrew: "",
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
    setLogData({
      title: "",
      date: "",
      earthDate: "",
      crew: activeCrew.map((member) => member.name),
      customCrew: "",
      content: "",
    });
    setUploadedFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCrewToggle = (crewName: string) => {
    setLogData((prev) => ({
      ...prev,
      crew: prev.crew.includes(crewName)
        ? prev.crew.filter((name) => name !== crewName)
        : [...prev.crew, crewName],
    }));
  };

  const addCustomCrew = () => {
    if (
      logData.customCrew.trim() &&
      !logData.crew.includes(logData.customCrew.trim())
    ) {
      setLogData((prev) => ({
        ...prev,
        crew: [...prev.crew, prev.customCrew.trim()],
        customCrew: "",
      }));
    }
  };

  const removeCrewMember = (crewName: string) => {
    setLogData((prev) => ({
      ...prev,
      crew: prev.crew.filter((name) => name !== crewName),
    }));
  };

  const generateMarkdown = () => {
    const frontmatter = {
      title: logData.title,
      date: logData.date,
      earthDate: logData.earthDate,
      crew: logData.crew.join(", "),
    };

    return matter.stringify(logData.content, frontmatter);
  };

  const downloadMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    // Use uploaded filename if available, otherwise generate from title
    const filename =
      uploadedFileName ||
      `${logData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}.md`;

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isFormValid =
    logData.title && logData.date && logData.earthDate && logData.content;

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          Upload Existing Log
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
            Log Information
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
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={logData.title}
              onChange={(e) =>
                setLogData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mission Log 002: Nox Station – The Missing Scientist"
            />
          </div>

          {/* Dates */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Date (FTL Format)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="date"
                value={logData.date}
                onChange={(e) =>
                  setLogData((prev) => ({ ...prev, date: e.target.value }))
                }
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2401.158"
              />
              <button
                type="button"
                onClick={getCurrentDates}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                Now
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="earthDate"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Earth Date
            </label>
            <input
              type="text"
              id="earthDate"
              value={logData.earthDate}
              onChange={(e) =>
                setLogData((prev) => ({ ...prev, earthDate: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="7/31/2025"
            />
          </div>
        </div>

        {/* Crew Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Crew Members
          </label>

          {/* Active Crew Checkboxes */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {activeCrew.map((member) => (
              <label
                key={member.name}
                className="flex items-center space-x-2 text-gray-300"
              >
                <input
                  type="checkbox"
                  checked={logData.crew.includes(member.name)}
                  onChange={() => handleCrewToggle(member.name)}
                  className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <span className="text-sm">{member.name}</span>
              </label>
            ))}
          </div>

          {/* Custom Crew Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={logData.customCrew}
              onChange={(e) =>
                setLogData((prev) => ({ ...prev, customCrew: e.target.value }))
              }
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add custom crew member"
              onKeyPress={(e) => e.key === "Enter" && addCustomCrew()}
            />
            <button
              type="button"
              onClick={addCustomCrew}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add
            </button>
          </div>

          {/* Selected Crew Display */}
          {logData.crew.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-400 mb-2">Selected crew:</p>
              <div className="flex flex-wrap gap-2">
                {logData.crew.map((member) => (
                  <span
                    key={member}
                    className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-sm rounded-md"
                  >
                    {member}
                    <button
                      type="button"
                      onClick={() => removeCrewMember(member)}
                      className="ml-2 text-blue-200 hover:text-white"
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
            Log Content (Markdown)
          </label>
          <textarea
            id="content"
            value={logData.content}
            onChange={(e) =>
              setLogData((prev) => ({ ...prev, content: e.target.value }))
            }
            rows={15}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="Enter your mission log content here using Markdown formatting..."
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
