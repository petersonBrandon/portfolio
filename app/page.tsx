import { PageContent, TerminalPrompt } from "../components/PageContent";

export default function HomePage() {
  const content = `> Quantum OS v3.14.159
> Loading personal matrix...
> Establishing neural link...
> Welcome, Test Engineer Protocol Active

SYSTEM STATUS: ✓ OPERATIONAL
CAFFINE LEVELS: ██████████ 100%
BUG DETECTION: ████████░░ 89%
SCI-FI MODE: ██████████ 100%

"Quality is not an act, it is a habit." - Aristotle
"In testing we trust, in automation we excel."`;

  return (
    <PageContent title="SYSTEM INITIALIZATION">
      <TerminalPrompt delay={200}>{content}</TerminalPrompt>
    </PageContent>
  );
}
