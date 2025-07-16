// app/ftl-nomad/characters/page.tsx
import { getAllCrewMembers } from "@/lib/ftl-crew";
import { CrewMemberCard } from "@/components/ftl-nomad/CrewMemberCard";

export default async function CrewRoster() {
  const crew = await getAllCrewMembers();

  const activeCrewMembers = crew.filter((member) => member.status === "active");
  const inactiveCrewMembers = crew.filter(
    (member) => member.status !== "active"
  );

  return (
    <div className="space-y-6 mb-8">
      <div className="border-b border-blue-400 border-opacity-30 pb-4">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">CREW ROSTER</h1>
        <p className="text-gray-300">
          Personnel database for FTL Nomad crew members and associates
        </p>
        <div className="mt-2 text-sm text-cyan-400">
          Active Personnel: {activeCrewMembers.length} | Inactive/Missing:{" "}
          {inactiveCrewMembers.length}
        </div>
      </div>

      {crew.length === 0 ? (
        <div className="bg-black bg-opacity-40 p-6 rounded border border-gray-600 text-center">
          <p className="text-gray-400">No crew records found in database.</p>
          <p className="text-sm text-gray-500 mt-2">
            Create markdown files in src/ftl/crew/ to populate this roster.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Active Crew Section */}
          {activeCrewMembers.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-green-400 mb-4 border-b border-green-400 border-opacity-30 pb-2">
                ACTIVE PERSONNEL
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeCrewMembers.map((member, index) => (
                  <CrewMemberCard
                    key={member.slug}
                    member={member}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Inactive Crew Section */}
          {inactiveCrewMembers.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-orange-400 mb-4 border-b border-orange-400 border-opacity-30 pb-2">
                INACTIVE/MISSING PERSONNEL
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {inactiveCrewMembers.map((member, index) => (
                  <CrewMemberCard
                    key={member.slug}
                    member={member}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
