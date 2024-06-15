import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">cachedThoughts</span>
          </a>
          <Link href="/todos">Home</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Link href="/auth/signup">Get Started</Link>
        </div>
      </div>
    </header>
  );
}
