// app/ftl-nomad/characters/[slug]/page.tsx
import { CrewMemberDetail } from "@/components/ftl-nomad/CrewMemberDetail";
import { getCrewMemberBySlug, getAllCrewMembers } from "@/lib/ftl-crew";
import { notFound } from "next/navigation";

interface CrewMemberPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const crew = await getAllCrewMembers();
  return crew.map((member) => ({
    slug: member.slug,
  }));
}

export default async function CrewMemberPage({ params }: CrewMemberPageProps) {
  const { slug } = await params;
  console.log(slug);
  const member = await getCrewMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return <CrewMemberDetail member={member} />;
}
