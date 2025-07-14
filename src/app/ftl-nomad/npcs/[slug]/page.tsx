import { notFound } from "next/navigation";
import { getNPCBySlug } from "@/lib/ftl-npc";
import NPCDetailClient from "./NPCDetailClient";

export default async function NPCDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const npc = await getNPCBySlug(params.slug);

  if (!npc) {
    notFound();
  }

  return <NPCDetailClient npc={npc} />;
}
