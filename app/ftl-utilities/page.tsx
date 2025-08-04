export default function Home() {
  const utilities = [
    {
      name: "Log Creator",
      description: "Generate structured logs and events in markdown format",
      href: "/ftl-utilities/log-creator",
      icon: "📋",
    },
    {
      name: "Location Creator",
      description: "Create detailed location descriptions and data",
      href: "/ftl-utilities/location-creator",
      icon: "📍",
    },
    {
      name: "Lore Creator",
      description: "Build rich lore and backstory content",
      href: "/ftl-utilities/lore-creator",
      icon: "📚",
    },
    {
      name: "NPC Creator",
      description: "Generate non-player characters with stats and descriptions",
      href: "/ftl-utilities/npc-creator",
      icon: "👤",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-100 mb-4">FTL Utilities</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Generate markdown and JSON content for your projects with these simple
          utilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {utilities.map((utility) => (
          <a
            key={utility.name}
            href={utility.href}
            className="group block p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:bg-gray-750"
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl" role="img" aria-label={utility.name}>
                {utility.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-100 group-hover:text-white mb-2">
                  {utility.name}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300">
                  {utility.description}
                </p>
              </div>
              <div className="text-gray-500 group-hover:text-gray-400 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-block p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">
            Getting Started
          </h2>
          <p className="text-gray-400 max-w-md">
            Select a utility above to begin generating content. All tools output
            clean markdown and JSON formats ready for your projects.
          </p>
        </div>
      </div>
    </div>
  );
}
