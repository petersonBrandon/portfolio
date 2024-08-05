import React from "react";
import Wave from "react-wavify";
import fs from "fs";
import path from "path";
import { ToolsClientWrapper } from "./ToolsClientWrapper";

interface Tool {
  name: string;
  link: string;
  category: string;
}

async function getTools(): Promise<Tool[]> {
  const toolsDirectory = path.join(process.cwd(), "src", "app", "tools");
  const categories = fs
    .readdirSync(toolsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => dirent.name !== "page.tsx");

  const tools: Tool[] = [];

  for (const category of categories) {
    const categoryPath = path.join(toolsDirectory, category.name);
    const toolFolders = fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory());

    for (const tool of toolFolders) {
      tools.push({
        name: tool.name.replace(/\-/g, " "),
        link: `/tools/${category.name}/${tool.name}`,
        category: category.name,
      });
    }
  }

  return tools;
}

export default async function Tools() {
  const tools = await getTools();
  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-700 pt-20">
      <div className="fixed inset-0 z-0 overflow-hidden h-full w-full bottom-0 flex justify-center items-end">
        <Wave
          fill="#111827"
          paused={false}
          style={{ display: "flex", height: "75%" }}
          options={{
            height: 40,
            amplitude: 40,
            speed: 0.15,
            points: 4,
          }}
        />
      </div>
      <main className="relative z-10 container mx-auto px-4 py-16 text-white">
        <section className="flex flex-col items-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Tools</h1>
        </section>
        <ToolsClientWrapper tools={tools} categories={categories} />
      </main>
    </div>
  );
}
