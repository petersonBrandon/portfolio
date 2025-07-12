// app/ftl-nomad/locations/page.tsx
import ComingSoon from "@/components/ftl-nomad/ComingSoon";

export default function LocationsPage() {
  return (
    <ComingSoon
      title="STAR_CHARTS"
      description="Galactic Navigation Database"
      estimatedCompletion="STARDATE 2025.09.05"
      features={[
        "Star system mapping",
        "Planetary atmosphere analysis",
        "Unexplored sector tracking",
      ]}
    />
  );
}
