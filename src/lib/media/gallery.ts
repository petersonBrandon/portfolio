// lib/gallery.ts
import fs from "fs";
import path from "path";

export interface ImageData {
  src: string;
  alt: string;
  title: string;
  filename: string;
}

export async function getGalleryImages(): Promise<ImageData[]> {
  const imagesDirectory = path.join(process.cwd(), "public", "ftl", "images");

  try {
    // Check if directory exists
    if (!fs.existsSync(imagesDirectory)) {
      console.warn("Images directory does not exist:", imagesDirectory);
      return [];
    }

    // Read all files in the directory
    const filenames = fs.readdirSync(imagesDirectory);

    // Filter for image files
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".bmp",
      ".svg",
    ];
    const imageFiles = filenames.filter((filename) =>
      imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext))
    );

    // Transform filenames into ImageData objects
    const images: ImageData[] = imageFiles.map((filename) => {
      const nameWithoutExt = path.parse(filename).name;

      // Generate title from filename (convert kebab-case/snake_case to Title Case)
      const title = nameWithoutExt
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      // Generate alt text
      const alt = `${title} - FTL Nomad Archive`;

      const imageData = {
        src: `/ftl/images/${filename}`,
        alt,
        title,
        filename,
      };

      return imageData;
    });

    // Sort by filename for consistent ordering
    images.sort((a, b) => a.filename.localeCompare(b.filename));

    return images;
  } catch (error) {
    console.error("Error reading gallery images:", error);
    return [];
  }
}
