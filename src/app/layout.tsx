// app/layout.tsx
import { Footer, Nav } from "@/components";
import PageTransition from "@/components/PageTransition"; // Add this import
import "./globals.css";
import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";

const exo = Albert_Sans({ weight: ["500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brandon Peterson - Portfolio",
  description: "Full Stack Developer and Problem Solver",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={exo.className}>
        <Nav />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
