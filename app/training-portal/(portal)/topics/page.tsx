// app/training-portal/topics/page.tsx

import { getCourses } from "../../../../lib/training/getCourses";
import TopicsClient from "./TopicsClient";

export default async function TopicsPage() {
  const courses = await getCourses();

  return <TopicsClient courses={courses} />;
}
