import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

import "./globals.css";
import Header from "@/components/header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "cachedThoughts",
  description: "An example of Supabase, Auth and NextJS server actions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="sticky top-0 bg-background text-foreground">
        {/* <Header /> */}
        <main className="flex">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
