"use server";

import { Journal } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addJournal(formData: FormData) {
  const supabase = createClient();
  const journalTitle = formData.get("journal_title") as string | null;
  const highlightOfTheDay = formData.get("highlight_of_the_day") as
    | string
    | null;
  const mood = formData.get("mood") as string | null;

  if (!journalTitle || !highlightOfTheDay || !mood) {
    throw new Error("All fields are required");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You are not logged in");
  }

  const { error } = await supabase.from("journal").insert({
    journal_title: journalTitle,
    highlight_of_the_day: highlightOfTheDay,
    mood: mood,
    user_id: user.id,
  });

  if (error) {
    throw new Error("Error adding journal");
  }

  revalidatePath("/journal");
}
