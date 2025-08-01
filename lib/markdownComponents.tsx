// lib/markdownComponents.jsx
import Image from "next/image";
import React from "react";

// Helper function to ensure children are rendered as a string
// This is the same helper we discussed to fix the "[object Object]" error.
const renderChildrenAsString = (children: any) => {
  if (Array.isArray(children)) {
    return children
      .map((child) => {
        return typeof child === "object" && child !== null
          ? child
          : String(child);
      })
      .flat()
      .join("");
  }
  return String(children);
};

export const customMarkdownComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-xl font-bold text-blue-400 mb-3 font-mono border-b border-blue-400 border-opacity-30 pb-2">
      {renderChildrenAsString(children)}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-lg font-bold text-green-400 mb-3 font-mono border-b border-green-400 border-opacity-30 pb-1">
      {renderChildrenAsString(children)}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-md font-bold text-yellow-400 mb-2 font-mono">
      {renderChildrenAsString(children)}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="text-gray-300 mb-4 leading-relaxed font-mono text-sm">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="text-gray-300 mb-4 ml-4 font-mono text-sm">{children}</ul>
  ),
  li: ({ children }: any) => (
    <li className="mb-1 text-gray-300">
      <span className="text-blue-400 mr-2">▶</span>
      {children}
    </li>
  ),
  strong: ({ children }: any) => (
    <strong className="text-blue-400 font-bold">
      {renderChildrenAsString(children)}
    </strong>
  ),
  em: ({ children }: any) => (
    <em className="text-yellow-400 italic">
      {renderChildrenAsString(children)}
    </em>
  ),
  hr: () => <hr className="pb-4" />,
  img: ({ src, alt, title }: any) => (
    <div className="mb-4">
      <Image
        src={src}
        alt={alt || ""}
        title={title}
        width={800}
        height={600}
        className="rounded-lg border border-gray-600 border-opacity-50"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      {alt && (
        <p className="text-gray-400 text-xs mt-2 italic font-mono text-center">
          {alt}
        </p>
      )}
    </div>
  ),
  // Add other custom components here as needed (e.g., a, img, code, pre)
};
