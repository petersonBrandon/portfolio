// lib/ftl-lore.ts
import fs from "fs/promises";
import path from "path"; // Ensure path is imported
import matter from "gray-matter";

export interface LoreEntry {
  id: string;
  title: string;
  category:
    | "technology"
    | "history"
    | "species"
    | "culture"
    | "phenomena"
    | "organizations"
    | "other";
  tags: string[];
  classification: "PUBLIC" | "RESTRICTED" | "CLASSIFIED" | "TOP_SECRET";
  author?: string;
  dateAdded: string;
  lastModified?: string;
  content: string;
  summary?: string;
  relatedEntries?: string[];
  location?: string;
  era?: string;
  threat?: "Low" | "Medium" | "High" | "Unknown";
  verified?: boolean;
  sourceReliability?: "Confirmed" | "Likely" | "Unverified" | "Disputed";
}

export interface LoreSearchResult extends LoreEntry {
  excerpt?: string;
  relevanceScore?: number;
}

async function getLoreFiles(directory: string): Promise<string[]> {
  const files: string[] = [];

  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      // Exclude "hidden" directory
      if (entry.isDirectory() && entry.name === "hidden") {
        continue; // Skip this directory
      }

      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await getLoreFiles(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`Could not read directory ${directory}:`, error);
    return [];
  }

  return files;
}

export async function getAllLoreEntries(): Promise<LoreEntry[]> {
  const loreDirectory = path.join(process.cwd(), "src/ftl/lore/lore");

  try {
    await fs.access(loreDirectory);
    const filePaths = await getLoreFiles(loreDirectory);

    const entries = await Promise.all(
      filePaths.map(async (filePath) => {
        try {
          const fileContents = await fs.readFile(filePath, "utf8");
          const { data: frontmatter, content } = matter(fileContents);

          // Generate ID from filename
          const relativePath = path.relative(loreDirectory, filePath);
          const id = relativePath.replace(/\.md$/, "").replace(/\\/g, "/");

          return {
            id,
            title: frontmatter.title || path.basename(filePath, ".md"),
            category: frontmatter.category || "other",
            tags: frontmatter.tags || [],
            classification: frontmatter.classification || "PUBLIC",
            author: frontmatter.author,
            dateAdded: frontmatter.dateAdded || new Date().toISOString(),
            lastModified: frontmatter.lastModified,
            content,
            summary: frontmatter.summary,
            relatedEntries: frontmatter.relatedEntries || [],
            location: frontmatter.location,
            era: frontmatter.era,
            threat: frontmatter.threat,
            verified: frontmatter.verified ?? true,
            sourceReliability: frontmatter.sourceReliability || "Confirmed",
          } as LoreEntry;
        } catch (error) {
          console.error(`Error processing lore file ${filePath}:`, error);
          return null;
        }
      })
    );

    return entries.filter((entry): entry is LoreEntry => entry !== null);
  } catch (error) {
    console.error("Error loading lore entries:", error);
    return [];
  }
}

export async function getLoreEntry(id: string): Promise<LoreEntry | null> {
  const loreDirectory = path.join(process.cwd(), "src/ftl/lore/lore");
  const filePath = path.join(loreDirectory, `${id}.md`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);

    return {
      id,
      title: frontmatter.title || id,
      category: frontmatter.category || "other",
      tags: frontmatter.tags || [],
      classification: frontmatter.classification || "PUBLIC",
      author: frontmatter.author,
      dateAdded: frontmatter.dateAdded || new Date().toISOString(),
      lastModified: frontmatter.lastModified,
      content,
      summary: frontmatter.summary,
      relatedEntries: frontmatter.relatedEntries || [],
      location: frontmatter.location,
      era: frontmatter.era,
      threat: frontmatter.threat,
      verified: frontmatter.verified ?? true,
      sourceReliability: frontmatter.sourceReliability || "Confirmed",
    } as LoreEntry;
  } catch (error) {
    console.error(`Error loading lore entry ${id}:`, error);
    return null;
  }
}

export async function searchLoreEntries(
  query: string
): Promise<LoreSearchResult[]> {
  try {
    const allEntries = await getAllLoreEntries();
    const searchTerm = query.toLowerCase();

    if (!searchTerm.trim()) {
      return allEntries.slice(0, 20);
    }

    const results = allEntries
      .map((entry) => {
        let relevanceScore = 0;
        let excerpt = "";

        // Title match (highest priority)
        if (entry.title.toLowerCase().includes(searchTerm)) {
          relevanceScore += 10;
        }

        // Category match
        if (entry.category.toLowerCase().includes(searchTerm)) {
          relevanceScore += 5;
        }

        // Tags match
        entry.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(searchTerm)) {
            relevanceScore += 3;
          }
        });

        // Content match
        const contentMatch = entry.content.toLowerCase().includes(searchTerm);
        if (contentMatch) {
          relevanceScore += 2;

          // Generate excerpt
          const sentences = entry.content.split(/[.!?]+/);
          const matchingSentence = sentences.find((sentence) =>
            sentence.toLowerCase().includes(searchTerm)
          );
          if (matchingSentence) {
            excerpt = matchingSentence.trim().substring(0, 200) + "...";
          }
        }

        // Summary match
        if (entry.summary?.toLowerCase().includes(searchTerm)) {
          relevanceScore += 4;
          if (!excerpt) {
            excerpt = entry.summary.substring(0, 200) + "...";
          }
        }

        // Location match
        if (entry.location?.toLowerCase().includes(searchTerm)) {
          relevanceScore += 3;
        }

        // Era match
        if (entry.era?.toLowerCase().includes(searchTerm)) {
          relevanceScore += 2;
        }

        return {
          ...entry,
          excerpt: excerpt || entry.summary?.substring(0, 200) + "..." || "",
          relevanceScore,
        };
      })
      .filter((entry) => entry.relevanceScore > 0)
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .slice(0, 20);

    return results;
  } catch (error) {
    console.error("Lore search error:", error);
    return [];
  }
}

export async function getLoreEntriesByCategory(
  category: string
): Promise<LoreEntry[]> {
  const allEntries = await getAllLoreEntries();
  return allEntries
    .filter((entry) => entry.category === category)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getLoreEntriesByTag(tag: string): Promise<LoreEntry[]> {
  const allEntries = await getAllLoreEntries();
  return allEntries
    .filter((entry) =>
      entry.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    )
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getRelatedLoreEntries(
  entryId: string
): Promise<LoreEntry[]> {
  const entry = await getLoreEntry(entryId);
  if (!entry || !entry.relatedEntries?.length) {
    return [];
  }

  const relatedEntries = await Promise.all(
    entry.relatedEntries.map((id) => getLoreEntry(id))
  );

  return relatedEntries.filter((entry): entry is LoreEntry => entry !== null);
}
