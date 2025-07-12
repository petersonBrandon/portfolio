import { PageContent, TerminalPrompt } from "@/components/PageContent";

export default function AboutPage() {
  const content = `> Personal Data Archive Accessed

NAME: Brandon Peterson
SPECIALIZATION: Quality Assurance & Bug Hunting
INTERESTS: [Sci-Fi, 3D_Printing, Software_Dev]
STATUS: Currently debugging reality...

"In space, no one can hear you segfault."

CORE_FUNCTIONS:
• Test automation architect
• Quality guardian of the digital realm  
• 3D printing enthusiast & maker
• Code archaeologist & bug whisperer

MISSION_STATEMENT:
Breaking software so users don't have to.
One test case at a time, one bug at a time.`;

  return (
    <PageContent title="./ABOUT_ME">
      <TerminalPrompt delay={200}>{content}</TerminalPrompt>
    </PageContent>
  );
}
