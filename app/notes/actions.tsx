"use server";

import { Notes } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addNotes(formData: FormData) {
  const supabase = createClient();

}

export async function deleteJournal(){
  
}