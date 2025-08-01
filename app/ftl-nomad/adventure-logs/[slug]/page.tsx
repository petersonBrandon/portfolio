// app/ftl-nomad/adventure-logs/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  getAllMissionLogs,
  getMissionLogBySlug,
} from "../../../../lib/ftl-logs";
import { customMarkdownComponents } from "../../../../lib/markdownComponents";

export async function generateStaticParams() {
  const logs = await getAllMissionLogs();
  return logs.map((log) => ({
    slug: log.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function MissionLogDetail({ params }: Props) {
  const { slug } = await params;
  const log = await getMissionLogBySlug(slug);

  if (!log) {
    notFound();
  }

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
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/ftl-nomad/adventure-logs"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            ← BACK TO ARCHIVE
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-blue-400 mb-3">{log.title}</h1>
        <div className="flex flex-wrap gap-6 text-sm text-gray-300">
          <span>
            Stardate:{" "}
            <span className="text-cyan-400 font-mono">{log.stardate}</span>
          </span>
          <span>
            Session Date:{" "}
            <span className="text-blue-400">
              {formatEarthDate(log.earthDate)}
            </span>
          </span>
          <span>
            Crew: <span className="text-blue-400">{log.crew}</span>
          </span>
        </div>
      </div>

      <div className="bg-black bg-opacity-40 p-6 rounded border border-blue-400 border-opacity-30 max-w-screen-lg">
        <div className="prose prose-invert prose-blue max-w-none">
          <ReactMarkdown components={customMarkdownComponents}>
            {log.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
