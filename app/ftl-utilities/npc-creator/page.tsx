import { getAllNPCs } from "@/lib/ftl-npc";
import NPCCreatorClient from "./NPCCreatorClient";

export default async function NPCCreatorPage() {
  const allNPCs = await getAllNPCs();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">NPC Creator</h1>
        <p className="text-gray-400">
          Create and download NPC markdown files with proper frontmatter
          formatting.
        </p>
      </div>
      <NPCCreatorClient existingNPCs={allNPCs} />
    </div>
  );
}
