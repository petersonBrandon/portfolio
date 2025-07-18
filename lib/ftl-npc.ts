// lib/ftl-npc.ts
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface NPC {
  slug: string;
  name: string;
  species: string;
  faction: string;
  location: string;
  disposition: "friendly" | "neutral" | "hostile" | "unknown";
  status: "alive" | "deceased" | "missing" | "unknown";
  description: string;
  notes: string;
  firstMet?: string;
  lastSeen?: string;
  relationships: string[];
  tags: string[];
  imageUrl?: string;
}

// Helper function to get image URL for an NPC
function getNPCImageUrl(name: string): string {
  const imageName = name.replace(/\s+/g, "_").toLowerCase();
  return `/ftl/npcs/images/${imageName}.png`;
}

// Helper function to check if image exists
async function imageExists(imagePath: string): Promise<boolean> {
  try {
    const fullPath = path.join(process.cwd(), "public", imagePath);
    await fs.access(fullPath);
    return true;
  } catch {
    return false;
  }
}

// Recursive function to get all MD files from directory and subdirectories
async function getMarkdownFiles(directory: string): Promise<string[]> {
  const files: string[] = [];

  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory() && entry.name !== "hidden") {
        // Recursively search subdirectories (excluding "hidden")
        const subFiles = await getMarkdownFiles(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        // Add markdown files
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
    console.warn(`Could not read directory ${directory}:`, error);
    return [];
  }

  return files;
}

export async function getAllNPCs(): Promise<NPC[]> {
  const npcDirectory = path.join(process.cwd(), "ftl/npcs");

  try {
    // Check if directory exists
    await fs.access(npcDirectory);

    const filePaths = await getMarkdownFiles(npcDirectory);
    const npcs = await Promise.all(
      filePaths.map(async (filePath) => {
        try {
          const fileContents = await fs.readFile(filePath, "utf8");
          const { data, content } = matter(fileContents);

          // Create description excerpt from content
          const contentLines = content
            .split("\n")
            .filter((line) => line.trim() && !line.startsWith("#"));
          const description =
            contentLines.length > 0
              ? contentLines[0].length > 200
                ? contentLines[0].substring(0, 200) + "..."
                : contentLines[0]
              : "No description available.";

          const name = data.name || "Unknown NPC";
          const imageUrl = getNPCImageUrl(name);
          const hasImage = await imageExists(imageUrl);

          // Create slug from just the filename (ignore subdirectory structure)
          const fileName = path.basename(filePath, ".md");
          const slug = fileName;

          // Parse relationships and tags from comma-separated strings
          const relationships = data.relationships
            ? data.relationships.split(",").map((rel: string) => rel.trim())
            : [];
          const tags = data.tags
            ? data.tags.split(",").map((tag: string) => tag.trim())
            : [];

          return {
            slug,
            name,
            species: data.species || "Unknown",
            faction: data.faction || "Independent",
            location: data.location || "Unknown",
            disposition: data.disposition || "neutral",
            status: data.status || "alive",
            description,
            notes: content,
            firstMet: data.firstMet || data.date || "",
            lastSeen: data.lastSeen || "",
            relationships,
            tags,
            imageUrl: hasImage ? imageUrl : "/ftl/npcs/images/anon.svg",
          } as NPC;
        } catch (error) {
          console.error(`Error processing NPC file ${filePath}:`, error);
          return null;
        }
      })
    );

    // Filter out null values and sort by status (alive first), then by name
    const validNPCs = npcs.filter((npc): npc is NPC => npc !== null);

    return validNPCs.sort((a, b) => {
      if (a.status === "alive" && b.status !== "alive") return -1;
      if (a.status !== "alive" && b.status === "alive") return 1;
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error("Error loading NPCs:", error);
    return [];
  }
}

export async function getNPCBySlug(slug: string): Promise<NPC | null> {
  const npcDirectory = path.join(process.cwd(), "ftl/npcs");

  try {
    console.log(`getNPCBySlug - Looking for slug: ${slug}`);

    // Get all markdown files and find the one with matching filename
    const allFiles = await getMarkdownFiles(npcDirectory);
    const targetFile = allFiles.find((filePath) => {
      const fileName = path.basename(filePath, ".md");
      return fileName === slug;
    });

    if (!targetFile) {
      console.log(`getNPCBySlug - No file found for slug: ${slug}`);
      return null;
    }

    console.log(`getNPCBySlug - Found file: ${targetFile}`);

    const fileContents = await fs.readFile(targetFile, "utf8");
    const { data, content } = matter(fileContents);

    // Create description excerpt from content
    const contentLines = content
      .split("\n")
      .filter((line) => line.trim() && !line.startsWith("#"));
    const description =
      contentLines.length > 0
        ? contentLines[0].length > 200
          ? contentLines[0].substring(0, 200) + "..."
          : contentLines[0]
        : "No description available.";

    const name = data.name || "Unknown NPC";
    const imageUrl = getNPCImageUrl(name);
    const hasImage = await imageExists(imageUrl);

    // Parse relationships and tags from comma-separated strings
    const relationships = data.relationships
      ? data.relationships.split(",").map((rel: string) => rel.trim())
      : [];
    const tags = data.tags
      ? data.tags.split(",").map((tag: string) => tag.trim())
      : [];

    return {
      slug,
      name,
      species: data.species || "Unknown",
      faction: data.faction || "Independent",
      location: data.location || "Unknown",
      disposition: data.disposition || "neutral",
      status: data.status || "alive",
      description,
      notes: content,
      firstMet: data.firstMet || data.date || "",
      lastSeen: data.lastSeen || "",
      relationships,
      tags,
      imageUrl: hasImage ? imageUrl : "/ftl/npcs/images/anon.svg",
    } as NPC;
  } catch (error) {
    console.error(`getNPCBySlug - Error loading ${slug}:`, error);
    return null;
  }
}

// Helper function to get unique values for filtering
export async function getNPCFilterOptions(): Promise<{
  species: string[];
  factions: string[];
  locations: string[];
  dispositions: string[];
  statuses: string[];
  tags: string[];
}> {
  const npcs = await getAllNPCs();

  return {
    species: Array.from(new Set(npcs.map((npc) => npc.species))).sort(),
    factions: Array.from(new Set(npcs.map((npc) => npc.faction))).sort(),
    locations: Array.from(new Set(npcs.map((npc) => npc.location))).sort(),
    dispositions: Array.from(
      new Set(npcs.map((npc) => npc.disposition))
    ).sort(),
    statuses: Array.from(new Set(npcs.map((npc) => npc.status))).sort(),
    tags: Array.from(new Set(npcs.flatMap((npc) => npc.tags))).sort(),
  };
}
