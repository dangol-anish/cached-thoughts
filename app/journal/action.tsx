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

export async function deleteJournal(journal_id: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("journal").delete().match({
    user_id: user.id,
    journal_id: journal_id,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/journal");
}

export async function updateJournal(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const journalTitle = formData.get("journal_title") as string | null;
  const highlightOfTheDay = formData.get("highlight_of_the_day") as
    | string
    | null;
  const mood = formData.get("mood") as string | null;
  const journalId = formData.get("journal_id") as number | null;

  if (!journalTitle || !highlightOfTheDay || !mood) {
    throw new Error("All fields are required");
  }

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase
    .from("journal")
    .update({
      journal_title: journalTitle,
      highlight_of_the_day: highlightOfTheDay,
      mood: mood,
    })
    .match({
      user_id: user.id,
      journal_id: journalId,
    });

  if (error) {
    throw new Error("Error updating task");
  }

  revalidatePath("/journal");
}
