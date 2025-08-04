import { getAllCrewMembers } from "@/lib/ftl-crew";
import LogCreatorClient from "./LogCreatorClient";

export default async function LogCreatorPage() {
  const allCrew = await getAllCrewMembers();
  const activeCrew = allCrew.filter((member) => member.status === "active");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Log Creator</h1>
        <p className="text-gray-400">
          Create and download mission log markdown files with proper frontmatter
          formatting.
        </p>
      </div>
      <LogCreatorClient activeCrew={activeCrew} />
    </div>
  );
}
