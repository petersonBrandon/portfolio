import { getAllLoreEntries } from "@/lib/lore/ftl-lore";
import LoreCreatorClient from "./LoreCreatorClient";

export default async function LoreCreatorPage() {
  const allLoreEntries = await getAllLoreEntries();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Lore Creator</h1>
        <p className="text-gray-400">
          Create and download lore entry markdown files with proper frontmatter
          formatting.
        </p>
      </div>
      <LoreCreatorClient allLoreEntries={allLoreEntries} />
    </div>
  );
}
