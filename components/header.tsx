import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
          {user !== null ? (
            <form action={signOut} className="flex items-center gap-4">
              <p>{user.user_metadata.user_name}</p>
              <Button>Sign Out</Button>
            </form>
          ) : (
            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Link href="/auth/signup">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
