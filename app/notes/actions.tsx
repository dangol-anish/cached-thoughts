"use server";

import { Notes } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addNotes(formData: FormData) {
  const supabase = createClient();
  const notesTitle = formData.get("notes_title") as string | null;
  const notesDescription = formData.get("notes_description") as string | null;

  if (!notesTitle || !notesDescription) {
    throw new Error("All fields are required");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You are not logged in");
  }

  const { error } = await supabase.from("notes").insert({
    note_title: notesTitle,
    note_description: notesDescription,
    user_id: user.id,
  });

  if (error) {
    throw new Error("Error adding notes");
  }

  revalidatePath("/notes");
}

export async function deleteNotes(note_id: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("notes").delete().match({
    user_id: user.id,
    note_id: note_id,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/notes");
}
