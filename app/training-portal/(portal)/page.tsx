// app/training-portal/page.tsx

import { getCourses } from "../../../lib/training/getCourses";
import TrainingPortalClient from "./TrainingPortalClient";

export default async function TrainingPortalDashboard() {
  const courses = await getCourses();

  return <TrainingPortalClient courses={courses} />;
}
