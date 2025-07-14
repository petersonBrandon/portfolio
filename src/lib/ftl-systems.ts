// lib/ftl-systems.ts
import fs from "fs/promises";
import path from "path";

export interface PointOfInterest {
  id: string;
  name: string;
  type: "station" | "anomaly" | "wreckage" | "outpost" | "beacon" | "other";
  description: string;
  coordinates?: string;
  discovered?: boolean;
  threat?: string;
}

export interface StarSystem {
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
  lastVisit?: string;
  population?: number;
  government?: string;
  economy?: string;
  defenses?: string;
  notes?: string;
  pointsOfInterest?: PointOfInterest[];
  tradingPosts?: string[];
  jumpGates?: string[];
  climate?: string;
  gravity?: string;
  atmosphere?: string;
  starType?: string;
  age?: string;
}

export interface GridSystem extends StarSystem {
  isEmpty?: boolean;
}

export interface ViewportBounds {
  minQ: number;
  maxQ: number;
  minR: number;
  maxR: number;
}

async function getSystemFiles(directory: string): Promise<string[]> {
  const files: string[] = [];

  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await getSystemFiles(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`Could not read directory ${directory}:`, error);
    return [];
  }

  return files;
}

export async function getAllSystems(): Promise<StarSystem[]> {
  const systemDirectory = path.join(process.cwd(), "src/ftl/locations");

  try {
    await fs.access(systemDirectory);
    const filePaths = await getSystemFiles(systemDirectory);

    const systems = await Promise.all(
      filePaths.map(async (filePath) => {
        try {
          const fileContents = await fs.readFile(filePath, "utf8");
          const systemData = JSON.parse(fileContents) as StarSystem;

          return {
            ...systemData,
            visited: systemData.visited ?? false,
            threats: systemData.threats ?? "Unknown",
            resources: systemData.resources ?? [],
            pointsOfInterest: systemData.pointsOfInterest ?? [],
            tradingPosts: systemData.tradingPosts ?? [],
            jumpGates: systemData.jumpGates ?? [],
          } as StarSystem;
        } catch (error) {
          console.error(`Error processing system file ${filePath}:`, error);
          return null;
        }
      })
    );

    return systems.filter((system): system is StarSystem => system !== null);
  } catch (error) {
    console.error("Error loading systems:", error);
    return [];
  }
}

// Calculate viewport bounds based on current view state
export function calculateViewportBounds(
  centerQ: number,
  centerR: number,
  zoom: number,
  mapWidth: number,
  mapHeight: number,
  hexSize: number
): ViewportBounds {
  const viewportHexRadius =
    Math.ceil(Math.max(mapWidth, mapHeight) / (2 * hexSize * zoom * 0.8)) + 2; // Extra padding

  return {
    minQ: centerQ - viewportHexRadius,
    maxQ: centerQ + viewportHexRadius,
    minR: centerR - viewportHexRadius,
    maxR: centerR + viewportHexRadius,
  };
}

// Generate grid for viewport
export async function getSystemGridForViewport(
  centerQ: number,
  centerR: number,
  zoom: number,
  mapWidth: number,
  mapHeight: number,
  hexSize: number
): Promise<GridSystem[]> {
  const systems = await getAllSystems();
  const bounds = calculateViewportBounds(
    centerQ,
    centerR,
    zoom,
    mapWidth,
    mapHeight,
    hexSize
  );
  const grid: GridSystem[] = [];

  const systemMap = new Map<string, StarSystem>();
  systems.forEach((system) => {
    const key = `${system.coordinates.q},${system.coordinates.r},${system.coordinates.s}`;
    systemMap.set(key, system);
  });

  for (let q = bounds.minQ; q <= bounds.maxQ; q++) {
    for (
      let r = Math.max(bounds.minR, -q - bounds.maxR);
      r <= Math.min(bounds.maxR, -q + bounds.maxQ);
      r++
    ) {
      const s = -q - r;
      const key = `${q},${r},${s}`;

      const existingSystem = systemMap.get(key);
      if (existingSystem) {
        grid.push(existingSystem);
      } else {
        grid.push({
          id: `empty-${q}-${r}-${s}`,
          name: "",
          coordinates: { q, r, s },
          type: "derelict",
          planets: 0,
          faction: "",
          description: "",
          threats: "Unknown",
          resources: [],
          visited: false,
          isEmpty: true,
        });
      }
    }
  }

  return grid;
}

// Initial grid for SSR
export async function getInitialSystemGrid(): Promise<GridSystem[]> {
  return getSystemGridForViewport(0, 0, 1, 800, 600, 60);
}

export async function searchSystems(query: string): Promise<GridSystem[]> {
  try {
    const locationsDir = path.join(process.cwd(), "src", "ftl", "locations");
    const files = (await fs.readdir(locationsDir)).filter((file) =>
      file.endsWith(".json")
    );

    const allSystems: GridSystem[] = [];

    // Load all JSON files
    for (const file of files) {
      const filePath = path.join(locationsDir, file);
      const fileContent = await fs.readFile(filePath, "utf8");
      const systems = JSON.parse(fileContent);

      // Handle both array and single object formats
      if (Array.isArray(systems)) {
        allSystems.push(...systems);
      } else {
        allSystems.push(systems);
      }
    }

    const searchTerm = query.toLowerCase();

    // Search across multiple fields
    const results = allSystems.filter((system) => {
      if (system.isEmpty) return false;

      const searchableFields = [
        system.name,
        system.faction,
        system.type,
        system.description,
        system.starType,
        system.government,
        system.economy,
        ...(system.resources || []),
        ...(system.tradingPosts || []),
        ...(system.jumpGates || []),
        ...(system.pointsOfInterest?.map((poi) => poi.name) || []),
        ...(system.pointsOfInterest?.map((poi) => poi.description) || []),
      ].filter(Boolean);

      return searchableFields.some((field) =>
        field?.toString().toLowerCase().includes(searchTerm)
      );
    });

    // Sort by relevance (name matches first, then by system type priority)
    const typeOrder = {
      core: 1,
      colony: 2,
      frontier: 3,
      military: 4,
      research: 5,
      derelict: 6,
    };

    return results
      .sort((a, b) => {
        const aNameMatch = a.name.toLowerCase().includes(searchTerm);
        const bNameMatch = b.name.toLowerCase().includes(searchTerm);

        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;

        const aTypeOrder = typeOrder[a.type as keyof typeof typeOrder] || 99;
        const bTypeOrder = typeOrder[b.type as keyof typeof typeOrder] || 99;

        return aTypeOrder - bTypeOrder;
      })
      .slice(0, 10);
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
