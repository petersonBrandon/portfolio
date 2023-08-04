"use client";

import { Footer, Nav } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const exo = Albert_Sans({ weight: ["500"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={exo.className}>
        <AnimatePresence mode="popLayout">
          <Nav />
          <motion.div className="mt-20 flex flex-col items-center w-screen relative z-0">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 50 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="w-3/5 max-lg:w-10/12"
            >
              {children}
              <Footer />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
