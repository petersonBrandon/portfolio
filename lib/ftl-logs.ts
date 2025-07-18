// lib/ftl-logs.ts
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface MissionLog {
  slug: string;
  title: string;
  stardate: string;
  earthDate: string;
  crew: string;
  content: string;
  excerpt: string;
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

export async function getAllMissionLogs(): Promise<MissionLog[]> {
  const logsDirectory = path.join(process.cwd(), "ftl/logs");

  try {
    // Check if directory exists
    await fs.access(logsDirectory);

    const filePaths = await getMarkdownFiles(logsDirectory);
    const logs = await Promise.all(
      filePaths.map(async (filePath) => {
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContents);

        // Create excerpt from first paragraph
        const excerpt =
          content
            .split("\n")
            .find((line) => line.trim() && !line.startsWith("#"))
            ?.substring(0, 120) + "..." || "";

        // Create slug from relative path (remove base directory and .md extension)
        const relativePath = path.relative(logsDirectory, filePath);
        const slug = relativePath.replace(/\.md$/, "").replace(/\\/g, "/");

        return {
          slug,
          title: data.title || "Untitled Mission",
          stardate: data.stardate || data.date || "Unknown Stardate",
          earthDate: data.earthDate || "Unknown Date",
          crew: data.crew || "Unknown",
          content,
          excerpt,
        };
      })
    );

    // Sort by earth date descending (most recent sessions first)
    return logs.sort(
      (a, b) =>
        new Date(b.earthDate).getTime() - new Date(a.earthDate).getTime()
    );
  } catch (error) {
    // Directory doesn't exist or other error
    return [];
  }
}

export async function getMissionLogBySlug(
  slug: string
): Promise<MissionLog | null> {
  const logsDirectory = path.join(process.cwd(), "ftl/logs");

  try {
    // Handle both flat slugs and nested slugs (e.g., "subfolder/filename")
    const filePath = path.join(logsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const excerpt =
      content
        .split("\n")
        .find((line) => line.trim() && !line.startsWith("#"))
        ?.substring(0, 120) + "..." || "";

    return {
      slug,
      title: data.title || "Untitled Mission",
      stardate: data.stardate || data.date || "Unknown Stardate",
      earthDate: data.earthDate || "Unknown Date",
      crew: data.crew || "Unknown",
      content,
      excerpt,
    };
  } catch (error) {
    return null;
  }
}
