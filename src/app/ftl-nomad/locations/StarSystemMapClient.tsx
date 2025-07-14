"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GridSystem, PointOfInterest } from "@/lib/ftl-systems";

interface Props {
  initialSystems: GridSystem[];
}

const hexToPixel = (q: number, r: number, size: number) => {
  const x = size * ((3 / 2) * q);
  const y = size * ((Math.sqrt(3) / 2) * q + Math.sqrt(3) * r);
  return { x, y };
};

const pixelToHex = (x: number, y: number, size: number) => {
  const q = ((2 / 3) * x) / size;
  const r = ((-1 / 3) * x + (Math.sqrt(3) / 3) * y) / size;
  return { q: Math.round(q), r: Math.round(r) };
};

const SearchComponent = ({
  onSystemSelect,
  isMobile,
}: {
  onSystemSelect: (system: GridSystem) => void;
  isMobile: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<GridSystem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchSystems = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch("/api/systems/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const results = await response.json();
        setSuggestions(results.slice(0, 8)); // Limit to 8 results
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchSystems(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, searchSystems]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSystemSelect = (system: GridSystem) => {
    setSearchTerm(system.name);
    setShowSuggestions(false);
    onSystemSelect(system);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const getSystemTypeColor = (type: string) => {
    const colors = {
      core: "text-blue-400",
      colony: "text-green-400",
      frontier: "text-yellow-400",
      military: "text-red-400",
      research: "text-purple-400",
      derelict: "text-gray-400",
    };
    return colors[type as keyof typeof colors] || "text-gray-400";
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search systems..."
          className="w-full px-3 py-2 bg-black bg-opacity-40 border border-blue-400 border-opacity-50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-opacity-60 text-sm"
        />
        {isSearching && (
          <div className="absolute right-3 top-2.5">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            className="absolute z-50 w-full mt-1 bg-black bg-opacity-95 border border-blue-400 border-opacity-50 rounded max-h-64 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {suggestions.map((system) => (
              <div
                key={system.id}
                className="px-3 py-2 cursor-pointer hover:bg-blue-400 hover:bg-opacity-20 border-b border-gray-700 last:border-b-0"
                onClick={() => handleSystemSelect(system)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        system.type === "core"
                          ? "bg-blue-500"
                          : system.type === "colony"
                          ? "bg-green-500"
                          : system.type === "frontier"
                          ? "bg-yellow-500"
                          : system.type === "military"
                          ? "bg-red-500"
                          : system.type === "research"
                          ? "bg-purple-500"
                          : "bg-gray-500"
                      }`}
                    />
                    <span className="text-white text-sm">{system.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs ${getSystemTypeColor(system.type)}`}
                    >
                      {system.type.toUpperCase()}
                    </span>
                    {system.visited && (
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {system.faction} • {system.coordinates.q},{" "}
                  {system.coordinates.r}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SystemInfoPanel = ({
  system,
  onClose,
}: {
  system: GridSystem;
  onClose: () => void;
}) => {
  const getTypeLabel = (type: string) => {
    const labels = {
      core: "CORE_WORLD",
      colony: "COLONY",
      frontier: "FRONTIER",
      military: "MILITARY_ZONE",
      research: "RESEARCH_STATION",
      derelict: "DERELICT",
    };
    return labels[type as keyof typeof labels] || type.toUpperCase();
  };

  const getPOIIcon = (type: string) => {
    const icons = {
      station: "🛰️",
      anomaly: "🌀",
      wreckage: "💥",
      outpost: "🏭",
      beacon: "📡",
      other: "❓",
    };
    return icons[type as keyof typeof icons] || "❓";
  };

  return (
    <motion.div
      className="absolute inset-0 md:inset-auto md:top-4 md:right-4 md:w-96 md:max-h-[calc(100%-2rem)] w-full h-full bg-black bg-opacity-95 md:bg-opacity-90 border-0 md:border md:border-blue-400 md:border-opacity-50 md:rounded p-4 text-sm z-50 overflow-y-auto"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-blue-400 font-bold text-xl md:text-lg">
            {system.name}
          </h3>
          <div className="text-yellow-400 text-sm md:text-xs">
            {getTypeLabel(system.type)}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-3xl md:text-xl p-2 md:p-0"
        >
          ×
        </button>
      </div>

      <div className="space-y-3 md:space-y-2 text-sm md:text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">COORDINATES:</span>
          <span className="text-green-400">
            {system.coordinates.q}, {system.coordinates.r},{" "}
            {system.coordinates.s}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">PLANETS:</span>
          <span className="text-blue-400">{system.planets}</span>
        </div>

        {system.starType && (
          <div className="flex justify-between">
            <span className="text-gray-400">STAR_TYPE:</span>
            <span className="text-yellow-400">{system.starType}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-400">FACTION:</span>
          <span className="text-yellow-400">{system.faction}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">THREAT_LEVEL:</span>
          <span
            className={`${
              system.threats === "Low"
                ? "text-green-400"
                : system.threats === "Medium"
                ? "text-yellow-400"
                : system.threats === "High"
                ? "text-red-400"
                : "text-gray-400"
            }`}
          >
            {system.threats}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-600">
          <div className="text-gray-400 mb-1">DESCRIPTION:</div>
          <div className="text-gray-300 text-sm md:text-xs leading-relaxed">
            {system.description}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-600">
          <div className="text-gray-400 mb-1">RESOURCES:</div>
          <div className="flex flex-wrap gap-1">
            {system.resources.map((resource, index) => (
              <span
                key={index}
                className="bg-blue-400 bg-opacity-20 px-2 py-1 rounded text-blue-300 text-sm md:text-xs"
              >
                {resource}
              </span>
            ))}
          </div>
        </div>

        {system.pointsOfInterest && system.pointsOfInterest.length > 0 && (
          <div className="pt-2 border-t border-gray-600">
            <div className="text-gray-400 mb-1">POINTS_OF_INTEREST:</div>
            <div className="space-y-2 md:space-y-1">
              {system.pointsOfInterest.map((poi, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-lg md:text-sm">
                    {getPOIIcon(poi.type)}
                  </span>
                  <div className="flex-1">
                    <div className="text-cyan-400 text-sm md:text-xs">
                      {poi.name}
                    </div>
                    <div className="text-gray-300 text-sm md:text-xs leading-relaxed">
                      {poi.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {system.tradingPosts && system.tradingPosts.length > 0 && (
          <div className="pt-2 border-t border-gray-600">
            <div className="text-gray-400 mb-1">TRADING_POSTS:</div>
            <div className="text-green-400 text-sm md:text-xs">
              {system.tradingPosts.join(", ")}
            </div>
          </div>
        )}

        {system.jumpGates && system.jumpGates.length > 0 && (
          <div className="pt-2 border-t border-gray-600">
            <div className="text-gray-400 mb-1">JUMP_GATES:</div>
            <div className="text-purple-400 text-sm md:text-xs">
              {system.jumpGates.join(", ")}
            </div>
          </div>
        )}

        {system.population && (
          <div className="flex justify-between">
            <span className="text-gray-400">POPULATION:</span>
            <span className="text-blue-400">
              {system.population.toLocaleString()}
            </span>
          </div>
        )}

        {system.government && (
          <div className="flex justify-between">
            <span className="text-gray-400">GOVERNMENT:</span>
            <span className="text-yellow-400">{system.government}</span>
          </div>
        )}

        {system.economy && (
          <div className="flex justify-between">
            <span className="text-gray-400">ECONOMY:</span>
            <span className="text-green-400">{system.economy}</span>
          </div>
        )}

        {system.visited && (
          <div className="pt-2 border-t border-gray-600">
            <div className="flex justify-between">
              <span className="text-gray-400">LAST_VISIT:</span>
              <span className="text-green-400">{system.lastVisit}</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Hexagon = ({
  system,
  size,
  onClick,
  isSelected,
  isMobile,
}: {
  system: GridSystem;
  size: number;
  onClick: (system: GridSystem) => void;
  isSelected: boolean;
  isMobile: boolean;
}) => {
  const { x, y } = hexToPixel(system.coordinates.q, system.coordinates.r, size);

  const getSystemColor = (
    type: string,
    visited: boolean,
    isEmpty?: boolean
  ) => {
    if (isEmpty) return "transparent";

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

  const getThreatColor = (threat: string) => {
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

  const circleRadius = isMobile ? size * 0.4 : size * 0.3;
  const touchTarget = isMobile ? size * 0.8 : size * 0.6;

  return (
    <g>
      <polygon
        points={points.join(" ")}
        fill="rgba(30, 58, 138, 0.1)"
        stroke="rgba(59, 130, 246, 0.3)"
        strokeWidth="1"
      />

      {!system.isEmpty && (
        <>
          <circle
            cx={x}
            cy={y}
            r={touchTarget}
            fill="transparent"
            className="cursor-pointer"
            onClick={() => onClick(system)}
          />

          <circle
            cx={x}
            cy={y}
            r={circleRadius}
            fill={getSystemColor(system.type, system.visited)}
            stroke={isSelected ? "#fbbf24" : getThreatColor(system.threats)}
            strokeWidth={isSelected ? 3 : 2}
            className="pointer-events-none transition-all"
          />

          <text
            x={x}
            y={y + size * 0.7}
            textAnchor="middle"
            fontSize={isMobile ? "12" : "10"}
            fill="#e5e7eb"
            className="font-mono pointer-events-none"
          >
            {system.name}
          </text>

          {system.visited && (
            <circle
              cx={x + size * 0.25}
              cy={y - size * 0.25}
              r={isMobile ? 4 : 3}
              fill="#10b981"
              className="pointer-events-none"
            />
          )}

          {system.pointsOfInterest && system.pointsOfInterest.length > 0 && (
            <circle
              cx={x - size * 0.25}
              cy={y - size * 0.25}
              r={isMobile ? 3 : 2}
              fill="#fbbf24"
              className="pointer-events-none"
            />
          )}
        </>
      )}
    </g>
  );
};

export default function StarSystemMapClient({ initialSystems }: Props) {
  const [selectedSystem, setSelectedSystem] = useState<GridSystem | null>(null);
  const [systems, setSystems] = useState<GridSystem[]>(initialSystems);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 600,
  });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile device and container size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    checkMobile();
    updateSize();

    window.addEventListener("resize", () => {
      checkMobile();
      updateSize();
    });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const hexSize = isMobile ? 40 : 60;
  const mapWidth = containerSize.width;
  const mapHeight = containerSize.height;

  // Update grid based on current view
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
          mapWidth,
          mapHeight,
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
  }, [pan.x, pan.y, zoom, hexSize, mapWidth, mapHeight]);

  // Debounced grid update
  useEffect(() => {
    const timer = setTimeout(updateGrid, 300);
    return () => clearTimeout(timer);
  }, [updateGrid]);

  const handleSystemClick = (system: GridSystem) => {
    if (!system.isEmpty) {
      setSelectedSystem(system);
    }
  };

  // Center viewport on a system
  const centerOnSystem = (system: GridSystem) => {
    const { x, y } = hexToPixel(
      system.coordinates.q,
      system.coordinates.r,
      hexSize
    );
    setPan({ x: -x, y: -y });
  };

  // Handle search system selection
  const handleSearchSystemSelect = (system: GridSystem) => {
    centerOnSystem(system);
    setZoom(3);
    setSelectedSystem(system);
  };

  // Touch distance calculation for pinch
  const getTouchDistance = (touches: React.TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      setLastTouchDistance(getTouchDistance(e.touches));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2) {
      const currentDistance = getTouchDistance(e.touches);
      const delta = currentDistance / lastTouchDistance;
      setZoom((prev) => Math.min(Math.max(prev * delta, 0.5), 3));
      setLastTouchDistance(currentDistance);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchDistance(0);
  };

  // Mouse handlers (for desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isMobile) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isMobile) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const nonEmptySystems = systems.filter((s) => !s.isEmpty);

  return (
    <div
      className={`h-full flex flex-col min-h-0 ${isMobile ? "touch-none" : ""}`}
    >
      <motion.div
        className="mb-4 flex-shrink-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400">
            STAR CHARTS
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={resetView}
              className="px-2 py-1 md:px-3 md:py-1 bg-blue-400 bg-opacity-20 hover:bg-opacity-30 border border-blue-400 border-opacity-50 rounded text-blue-300 text-xs md:text-sm transition-all"
            >
              RESET
            </button>
            <div className="text-xs text-gray-400">
              {Math.round(zoom * 100)}%
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-blue-400 to-transparent mb-4" />

        {/* Search Component */}
        <div className="mb-4 max-w-md">
          <SearchComponent
            onSystemSelect={handleSearchSystemSelect}
            isMobile={isMobile}
          />
        </div>

        <div className="text-xs md:text-sm text-gray-400 mb-4">
          {isMobile
            ? "Search or tap systems for info. Pinch to zoom, drag to pan."
            : "Search systems or click on them for detailed information. Yellow dots indicate points of interest. Use mouse wheel to zoom, drag to pan."}
        </div>

        <div className="grid grid-cols-2 md:flex gap-2 md:gap-4 text-xs mb-4">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full"></div>
            <span>Core</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
            <span>Colony</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
            <span>Frontier</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
            <span>Military</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full"></div>
            <span>Research</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-gray-500 rounded-full"></div>
            <span>Derelict</span>
          </div>
        </div>
      </motion.div>

      {/* Full-size map container - key changes here */}
      <div className="flex-1 relative w-full min-h-[400px]" ref={containerRef}>
        <motion.div
          className="absolute inset-0 border border-blue-400 border-opacity-30 rounded bg-black bg-opacity-20 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg
            ref={svgRef}
            width={mapWidth}
            height={mapHeight}
            className="select-none"
            style={{
              touchAction: "none",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <g
              transform={`translate(${mapWidth / 2 + pan.x}, ${
                mapHeight / 2 + pan.y
              }) scale(${zoom})`}
            >
              <defs>
                <pattern
                  id="hexGrid"
                  x="0"
                  y="0"
                  width={hexSize * 1.5}
                  height={hexSize * Math.sqrt(3)}
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d={`M 0,0 L ${hexSize * 1.5},0`}
                    stroke="rgba(59, 130, 246, 0.1)"
                    strokeWidth="0.5"
                  />
                  <path
                    d={`M 0,0 L ${hexSize * 0.75},${
                      (hexSize * Math.sqrt(3)) / 2
                    }`}
                    stroke="rgba(59, 130, 246, 0.1"
                    strokeWidth="0.5"
                  />
                  <path
                    d={`M 0,0 L ${hexSize * 0.75},${
                      (-hexSize * Math.sqrt(3)) / 2
                    }`}
                    stroke="rgba(59, 130, 246, 0.1)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>

              {systems.map((system) => (
                <Hexagon
                  key={system.id}
                  system={system}
                  size={hexSize}
                  onClick={handleSystemClick}
                  isSelected={selectedSystem?.id === system.id}
                  isMobile={isMobile}
                />
              ))}
            </g>
          </svg>
        </motion.div>

        {/* Overlay info panel */}
        <AnimatePresence>
          {selectedSystem && !selectedSystem.isEmpty && (
            <SystemInfoPanel
              system={selectedSystem}
              onClose={() => setSelectedSystem(null)}
            />
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-4 text-xs text-gray-400 flex-shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-between">
          <span>SYSTEMS: {nonEmptySystems.length}/∞</span>
          <span className="hidden md:inline">
            LAST_SCAN: {new Date().toLocaleString()}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
