"use client";
import { Provider } from "@supabase/supabase-js";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { oAuthSignIn } from "@/app/auth/actions";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const OAuthProvider: OAuthProvider[] = [
    {
      name: "github",
      displayName: "Github",
      icon: <Github className="size-5" />,
    },
  ];

  return (
    <>
      {OAuthProvider.map((provider) => (
        <Button
          className="flex items-center justify-center gap-2"
          variant="outline"
          onClick={async () => await oAuthSignIn(provider.name)}
        >
          {provider.icon}
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
