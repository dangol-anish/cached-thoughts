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
      <body className="sticky top-0 bg-background text-foreground">
        <main className="flex">
          {user !== null ? (
            <div>
              <Sidebar />

              <SidebarSm />
            </div>
          ) : null}

          <div className="h-screen w-full p-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
