import { readdir, stat } from "fs/promises";
import { join } from "path";

export interface Lesson {
  slug: string;
  title: string;
  path: string;
  order: number;
}

export interface Module {
  slug: string;
  title: string;
  path: string;
  order: number;
  lessons: Lesson[];
}

export interface CourseStructure {
  slug: string;
  title: string;
  category: string;
  modules: Module[];
}

function extractOrderAndTitle(
  name: string,
  type: "module" | "lesson"
): { order: number; title: string } {
  const prefix = type === "module" ? "module-" : "lesson-";
  const regex = new RegExp(`^${prefix}(\\d+)-(.+)$`);
  const match = name.match(regex);

  if (match) {
    const order = parseInt(match[1], 10);
    const title = match[2]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { order, title };
  }

  return { order: 0, title: name };
}

export function detectCourseFromPath(
  pathname: string
): { category: string; course: string } | null {
  const match = pathname.match(
    /^\/training-portal\/courses\/([^\/]+)\/([^\/]+)/
  );
  if (match) {
    return { category: match[1], course: match[2] };
  }
  return null;
}

export async function getCourseStructure(
  category: string,
  courseSlug: string
): Promise<CourseStructure | null> {
  try {
    const coursePath = join(
      process.cwd(),
      "app/training-portal/courses",
      category,
      courseSlug
    );
    const courseStats = await stat(coursePath);

    if (!courseStats.isDirectory()) {
      return null;
    }

    const modules: Module[] = [];
    const entries = await readdir(coursePath);

    for (const entry of entries) {
      const entryPath = join(coursePath, entry);
      const entryStats = await stat(entryPath);

      if (entryStats.isDirectory() && entry.startsWith("module-")) {
        const { order: moduleOrder, title: moduleTitle } = extractOrderAndTitle(
          entry,
          "module"
        );

        const lessons: Lesson[] = [];
        const lessonEntries = await readdir(entryPath);

        for (const lessonEntry of lessonEntries) {
          const lessonPath = join(entryPath, lessonEntry);
          const lessonStats = await stat(lessonPath);

          if (lessonStats.isDirectory() && lessonEntry.startsWith("lesson-")) {
            const { order: lessonOrder, title: lessonTitle } =
              extractOrderAndTitle(lessonEntry, "lesson");

            lessons.push({
              slug: lessonEntry,
              title: lessonTitle,
              path: `/training-portal/courses/${category}/${courseSlug}/${entry}/${lessonEntry}`,
              order: lessonOrder,
            });
          }
        }

        lessons.sort((a, b) => a.order - b.order);

        modules.push({
          slug: entry,
          title: moduleTitle,
          path: `/training-portal/courses/${category}/${courseSlug}/${entry}`,
          order: moduleOrder,
          lessons,
        });
      }
    }

    modules.sort((a, b) => a.order - b.order);

    return {
      slug: courseSlug,
      title: courseSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      category,
      modules,
    };
  } catch (error) {
    console.error("Error reading course structure:", error);
    return null;
  }
}
