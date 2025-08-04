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

  const isFTLNomadPage =
    pathname.startsWith("/ftl-nomad") || pathname.startsWith("/ftl-utilities");
  const isTrainingPortalPage = pathname.startsWith("/training-portal");
  const courseContentMatch =
    pathname.includes("courses") && pathname.includes("module");

  // Skip layout for FTL Nomad and Training Portal pages
  if (isFTLNomadPage || isTrainingPortalPage || courseContentMatch) {
    return <>{children}</>;
  }

  return <SciFiLayout>{children}</SciFiLayout>;
}
