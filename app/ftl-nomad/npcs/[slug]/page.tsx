import { notFound } from "next/navigation";

import NPCDetailClient from "./NPCDetailClient";
import { getNPCBySlug } from "../../../../lib/ftl-npc";

export default async function NPCDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const npc = await getNPCBySlug(slug);

  if (!npc) {
    notFound();
  }

  return <NPCDetailClient npc={npc} />;
}
