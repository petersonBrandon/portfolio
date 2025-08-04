import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FTL Utilities",
  description: "Generate markdown and JSON content for our FTL Nomad database",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between h-16">
                <h1 className="text-xl font-semibold text-gray-100">
                  FTL Utilities
                </h1>
                <nav className="hidden md:flex space-x-6">
                  <a
                    href="/ftl-utilities"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="/ftl-utilities/log-creator"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Log Creator
                  </a>
                  <a
                    href="/ftl-utilities/location-creator"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Location Creator
                  </a>
                  <a
                    href="/ftl-utilities/lore-creator"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Lore Creator
                  </a>
                  <a
                    href="/ftl-utilities/npc-creator"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    NPC Creator
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-800 bg-gray-900/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
              <p className="text-center text-gray-400 text-sm">
                FTL Utilities - Generate content for your projects
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
