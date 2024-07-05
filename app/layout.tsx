import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import SidebarSm from "./components/SidebarSm";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CachedThoughts",
  description: "An example of Supabase, Auth and NextJS server actions",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground">
        <main className="flex h-screen overflow-hidden">
          {user !== null ? (
            <div className="flex-none h-full">
              <Sidebar />
              <SidebarSm />
            </div>
          ) : null}

          <div className="flex-1 h-full overflow-y-auto p-4 ml-[50px]  md:ml-[var(--sidebar-width)]">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
