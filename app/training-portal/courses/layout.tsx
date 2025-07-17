// app/training-portal/courses/layout.tsx
import { headers } from "next/headers";
import { ReactNode } from "react";
import AnimatedHeader from "./AnimatedHeader";
import AnimatedMain from "./AnimatedMain";
import NonCourseLayout from "./NonCourseLayout";
import CourseNavigationSidebar from "./CourseNavigationSideBar";
import {
  detectCourseFromPath,
  getCourseStructure,
} from "../../../lib/training/getCourseStructure";

interface CourseLayoutProps {
  children: ReactNode;
}

export default async function CourseLayout({ children }: CourseLayoutProps) {
  const headersList = await headers();

  // Try multiple ways to get the pathname
  const pathname = headersList.get("x-url") || "";

  console.log(pathname);

  const courseInfo = detectCourseFromPath(pathname);

  if (!courseInfo) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AnimatedHeader />
        <NonCourseLayout>{children}</NonCourseLayout>
      </div>
    );
  }

  const courseStructure = await getCourseStructure(
    courseInfo.category,
    courseInfo.course
  );

  if (!courseStructure) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AnimatedHeader courseStructure={courseStructure} />
      <div className="flex">
        <CourseNavigationSidebar
          courseStructure={courseStructure}
          currentPath={pathname}
        />
        <AnimatedMain>{children}</AnimatedMain>
      </div>
    </div>
  );
}
