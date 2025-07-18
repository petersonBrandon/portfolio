// app/training-portal/browse/page.tsx

import { getCourses } from "../../../../lib/training/getCourses";
import BrowseClient from "./BrowseClient";

export default async function BrowsePage() {
  const courses = await getCourses();

  return <BrowseClient courses={courses} />;
}
