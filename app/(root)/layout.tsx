import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../globals.css";
import Dashboard from "@/components/Dashboard/Dashboard";

const space = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task Management",
  description: "Master Your Workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={space.className}>
        <Dashboard>
          {children}
        </Dashboard>
      </body>
    </html>
  );
}
