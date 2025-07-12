// app/ftl-nomad/adventure-logs/page.tsx
import { getAllMissionLogs } from "@/lib/ftl-logs";
import {
  TerminalTile,
  HologramTile,
  MilitaryTile,
  ModernTile,
  CompactTile,
  TimelineTile,
} from "@/components/ftl-nomad/LogTileVariations";

export default async function AdventureLogs() {
  const logs = await getAllMissionLogs();

  const formatEarthDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="border-b border-blue-400 border-opacity-30 pb-4">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">
          MISSION ARCHIVE
        </h1>
        <p className="text-gray-300">
          Complete log of all campaign adventures and significant events
        </p>
      </div>

      {logs.length === 0 ? (
        <div className="bg-black bg-opacity-40 p-6 rounded border border-gray-600 text-center">
          <p className="text-gray-400">No mission logs found in database.</p>
          <p className="text-sm text-gray-500 mt-2">
            Create markdown files in src/ftl/logs/ to populate this archive.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {logs.map((log) => (
              <HologramTile
                key={log.slug}
                log={log}
                formatEarthDate={formatEarthDate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
