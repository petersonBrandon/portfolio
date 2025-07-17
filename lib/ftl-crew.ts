// lib/ftl-crew.ts
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface CrewMember {
  slug: string;
  name: string;
  concept: string;
  species: string;
  archetype: string;
  player: string;
  status: "active" | "inactive" | "deceased" | "missing";
  backstory: string;
  notes: string;
  joinDate?: string;
  lastSeen?: string;
  imageUrl?: string;
}

// Helper function to get image URL for a crew member
function getCrewImageUrl(name: string): string {
  const imageName = name.replace(/\s+/g, "_").toLowerCase();
  return `/ftl/crew/images/${imageName}.png`;
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
    return [];
  }

  return files;
}

export async function getAllCrewMembers(): Promise<CrewMember[]> {
  const crewDirectory = path.join(process.cwd(), "src/ftl/crew");

  try {
    // Check if directory exists
    await fs.access(crewDirectory);

    const filePaths = await getMarkdownFiles(crewDirectory);
    const crew = await Promise.all(
      filePaths.map(async (filePath) => {
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContents);

        // Create backstory excerpt from content
        const backstory =
          content
            .split("\n")
            .find((line) => line.trim() && !line.startsWith("#"))
            ?.substring(0, 200) + "..." || "";

        const name = data.name || "Unknown Crew Member";
        const imageUrl = getCrewImageUrl(name);
        const hasImage = await imageExists(imageUrl);

        // Create slug from just the filename (ignore subdirectory structure)
        const fileName = path.basename(filePath, ".md");
        const slug = fileName;

        return {
          slug,
          name,
          concept: data.concept || "Unknown",
          species: data.species || "Unknown",
          archetype: data.archetype || "Unknown",
          player: data.player || "NPC",
          status: data.status || "active",
          backstory,
          notes: content,
          joinDate: data.joinDate || data.date || "",
          lastSeen: data.lastSeen || "",
          imageUrl: hasImage ? imageUrl : "/ftl/crew/images/anon.svg",
        };
      })
    );

    // Sort by status (active first), then by name
    return crew.sort((a, b) => {
      if (a.status === "active" && b.status !== "active") return -1;
      if (a.status !== "active" && b.status === "active") return 1;
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    // Directory doesn't exist or other error
    return [];
  }
}

export async function getCrewMemberBySlug(
  slug: string
): Promise<CrewMember | null> {
  const crewDirectory = path.join(process.cwd(), "src/ftl/crew");

  try {
    // FIXED: Search for the file across all subdirectories
    console.log(`getCrewMemberBySlug - Looking for slug: ${slug}`);

    // Get all markdown files and find the one with matching filename
    const allFiles = await getMarkdownFiles(crewDirectory);
    const targetFile = allFiles.find((filePath) => {
      const fileName = path.basename(filePath, ".md");
      return fileName === slug;
    });

    if (!targetFile) {
      console.log(`getCrewMemberBySlug - No file found for slug: ${slug}`);
      return null;
    }

    console.log(`getCrewMemberBySlug - Found file: ${targetFile}`);

    const fileContents = await fs.readFile(targetFile, "utf8");
    const { data, content } = matter(fileContents);

    const backstory =
      content
        .split("\n")
        .find((line) => line.trim() && !line.startsWith("#"))
        ?.substring(0, 200) + "..." || "";

    const name = data.name || "Unknown Crew Member";
    const imageUrl = getCrewImageUrl(name);
    const hasImage = await imageExists(imageUrl);

    return {
      slug,
      name,
      concept: data.concept || "Unknown",
      species: data.species || "Unknown",
      archetype: data.archetype || "Unknown",
      player: data.player || "NPC",
      status: data.status || "active",
      backstory,
      notes: content,
      joinDate: data.joinDate || data.date || "",
      lastSeen: data.lastSeen || "",
      imageUrl: hasImage ? imageUrl : "/ftl/crew/images/anon.svg",
    };
  } catch (error) {
    console.log(`getCrewMemberBySlug - Error loading ${slug}:`, error);
    return null;
  }
}
