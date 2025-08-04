"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GridSystem,
  PointOfInterest,
  StarSystem,
} from "../../../lib/ftl-systems";

interface SystemCreatorClientProps {
  initialSystems: StarSystem[];
}

interface SystemData {
  id: string;
  name: string;
  coordinates: { q: number; r: number; s: number };
  type: "core" | "colony" | "frontier" | "military" | "research" | "derelict";
  planets: number;
  faction: string;
  description: string;
  threats: "Low" | "Medium" | "High" | "Unknown";
  resources: string[];
  visited: boolean;
  lastVisit: string;
  population: number;
  government: string;
  economy: string;
  defenses: string;
  starType: string;
  climate: string;
  gravity: string;
  atmosphere: string;
  age: string;
  notes: string;
  pointsOfInterest: PointOfInterest[];
  tradingPosts: string[];
  jumpGates: string[];
}

const SYSTEM_TYPES = [
  "core",
  "colony",
  "frontier",
  "military",
  "research",
  "derelict",
];
const THREAT_LEVELS = ["Low", "Medium", "High", "Unknown"];
const STAR_TYPES = [
  "O",
  "B",
  "A",
  "F",
  "G",
  "K",
  "M",
  "Brown Dwarf",
  "White Dwarf",
  "Neutron Star",
  "Black Hole",
];
const POI_TYPES = [
  "station",
  "anomaly",
  "wreckage",
  "outpost",
  "beacon",
  "other",
];

const hexToPixel = (q: number, r: number, size: number) => {
  const x = size * ((3 / 2) * q);
  const y = size * ((Math.sqrt(3) / 2) * q + Math.sqrt(3) * r);
  return { x, y };
};

const pixelToHex = (x: number, y: number, size: number) => {
  const q = ((2 / 3) * x) / size;
  const r = ((-1 / 3) * x + (Math.sqrt(3) / 3) * y) / size;
  return {
    q: Math.round(q),
    r: Math.round(r),
    s: -Math.round(q) - Math.round(r),
  };
};

const Hexagon = ({
  coordinates,
  size,
  onClick,
  isSelected,
  hasSystem,
  systemType,
  threats,
  visited,
}: {
  coordinates: { q: number; r: number; s: number };
  size: number;
  onClick: (coords: { q: number; r: number; s: number }) => void;
  isSelected: boolean;
  hasSystem: boolean;
  systemType?: string;
  threats?: string;
  visited?: boolean;
}) => {
  const { x, y } = hexToPixel(coordinates.q, coordinates.r, size);

  const getSystemColor = (type?: string, visited?: boolean) => {
    if (!type) return "transparent";

    const colors = {
      core: visited ? "#3b82f6" : "#1d4ed8",
      colony: visited ? "#10b981" : "#047857",
      frontier: visited ? "#f59e0b" : "#d97706",
      military: visited ? "#ef4444" : "#dc2626",
      research: visited ? "#8b5cf6" : "#7c3aed",
      derelict: visited ? "#6b7280" : "#4b5563",
    };
    return colors[type as keyof typeof colors] || "#6b7280";
  };

  const getThreatColor = (threat?: string) => {
    const colors = {
      Low: "#10b981",
      Medium: "#f59e0b",
      High: "#ef4444",
      Unknown: "#6b7280",
    };
    return colors[threat as keyof typeof colors] || "#6b7280";
  };

  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const px = x + size * 0.8 * Math.cos(angle);
    const py = y + size * 0.8 * Math.sin(angle);
    points.push(`${px},${py}`);
  }

  return (
    <g>
      <polygon
        points={points.join(" ")}
        fill={isSelected ? "rgba(251, 191, 36, 0.2)" : "rgba(30, 58, 138, 0.1)"}
        stroke={isSelected ? "#fbbf24" : "rgba(59, 130, 246, 0.3)"}
        strokeWidth={isSelected ? 2 : 1}
        className="cursor-pointer"
        onClick={() => onClick(coordinates)}
      />

      {hasSystem && (
        <>
          <circle
            cx={x}
            cy={y}
            r={size * 0.3}
            fill={getSystemColor(systemType, visited)}
            stroke={getThreatColor(threats)}
            strokeWidth={2}
            className="pointer-events-none"
          />

          {visited && (
            <circle
              cx={x + size * 0.25}
              cy={y - size * 0.25}
              r={3}
              fill="#10b981"
              className="pointer-events-none"
            />
          )}
        </>
      )}

      <text
        x={x}
        y={y + size * 0.9}
        textAnchor="middle"
        fontSize="8"
        fill="#9ca3af"
        className="font-mono pointer-events-none absolute -translate-y-[13px]"
      >
        {coordinates.q},{coordinates.r}
      </text>
    </g>
  );
};

export default function SystemCreatorClient({
  initialSystems,
}: SystemCreatorClientProps) {
  const [systems, setSystems] = useState<GridSystem[]>(initialSystems);
  const [selectedCoords, setSelectedCoords] = useState<{
    q: number;
    r: number;
    s: number;
  } | null>(null);
  const [systemData, setSystemData] = useState<SystemData>({
    id: "",
    name: "",
    coordinates: { q: 0, r: 0, s: 0 },
    type: "frontier",
    planets: 1,
    faction: "",
    description: "",
    threats: "Unknown",
    resources: [],
    visited: false,
    lastVisit: "",
    population: 0,
    government: "",
    economy: "",
    defenses: "",
    starType: "",
    climate: "",
    gravity: "",
    atmosphere: "",
    age: "",
    notes: "",
    pointsOfInterest: [],
    tradingPosts: [],
    jumpGates: [],
  });

  const [customResource, setCustomResource] = useState("");
  const [customTradingPost, setCustomTradingPost] = useState("");
  const [customJumpGate, setCustomJumpGate] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Map state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 400,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const hexSize = 40;

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const updateGrid = useCallback(async () => {
    const viewCenter = pixelToHex(-pan.x, -pan.y, hexSize);

    try {
      const response = await fetch("/api/systems/grid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          centerQ: viewCenter.q,
          centerR: viewCenter.r,
          zoom,
          mapWidth: containerSize.width,
          mapHeight: containerSize.height,
          hexSize,
        }),
      });

      if (response.ok) {
        const newSystems = await response.json();
        setSystems(newSystems);
      }
    } catch (error) {
      console.error("Failed to update grid:", error);
    }
  }, [pan.x, pan.y, zoom, hexSize, containerSize.width, containerSize.height]);

  // Debounced grid update
  useEffect(() => {
    const timer = setTimeout(updateGrid, 300);
    return () => clearTimeout(timer);
  }, [updateGrid]);

  const handleCoordinateClick = (coords: {
    q: number;
    r: number;
    s: number;
  }) => {
    setSelectedCoords(coords);

    // Find existing system at these coordinates
    const existingSystem = systems.find(
      (s) =>
        s.coordinates.q === coords.q &&
        s.coordinates.r === coords.r &&
        s.coordinates.s === coords.s &&
        !s.isEmpty
    );

    if (existingSystem) {
      // Load existing system data
      setSystemData({
        id: existingSystem.id,
        name: existingSystem.name,
        coordinates: existingSystem.coordinates,
        type: existingSystem.type as any,
        planets: existingSystem.planets,
        faction: existingSystem.faction,
        description: existingSystem.description,
        threats: existingSystem.threats,
        resources: existingSystem.resources || [],
        visited: existingSystem.visited,
        lastVisit: existingSystem.lastVisit || "",
        population: existingSystem.population || 0,
        government: existingSystem.government || "",
        economy: existingSystem.economy || "",
        defenses: existingSystem.defenses || "",
        starType: existingSystem.starType || "",
        climate: existingSystem.climate || "",
        gravity: existingSystem.gravity || "",
        atmosphere: existingSystem.atmosphere || "",
        age: existingSystem.age || "",
        notes: existingSystem.notes || "",
        pointsOfInterest: existingSystem.pointsOfInterest || [],
        tradingPosts: existingSystem.tradingPosts || [],
        jumpGates: existingSystem.jumpGates || [],
      });
      setUploadedFileName("");
    } else {
      // Create new system at coordinates
      const newId = `system-${coords.q}-${coords.r}-${coords.s}`;
      setSystemData({
        id: newId,
        name: "",
        coordinates: coords,
        type: "frontier",
        planets: 1,
        faction: "",
        description: "",
        threats: "Unknown",
        resources: [],
        visited: false,
        lastVisit: "",
        population: 0,
        government: "",
        economy: "",
        defenses: "",
        starType: "",
        climate: "",
        gravity: "",
        atmosphere: "",
        age: "",
        notes: "",
        pointsOfInterest: [],
        tradingPosts: [],
        jumpGates: [],
      });
      setUploadedFileName("");
    }
  };

  const addResource = () => {
    if (
      customResource.trim() &&
      !systemData.resources.includes(customResource.trim())
    ) {
      setSystemData((prev) => ({
        ...prev,
        resources: [...prev.resources, customResource.trim()],
      }));
      setCustomResource("");
    }
  };

  const removeResource = (resource: string) => {
    setSystemData((prev) => ({
      ...prev,
      resources: prev.resources.filter((r) => r !== resource),
    }));
  };

  const addTradingPost = () => {
    if (
      customTradingPost.trim() &&
      !systemData.tradingPosts.includes(customTradingPost.trim())
    ) {
      setSystemData((prev) => ({
        ...prev,
        tradingPosts: [...prev.tradingPosts, customTradingPost.trim()],
      }));
      setCustomTradingPost("");
    }
  };

  const removeTradingPost = (post: string) => {
    setSystemData((prev) => ({
      ...prev,
      tradingPosts: prev.tradingPosts.filter((p) => p !== post),
    }));
  };

  const addJumpGate = () => {
    if (
      customJumpGate.trim() &&
      !systemData.jumpGates.includes(customJumpGate.trim())
    ) {
      setSystemData((prev) => ({
        ...prev,
        jumpGates: [...prev.jumpGates, customJumpGate.trim()],
      }));
      setCustomJumpGate("");
    }
  };

  const removeJumpGate = (gate: string) => {
    setSystemData((prev) => ({
      ...prev,
      jumpGates: prev.jumpGates.filter((g) => g !== gate),
    }));
  };

  const addPointOfInterest = () => {
    const newPOI: PointOfInterest = {
      id: `poi-${Date.now()}`,
      name: "",
      type: "station",
      description: "",
      coordinates: "",
      discovered: true,
      threat: "",
    };
    setSystemData((prev) => ({
      ...prev,
      pointsOfInterest: [...prev.pointsOfInterest, newPOI],
    }));
  };

  const updatePointOfInterest = (
    index: number,
    field: keyof PointOfInterest,
    value: any
  ) => {
    setSystemData((prev) => ({
      ...prev,
      pointsOfInterest: prev.pointsOfInterest.map((poi, i) =>
        i === index ? { ...poi, [field]: value } : poi
      ),
    }));
  };

  const removePointOfInterest = (index: number) => {
    setSystemData((prev) => ({
      ...prev,
      pointsOfInterest: prev.pointsOfInterest.filter((_, i) => i !== index),
    }));
  };

  const generateJSON = () => {
    return JSON.stringify(systemData, null, 2);
  };

  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const filename =
      uploadedFileName ||
      `${
        systemData.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") || systemData.id
      }.json`;

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".json")) {
      alert("Please select a JSON (.json) file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;

      try {
        const systemDataFromFile = JSON.parse(content);

        // Validate that it has the required structure
        if (!systemDataFromFile.id || !systemDataFromFile.coordinates) {
          alert("Invalid system file format. Missing required fields.");
          return;
        }

        // Ensure all required fields exist with defaults
        const loadedSystem: SystemData = {
          id: systemDataFromFile.id || "",
          name: systemDataFromFile.name || "",
          coordinates: systemDataFromFile.coordinates || { q: 0, r: 0, s: 0 },
          type: systemDataFromFile.type || "frontier",
          planets: systemDataFromFile.planets || 1,
          faction: systemDataFromFile.faction || "",
          description: systemDataFromFile.description || "",
          threats: systemDataFromFile.threats || "Unknown",
          resources: systemDataFromFile.resources || [],
          visited: systemDataFromFile.visited || false,
          lastVisit: systemDataFromFile.lastVisit || "",
          population: systemDataFromFile.population || 0,
          government: systemDataFromFile.government || "",
          economy: systemDataFromFile.economy || "",
          defenses: systemDataFromFile.defenses || "",
          starType: systemDataFromFile.starType || "",
          climate: systemDataFromFile.climate || "",
          gravity: systemDataFromFile.gravity || "",
          atmosphere: systemDataFromFile.atmosphere || "",
          age: systemDataFromFile.age || "",
          notes: systemDataFromFile.notes || "",
          pointsOfInterest: systemDataFromFile.pointsOfInterest || [],
          tradingPosts: systemDataFromFile.tradingPosts || [],
          jumpGates: systemDataFromFile.jumpGates || [],
        };

        setSystemData(loadedSystem);
        setSelectedCoords(loadedSystem.coordinates);
        setUploadedFileName(file.name);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        alert("Error parsing the JSON file. Please check the file format.");
      }
    };

    reader.readAsText(file);
  };

  const clearForm = () => {
    if (selectedCoords) {
      const newId = `system-${selectedCoords.q}-${selectedCoords.r}-${selectedCoords.s}`;
      setSystemData({
        id: newId,
        name: "",
        coordinates: selectedCoords,
        type: "frontier",
        planets: 1,
        faction: "",
        description: "",
        threats: "Unknown",
        resources: [],
        visited: false,
        lastVisit: "",
        population: 0,
        government: "",
        economy: "",
        defenses: "",
        starType: "",
        climate: "",
        gravity: "",
        atmosphere: "",
        age: "",
        notes: "",
        pointsOfInterest: [],
        tradingPosts: [],
        jumpGates: [],
      });
    }
    setUploadedFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Map interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const isFormValid = systemData.name && selectedCoords;

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          Upload Existing System
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
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

      {/* Coordinate Selection Map */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-100">
            Select Coordinates
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={resetView}
              className="px-3 py-1 bg-blue-400 bg-opacity-20 hover:bg-opacity-30 border border-blue-400 border-opacity-50 rounded text-blue-300 text-sm transition-all"
            >
              Reset View
            </button>
            <div className="text-xs text-gray-400 bg-black bg-opacity-40 px-2 py-1 rounded border border-blue-400 border-opacity-50">
              {Math.round(zoom * 100)}%
            </div>
          </div>
        </div>

        {selectedCoords && (
          <div className="mb-4 p-3 bg-blue-900/30 border border-blue-600 rounded-md">
            <p className="text-blue-300 text-sm">
              Selected:{" "}
              <span className="font-mono">
                {selectedCoords.q}, {selectedCoords.r}, {selectedCoords.s}
              </span>
              {systems.find(
                (s) =>
                  s.coordinates.q === selectedCoords.q &&
                  s.coordinates.r === selectedCoords.r &&
                  !s.isEmpty
              ) && (
                <span className="ml-2 text-yellow-400">(Existing System)</span>
              )}
            </p>
          </div>
        )}

        <div
          className="relative h-96 border border-gray-600 rounded overflow-hidden"
          ref={containerRef}
        >
          <svg
            width={containerSize.width}
            height={containerSize.height}
            className="select-none"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <g
              transform={`translate(${containerSize.width / 2 + pan.x}, ${
                containerSize.height / 2 + pan.y
              }) scale(${zoom})`}
            >
              {systems.map((system) => (
                <Hexagon
                  key={system.id}
                  coordinates={system.coordinates}
                  size={hexSize}
                  onClick={handleCoordinateClick}
                  isSelected={
                    selectedCoords?.q === system.coordinates.q &&
                    selectedCoords?.r === system.coordinates.r
                  }
                  hasSystem={!system.isEmpty}
                  systemType={system.type}
                  threats={system.threats}
                  visited={system.visited}
                />
              ))}
            </g>
          </svg>
        </div>

        <div className="mt-3 text-xs text-gray-400">
          Click on a hex coordinate to select it. Existing systems are shown
          with colored circles.
        </div>
      </div>

      {/* System Form */}
      {selectedCoords && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-100">
              System Information
            </h2>
            {uploadedFileName && (
              <span className="text-sm text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded">
                Editing: {uploadedFileName}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Basic Info */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                System Name
              </label>
              <input
                type="text"
                value={systemData.name}
                onChange={(e) =>
                  setSystemData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter system name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                System Type
              </label>
              <select
                value={systemData.type}
                onChange={(e) =>
                  setSystemData((prev) => ({
                    ...prev,
                    type: e.target.value as any,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SYSTEM_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Threat Level
              </label>
              <select
                value={systemData.threats}
                onChange={(e) =>
                  setSystemData((prev) => ({
                    ...prev,
                    threats: e.target.value as any,
                  }))
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Planets
              </label>
              <input
                type="number"
                min="0"
                value={systemData.planets}
                onChange={(e) =>
                  setSystemData((prev) => ({
                    ...prev,
                    planets: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Population
              </label>
              <input
                type="number"
                min="0"
                value={systemData.population}
                onChange={(e) =>
                  setSystemData((prev) => ({
                    ...prev,
                    population: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Faction
              </label>
              <input
                type="text"
                value={systemData.faction}
                onChange={(e) =>
                  setSystemData((prev) => ({
                    ...prev,
                    faction: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Controlling faction"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Government
              </label>
              <input
                type="text"
                value={systemData.government}
                onChange={(e) =>
                  setSystemData((prev) => ({
                    ...prev,
                    government: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Government type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Economy
              </label>
              <input
                type="text"
                value={systemData.economy}
                onChange={(e) =>
                  setSystemData((prev) => ({
                    ...prev,
                    economy: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Economic focus"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Star Type
              </label>
              <select
                value={systemData.starType}
                onChange={(e) =>
                  setSystemData((prev) => ({
                    ...prev,
                    starType: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select star type</option>
                {STAR_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Climate
              </label>
              <input
                type="text"
                value={systemData.climate}
                onChange={(e) =>
                  setSystemData((prev) => ({
                    ...prev,
                    climate: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Temperate, Arctic, Desert, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Gravity
              </label>
              <input
                type="text"
                value={systemData.gravity}
                onChange={(e) =>
                  setSystemData((prev) => ({
                    ...prev,
                    gravity: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Low, Standard, High, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Atmosphere
              </label>
              <input
                type="text"
                value={systemData.atmosphere}
                onChange={(e) =>
                  setSystemData((prev) => ({
                    ...prev,
                    atmosphere: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Breathable, Toxic, Thin, etc."
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={systemData.visited}
                  onChange={(e) =>
                    setSystemData((prev) => ({
                      ...prev,
                      visited: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <span className="text-sm">Visited</span>
              </label>
            </div>

            {systemData.visited && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Visit
                </label>
                <input
                  type="date"
                  value={systemData.lastVisit}
                  onChange={(e) =>
                    setSystemData((prev) => ({
                      ...prev,
                      lastVisit: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={systemData.description}
              onChange={(e) =>
                setSystemData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the system..."
            />
          </div>

          {/* Resources */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Resources
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={customResource}
                onChange={(e) => setCustomResource(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add resource"
                onKeyPress={(e) => e.key === "Enter" && addResource()}
              />
              <button
                type="button"
                onClick={addResource}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add
              </button>
            </div>
            {systemData.resources.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {systemData.resources.map((resource) => (
                  <span
                    key={resource}
                    className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-sm rounded-md"
                  >
                    {resource}
                    <button
                      type="button"
                      onClick={() => removeResource(resource)}
                      className="ml-2 text-blue-200 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Trading Posts */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Trading Posts
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={customTradingPost}
                onChange={(e) => setCustomTradingPost(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add trading post"
                onKeyPress={(e) => e.key === "Enter" && addTradingPost()}
              />
              <button
                type="button"
                onClick={addTradingPost}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add
              </button>
            </div>
            {systemData.tradingPosts.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {systemData.tradingPosts.map((post) => (
                  <span
                    key={post}
                    className="inline-flex items-center px-2 py-1 bg-green-600 text-white text-sm rounded-md"
                  >
                    {post}
                    <button
                      type="button"
                      onClick={() => removeTradingPost(post)}
                      className="ml-2 text-green-200 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Jump Gates */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Jump Gates
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={customJumpGate}
                onChange={(e) => setCustomJumpGate(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add jump gate destination"
                onKeyPress={(e) => e.key === "Enter" && addJumpGate()}
              />
              <button
                type="button"
                onClick={addJumpGate}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add
              </button>
            </div>
            {systemData.jumpGates.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {systemData.jumpGates.map((gate) => (
                  <span
                    key={gate}
                    className="inline-flex items-center px-2 py-1 bg-purple-600 text-white text-sm rounded-md"
                  >
                    {gate}
                    <button
                      type="button"
                      onClick={() => removeJumpGate(gate)}
                      className="ml-2 text-purple-200 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Points of Interest */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-300">
                Points of Interest
              </label>
              <button
                type="button"
                onClick={addPointOfInterest}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Add POI
              </button>
            </div>
            {systemData.pointsOfInterest.length > 0 && (
              <div className="space-y-4">
                {systemData.pointsOfInterest.map((poi, index) => (
                  <div
                    key={poi.id}
                    className="bg-gray-700 p-4 rounded-md border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-300">
                        Point of Interest #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removePointOfInterest(index)}
                        className="text-red-400 hover:text-red-300 text-lg"
                      >
                        ×
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={poi.name}
                          onChange={(e) =>
                            updatePointOfInterest(index, "name", e.target.value)
                          }
                          className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="POI name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                          Type
                        </label>
                        <select
                          value={poi.type}
                          onChange={(e) =>
                            updatePointOfInterest(index, "type", e.target.value)
                          }
                          className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {POI_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                          Description
                        </label>
                        <textarea
                          value={poi.description}
                          onChange={(e) =>
                            updatePointOfInterest(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={2}
                          className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Describe this point of interest"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                          Coordinates
                        </label>
                        <input
                          type="text"
                          value={poi.coordinates || ""}
                          onChange={(e) =>
                            updatePointOfInterest(
                              index,
                              "coordinates",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Optional coordinates"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                          Threat
                        </label>
                        <input
                          type="text"
                          value={poi.threat || ""}
                          onChange={(e) =>
                            updatePointOfInterest(
                              index,
                              "threat",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Threat description"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="flex items-center space-x-2 text-gray-300">
                          <input
                            type="checkbox"
                            checked={poi.discovered !== false}
                            onChange={(e) =>
                              updatePointOfInterest(
                                index,
                                "discovered",
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-500 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-700"
                          />
                          <span className="text-xs">Discovered</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Defenses */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Defenses
            </label>
            <textarea
              value={systemData.defenses}
              onChange={(e) =>
                setSystemData((prev) => ({ ...prev, defenses: e.target.value }))
              }
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe system defenses..."
            />
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              value={systemData.notes}
              onChange={(e) =>
                setSystemData((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Additional notes..."
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {selectedCoords && (
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {previewMode ? "Hide Preview" : "Show Preview"}
          </button>

          <button
            onClick={downloadJSON}
            disabled={!isFormValid}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download JSON
          </button>

          <button
            onClick={clearForm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Clear Form
          </button>

          {uploadedFileName && (
            <div className="text-sm text-gray-400 flex items-center">
              💾 Will save as:{" "}
              <span className="ml-1 font-mono">{uploadedFileName}</span>
            </div>
          )}
        </div>
      )}

      {/* Preview Section */}
      {previewMode && selectedCoords && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Preview</h2>
          <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-gray-300 whitespace-pre-wrap">
            {generateJSON()}
          </pre>
        </div>
      )}
    </div>
  );
}
