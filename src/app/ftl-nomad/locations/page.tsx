// page.tsx
import { Suspense } from "react";
import StarSystemMapClient from "./StarSystemMapClient";
import { getInitialSystemGrid } from "@/lib/ftl-systems";

export default async function StarSystemMap() {
  const systems = await getInitialSystemGrid();

  return (
    <div className="h-full flex flex-col">
      <Suspense
        fallback={<div className="text-blue-400">Loading star charts...</div>}
      >
        <StarSystemMapClient initialSystems={systems} />
      </Suspense>
    </div>
  );
}
