// app/ftl-nomad/media/gallery/page.tsx
import React from "react";

import GalleryClient from "./GalleryClient";
import { getGalleryImages } from "@/lib/media/gallery";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-blue-400 border-opacity-30 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <h1 className="text-2xl font-bold text-blue-300">VISUAL ARCHIVE</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Multimedia database containing mission imagery and reconnaissance data
        </p>
      </div>

      {/* Pass data to client component */}
      <GalleryClient images={images} />
    </div>
  );
}
