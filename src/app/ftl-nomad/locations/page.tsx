// page.tsx
import { Suspense } from "react";
import StarSystemMapClient from "./StarSystemMapClient";
import { getInitialSystemGrid } from "@/lib/ftl-systems";

export default async function StarSystemMap() {
  const systems = await getInitialSystemGrid();

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <Suspense
        fallback={<div className="text-blue-400">Loading star charts...</div>}
      >
        <StarSystemMapClient initialSystems={systems} />
      </Suspense>
    </div>
  );
}
