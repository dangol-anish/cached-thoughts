"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function emailLogin(formData: FormData) {
  const supabase = createClient();

  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      throw error; // Directly throw the Supabase error
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

  try {
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      options: {
        data: {
          username: formData.get("username") as string,
        },
      },
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
      throw error; // Directly throw the Supabase error
    }

    await supabase.auth.signOut();

    revalidatePath("/", "layout");
    redirect("/auth/login");
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    redirect(`/auth/signup?message=${encodeURIComponent(errorMessage)}`);
  }
}

export async function signOut() {
  const supabase = createClient();

  try {
    await supabase.auth.signOut();
    redirect("/auth/login");
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    redirect(`/auth/login?message=${encodeURIComponent(errorMessage)}`);
  }
}
