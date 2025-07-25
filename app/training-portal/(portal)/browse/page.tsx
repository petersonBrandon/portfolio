// app/training-portal/browse/page.tsx

import { Suspense } from "react";
import { getCourses } from "../../../../lib/training/getCourses";
import BrowseClient from "./BrowseClient";

export default async function BrowsePage() {
  const courses = await getCourses();

  function BrowseLoading() {
    return (
      <div className="space-y-8">
        <div className="bg-black p-6 border-4 border-cyan-400 animate-pulse">
          <div className="h-8 bg-gray-600 rounded mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
        <div className="bg-white border-4 border-black p-6 animate-pulse">
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return;
  <Suspense fallback={<BrowseLoading />}>
    <BrowseClient courses={courses} />
  </Suspense>;
}
