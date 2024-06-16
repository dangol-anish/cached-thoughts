"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/utils/helpers";

export async function emailLogin(formData: FormData) {
  const supabase = createClient();

  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      throw error;
    }

    revalidatePath("/", "layout");
    redirect("/home");
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    redirect(`/auth/login?message=${encodeURIComponent(errorMessage)}`);
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    options: {
      data: {
        user_name: formData.get("username") as string,
      },
    },
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(`/auth/signup?message=${encodeURIComponent(error.message)}`);
  }

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/auth/login");
}

export async function signOut() {
  const supabase = createClient();

  try {
    await supabase.auth.signOut();
    redirect("/auth/login");
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    redirect(`/auth/login`);
  }
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) return redirect("/auth/login?message=No provider selected");

  const supabase = createClient();

  const redirectUrl = getURL("/auth/callback");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    return redirect("/auth/login?message=Could not authenticate user");
  }

  return redirect(data.url);
}
