import { getAllLoreEntries, LoreEntry } from "../../../../lib/lore/ftl-lore";
import CodexClientPage from "./CodexClient";

// Define categories here as they are static data and can be defined on the server
const categories = [
  { id: "all", name: "All Categories", icon: "Book" }, // Using string names for icons as they are not React components here
  { id: "locations", name: "Locations", icon: "MapPin" },
  { id: "technology", name: "Technology", icon: "Zap" },
  { id: "history", name: "History", icon: "Clock" },
  { id: "species", name: "Species", icon: "Users" },
  { id: "culture", name: "Culture", icon: "Users" },
  { id: "phenomena", name: "Phenomena", icon: "AlertTriangle" },
  { id: "organizations", name: "Organizations", icon: "Shield" },
  { id: "other", name: "Other", icon: "Book" },
];

export default async function CodexPage() {
  // Fetch all entries on the server
  const allEntries: LoreEntry[] = await getAllLoreEntries();

  return (
    <div className="text-green-400 font-mono">
      {/* Header */}
      <div className="mb-8">
        <div className="border-b border-blue-400 border-opacity-30 pb-4">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">LORE CODEX</h1>
          <p className="text-gray-400 text-sm">
            GALACTIC KNOWLEDGE DATABASE | CLASSIFICATION LEVELS: PUBLIC →
            TOP_SECRET
          </p>
          <div className="mt-2 h-px bg-gradient-to-r from-blue-400 to-transparent" />
        </div>
      </div>

      {/* Pass initial data and categories to the client component */}
      <CodexClientPage initialEntries={allEntries} categories={categories} />
    </div>
  );
}
