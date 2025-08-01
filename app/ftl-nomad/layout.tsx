// app/ftl-nomad/layout.tsx

import { Metadata } from "next";
import FTLNomadLayout from "../../components/FTLNomadLayout";

export const metadata: Metadata = {
  title: "FTL Nomad Campaign Archive",
  description:
    "An archive of characters, mission logs, star maps, and lore from our run of the FTL Nomad RPG campaign. ",
};

export default function FTLLayout({ children }: { children: React.ReactNode }) {
  return <FTLNomadLayout>{children}</FTLNomadLayout>;
}
