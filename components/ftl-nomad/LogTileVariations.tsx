// components/ftl-nomad/LogTileVariations.tsx
import Link from "next/link";
import { MissionLog } from "../../lib/ftl-logs";
import { customMarkdownComponents } from "@/lib/markdownComponents";
import ReactMarkdown from "react-markdown";

interface LogTileProps {
  log: MissionLog;
  formatEarthDate: (dateString: string) => string;
}

// Variation 1: Terminal/Console Style
export const TerminalTile = ({ log, formatEarthDate }: LogTileProps) => (
  <Link
    href={`/ftl-nomad/adventure-logs/${log.slug}`}
    className="group block bg-black bg-opacity-60 p-4 rounded border border-green-400 border-opacity-30 hover:border-opacity-60 transition-all duration-300 font-mono"
  >
    <div className="space-y-2">
      <div className="text-green-400 text-xs">
        &gt; ACCESSING LOG_{log.slug.toUpperCase()}
      </div>
      <div className="text-cyan-400 text-sm">
        [{log.stardate}] {formatEarthDate(log.earthDate)}
      </div>
      <h3 className="text-white font-bold group-hover:text-green-300 transition-colors">
        {log.title}
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
        {log.excerpt}
      </p>
      <div className="text-xs text-gray-400 pt-2">
        CREW: {log.crew} |{" "}
        <span className="text-green-400 group-hover:animate-pulse">READY</span>
      </div>
    </div>
  </Link>
);

// Variation 2: Holographic Data Panel
export const HologramTile = ({ log, formatEarthDate }: LogTileProps) => (
  <Link
    href={`/ftl-nomad/adventure-logs/${log.slug}`}
    className="group block relative bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20 p-5 rounded-lg border border-cyan-400 border-opacity-30 hover:border-opacity-70 transition-all duration-300 hover:shadow-cyan-500/20 hover:shadow-lg"
  >
    {/* Holographic lines */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent transform -skew-y-1 rounded-lg" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent transform skew-x-1 rounded-lg" />

    <div className="relative space-y-3">
      <div className="flex justify-between items-start">
        <div className="text-xs text-cyan-400 bg-black bg-opacity-30 px-2 py-1 rounded">
          STARDATE {log.stardate}
        </div>
        <div className="text-xs text-gray-400">
          {formatEarthDate(log.earthDate)}
        </div>
      </div>

      <h3 className="text-cyan-300 font-bold text-lg group-hover:text-white transition-colors">
        {log.title}
      </h3>

      <div className="h-px bg-gradient-to-r from-cyan-400/30 via-cyan-400/60 to-cyan-400/30" />

      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
        <ReactMarkdown components={customMarkdownComponents}>
          {log.excerpt}
        </ReactMarkdown>
      </p>

      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">
          CREW: <span className="text-cyan-400">{log.crew}</span>
        </span>
        <span className="text-cyan-400 group-hover:text-white transition-colors">
          ◉ ACCESS DATA
        </span>
      </div>
    </div>
  </Link>
);

// Variation 3: Military Briefing Style
export const MilitaryTile = ({ log, formatEarthDate }: LogTileProps) => (
  <Link
    href={`/ftl-nomad/adventure-logs/${log.slug}`}
    className="group block bg-gray-900 bg-opacity-80 p-4 rounded border-l-4 border-orange-400 hover:border-orange-300 transition-all duration-300 hover:bg-opacity-90"
  >
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="text-orange-400 text-xs font-bold tracking-wider">
          CLASSIFIED - LEVEL 7
        </div>
        <div className="text-xs text-gray-400 font-mono">
          {formatEarthDate(log.earthDate)}
        </div>
      </div>

      <div className="text-xs text-gray-400 font-mono">
        MISSION REF: {log.stardate}
      </div>

      <h3 className="text-white font-bold text-lg group-hover:text-orange-300 transition-colors uppercase tracking-wide">
        {log.title}
      </h3>

      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 border-l-2 border-gray-600 pl-3">
        {log.excerpt}
      </p>

      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          PERSONNEL: <span className="text-orange-400">{log.crew}</span>
        </div>
        <div className="text-xs text-orange-400 group-hover:text-orange-300 transition-colors">
          → DECLASSIFY
        </div>
      </div>
    </div>
  </Link>
);

// Variation 4: Sleek Modern Card
export const ModernTile = ({ log, formatEarthDate }: LogTileProps) => (
  <Link
    href={`/ftl-nomad/adventure-logs/${log.slug}`}
    className="group block bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-10 hover:border-opacity-20 transition-all duration-300 hover:bg-opacity-10"
  >
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-blue-400 text-sm font-medium">
            {log.stardate}
          </span>
        </div>
        <span className="text-gray-400 text-xs">
          {formatEarthDate(log.earthDate)}
        </span>
      </div>

      <h3 className="text-white font-semibold text-xl group-hover:text-blue-300 transition-colors">
        {log.title}
      </h3>

      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
        {log.excerpt}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-xs">{log.crew}</span>
        <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors">
          <span className="text-xs">Read more</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
    </div>
  </Link>
);

// Variation 5: Compact List Style
export const CompactTile = ({ log, formatEarthDate }: LogTileProps) => (
  <Link
    href={`/ftl-nomad/adventure-logs/${log.slug}`}
    className="group block bg-black bg-opacity-40 p-4 rounded border border-blue-400 border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:bg-opacity-60"
  >
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 w-16 h-16 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center border border-blue-400 border-opacity-30">
        <div className="text-blue-400 text-xs font-mono text-center">
          <div>{log.stardate.split(".")[0]}</div>
          <div className="text-[10px]">{log.stardate.split(".")[1]}</div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-blue-400 font-bold text-lg group-hover:text-blue-300 transition-colors truncate">
            {log.title}
          </h3>
          <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
            {formatEarthDate(log.earthDate)}
          </span>
        </div>

        <p className="text-gray-300 text-sm line-clamp-2 mb-2">{log.excerpt}</p>

        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Crew: {log.crew}</span>
          <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </div>
  </Link>
);

// Variation 6: Minimalist Timeline Style
export const TimelineTile = ({ log, formatEarthDate }: LogTileProps) => (
  <div className="relative">
    {/* Timeline line */}
    <div className="absolute left-6 top-0 w-px h-full bg-blue-400 bg-opacity-30" />

    <Link
      href={`/ftl-nomad/adventure-logs/${log.slug}`}
      className="group block relative bg-transparent hover:bg-blue-600 hover:bg-opacity-10 p-6 pl-16 rounded-r-lg border-l-4 border-blue-400 border-opacity-30 hover:border-opacity-60 transition-all duration-300"
    >
      {/* Timeline dot */}
      <div className="absolute left-4 top-6 w-4 h-4 bg-blue-400 rounded-full border-2 border-black group-hover:bg-blue-300 transition-colors" />

      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div className="text-blue-400 text-sm font-mono">{log.stardate}</div>
          <div className="text-gray-400 text-xs">
            {formatEarthDate(log.earthDate)}
          </div>
        </div>

        <h3 className="text-white font-bold text-lg group-hover:text-blue-300 transition-colors">
          {log.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed">{log.excerpt}</p>

        <div className="text-xs text-gray-400 pt-2">Crew: {log.crew}</div>
      </div>
    </Link>
  </div>
);
