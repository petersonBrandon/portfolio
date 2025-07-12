// components/ConditionalLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import SciFiLayout from "./SciFiLayout";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if we're on any FTL Nomad page
  const isFTLNomadPage = pathname.startsWith("/ftl-nomad");

  // If we're on FTL Nomad pages, render children without SciFiLayout
  // The FTL pages will use their own layout via the layout.tsx in ftl-nomad directory
  if (isFTLNomadPage) {
    return <>{children}</>;
  }

  // Otherwise, use the main SciFiLayout
  return <SciFiLayout>{children}</SciFiLayout>;
}
