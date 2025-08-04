import SystemCreatorClient from "./SystemCreatorClient";
import { getAllSystems } from "@/lib/ftl-systems";

export default async function NPCCreatorPage() {
  const systems = await getAllSystems();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">NPC Creator</h1>
        <p className="text-gray-400">
          Create and edit star systems for our FTL Nomad database. Select
          coordinates on the map to begin.
        </p>
      </div>
      <SystemCreatorClient initialSystems={systems} />
    </div>
  );
}
