// lib/getCourses.ts
import { readdir, stat } from "fs/promises";
import { join } from "path";

export interface Course {
  slug: string;
  title: string;
  path: string;
  launchPath: string;
  category: string;
}

export async function getCourses(): Promise<Course[]> {
  try {
    const coursesPath = join(process.cwd(), "app/training-portal/courses");
    const entries = await readdir(coursesPath);
    const courses: Course[] = [];

    for (const entry of entries) {
      const fullPath = join(coursesPath, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        // Check if this is a category folder
        const categoryPath = fullPath;
        const categoryContents = await readdir(categoryPath);

        for (const courseEntry of categoryContents) {
          const coursePath = join(categoryPath, courseEntry);
          const courseStats = await stat(coursePath);

          if (courseStats.isDirectory()) {
            // Find the first module directory
            const courseContents = await readdir(coursePath);
            const moduleDir = courseContents.find((item) =>
              item.startsWith("module-1-")
            );

            let launchPath = `/training-portal/courses/${entry}/${courseEntry}/`;

            if (moduleDir) {
              const modulePath = join(coursePath, moduleDir);
              const moduleContents = await readdir(modulePath);
              const lessonDir = moduleContents.find((item) =>
                item.startsWith("lesson-1-")
              );

              if (lessonDir) {
                launchPath = `/training-portal/courses/${entry}/${courseEntry}/${moduleDir}/${lessonDir}`;
              }
            }

            courses.push({
              slug: courseEntry,
              title: courseEntry
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
              path: `/training-portal/courses/${entry}/${courseEntry}`,
              launchPath: launchPath,
              category: entry,
            });
          }
        }
      }
    }

    return courses;
  } catch (error) {
    console.error("Error reading courses:", error);
    return [];
  }
}
