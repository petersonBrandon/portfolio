// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConditionalLayout from "@/components/ConditionalLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test Engineer | Quantum OS",
  description: "Personal portfolio of a software test engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
