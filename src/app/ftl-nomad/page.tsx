// app/ftl-nomad/page.tsx
import { getAllMissionLogs } from "@/lib/ftl-logs";
import { getAllCrewMembers } from "@/lib/ftl-crew";
import Link from "next/link";

export default async function FTLNomadHome() {
  const missionLogs = await getAllMissionLogs();
  const crewMembers = await getAllCrewMembers();

  // Get the 3 most recent missions
  const recentMissions = missionLogs.slice(0, 3);

  // Get active crew members
  const activeCrew = crewMembers.filter((member) => member.status === "active");

  // Get crew count by status
  const crewStats = crewMembers.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="border-b border-blue-400 border-opacity-30 pb-4">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">
          FTL NOMAD CAMPAIGN DATABASE
        </h1>
        <p className="text-gray-300">
          Welcome to the ship's central command system. Access all campaign
          data, mission logs, and crew information from this console.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-black bg-opacity-40 p-4 rounded border border-blue-400 border-opacity-30">
          <h3 className="text-blue-400 font-bold mb-3">RECENT MISSIONS</h3>
          {recentMissions.length > 0 ? (
            <div className="space-y-2">
              {recentMissions.map((mission, index) => (
                <div key={mission.slug} className="text-sm">
                  <Link
                    href={`/ftl-nomad/adventure-logs/${mission.slug}`}
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    {mission.title}
                  </Link>
                  <div className="text-gray-400 text-xs">
                    {mission.stardate} | {mission.earthDate}
                  </div>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-600">
                <Link
                  href="/ftl-nomad/adventure-logs"
                  className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
                >
                  → View All Missions ({missionLogs.length})
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No mission logs found.</p>
          )}
        </div>

        <div className="bg-black bg-opacity-40 p-4 rounded border border-blue-400 border-opacity-30">
          <h3 className="text-blue-400 font-bold mb-3">ACTIVE CREW</h3>
          {activeCrew.length > 0 ? (
            <div className="space-y-2">
              {activeCrew.slice(0, 4).map((member) => (
                <div key={member.slug} className="text-sm">
                  <Link
                    href={`/ftl-nomad/characters/${member.slug}`}
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    {member.name}
                  </Link>
                  <div className="text-gray-400 text-xs">
                    {member.archetype} | {member.species}
                  </div>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-600">
                <div className="text-xs text-gray-400 mb-1">
                  Active: {crewStats.active || 0} | Inactive:{" "}
                  {crewStats.inactive || 0}
                  {crewStats.deceased && ` | KIA: ${crewStats.deceased}`}
                </div>
                <Link
                  href="/ftl-nomad/characters"
                  className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
                >
                  → View Full Roster ({crewMembers.length})
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              No active crew members found. Begin recruitment!
            </p>
          )}
        </div>

        <div className="bg-black bg-opacity-40 p-4 rounded border border-blue-400 border-opacity-30">
          <h3 className="text-blue-400 font-bold mb-2">CONTACT NETWORK</h3>
          <p className="text-gray-300 text-sm mb-3">
            NPC database and faction relationships
          </p>
          <div className="text-yellow-400 text-xs">
            [SYSTEM UNDER CONSTRUCTION]
          </div>
          <div className="text-gray-400 text-xs mt-2">
            Contact network protocols being calibrated...
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl text-yellow-400 mb-4">
          SHIP STATUS & QUICK ACCESS
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-black bg-opacity-40 p-4 rounded border border-gray-600">
            <h4 className="text-green-400 font-bold mb-2">NAVIGATION LOG</h4>
            <p className="text-gray-300 text-sm mb-2">
              Current location: Unknown Sector
            </p>
            <p className="text-gray-300 text-sm mb-2">
              Last jump: 72 hours ago
            </p>
            <div className="text-xs text-gray-400">
              Recent missions: {missionLogs.length} logged
            </div>
          </div>

          <div className="bg-black bg-opacity-40 p-4 rounded border border-gray-600">
            <h4 className="text-green-400 font-bold mb-2">CREW STATUS</h4>
            <p className="text-gray-300 text-sm mb-2">
              Active Personnel: {activeCrew.length}
            </p>
            <p className="text-gray-300 text-sm mb-2">
              Total Roster: {crewMembers.length}
            </p>
            <div className="text-xs text-gray-400">
              Last roster update: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Statistics */}
      <div className="mt-8">
        <h2 className="text-xl text-yellow-400 mb-4">CAMPAIGN STATISTICS</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-black bg-opacity-40 p-3 rounded border border-gray-600">
            <div className="text-2xl font-bold text-blue-400">
              {missionLogs.length}
            </div>
            <div className="text-sm text-gray-300">Total Missions</div>
          </div>

          <div className="bg-black bg-opacity-40 p-3 rounded border border-gray-600">
            <div className="text-2xl font-bold text-green-400">
              {activeCrew.length}
            </div>
            <div className="text-sm text-gray-300">Active Crew</div>
          </div>

          <div className="bg-black bg-opacity-40 p-3 rounded border border-gray-600">
            <div className="text-2xl font-bold text-yellow-400">
              {crewMembers.length}
            </div>
            <div className="text-sm text-gray-300">Total Personnel</div>
          </div>
        </div>
      </div>
    </div>
  );
}
