// app/ftl-nomad/media/gallery/GalleryClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ImageData } from "@/lib/media/gallery";

interface GalleryClientProps {
  images: ImageData[];
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [scanningComplete, setScanningComplete] = useState(false);

  useEffect(() => {
    // Simulate scanning delay
    const timer = setTimeout(() => {
      setScanningComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const ImageTile = ({
    imageData,
    index,
  }: {
    imageData: ImageData;
    index: number;
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="relative aspect-square bg-black bg-opacity-50 border border-blue-400 border-opacity-30 rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => setSelectedImage(imageData)}
      >
        {/* Loading indicator */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10">
            <motion.div
              className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {/* Error state */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900 bg-opacity-20 text-red-400 text-center p-4">
            <div className="text-2xl mb-2">⚠</div>
            <div className="text-sm">Image Error</div>
            <div className="text-xs text-gray-400 mt-1">
              {imageData.filename}
            </div>
          </div>
        )}

        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={imageData.src}
            alt={imageData.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              console.error(`Failed to load image: ${imageData.src}`);
            }}
            priority={index < 4} // Priority for first 4 images
          />
        </div>

        {/* Overlay - only show if image loaded */}
        {imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="text-blue-300 text-sm font-medium">
                {imageData.title}
              </div>
              <div className="text-gray-400 text-xs">{imageData.filename}</div>
            </div>
          </div>
        )}

        {/* Scan lines effect - only show if image loaded */}
        {imageLoaded && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"
              animate={{ y: [0, "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {/* Corner accent - only show if image loaded */}
        {imageLoaded && (
          <>
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" />
          </>
        )}
      </motion.div>
    );
  };

  const ImageModal = ({ imageData }: { imageData: ImageData }) => {
    const handleDownload = async () => {
      try {
        const response = await fetch(imageData.src);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = imageData.filename || "image";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download failed:", error);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedImage(null)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-4xl max-h-[90vh] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-black bg-opacity-80 border border-blue-400 border-opacity-50 rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-blue-300 text-lg font-bold">
                  {imageData.title}
                </div>
                <div className="text-gray-400 text-sm">
                  {imageData.filename}
                </div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-400 hover:text-white text-2xl transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          {/* Image container */}
          <div className="relative bg-black border-x border-blue-400 border-opacity-50">
            <div className="relative aspect-video w-full">
              <Image
                src={imageData.src}
                alt={imageData.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-black bg-opacity-80 border border-blue-400 border-opacity-50 rounded-b-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-green-400 text-sm font-mono">
                FILE_PATH: {imageData.src}
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded border border-green-500 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Scanning status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black bg-opacity-40 border border-gray-600 rounded-lg p-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            className="w-2 h-2 bg-yellow-400 rounded-full"
            animate={{ opacity: scanningComplete ? 1 : [0.5, 1, 0.5] }}
            transition={{
              duration: 1,
              repeat: scanningComplete ? 0 : Infinity,
            }}
          />
          <span className="text-yellow-400 text-sm">
            {scanningComplete ? "SCAN COMPLETE" : "SCANNING MEDIA BANKS..."}
          </span>
        </div>
        <div className="text-xs text-gray-400">
          {scanningComplete
            ? `${images.length} files indexed and ready for viewing`
            : "Analyzing image files in storage matrix..."}
        </div>
      </motion.div>

      {/* Statistics */}
      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black bg-opacity-40 border border-gray-600 rounded-lg p-4"
        >
          <div className="text-yellow-400 text-sm mb-2">
            ARCHIVE STATISTICS:
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="text-green-400 font-bold">{images.length}</div>
              <div className="text-gray-400">Total Files</div>
            </div>
            <div>
              <div className="text-blue-400 font-bold">ACTIVE</div>
              <div className="text-gray-400">System Status</div>
            </div>
            <div>
              <div className="text-purple-400 font-bold">READY</div>
              <div className="text-gray-400">Archive Status</div>
            </div>
            <div>
              <div className="text-yellow-400 font-bold">
                {new Date().toLocaleDateString()}
              </div>
              <div className="text-gray-400">Last Scan</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Gallery grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scanningComplete ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
      >
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((imageData, index) => (
              <ImageTile
                key={imageData.src}
                imageData={imageData}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No images found</div>
          </div>
        )}
      </motion.div>

      {/* Image modal */}
      <AnimatePresence>
        {selectedImage && <ImageModal imageData={selectedImage} />}
      </AnimatePresence>
    </>
  );
}
