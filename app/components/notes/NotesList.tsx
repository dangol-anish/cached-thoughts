import { createClient } from "@/utils/supabase/server";
import { NoteItem } from "./NoteItem";

export async function NotesList() {
  const supabase = await createClient();

  const { data: notes } = await supabase
    .from("notes")
    .select()
    .order("inserted_at", { ascending: false });

  if (!notes) {
    return <div>No notes found.</div>;
  }

  return (
    <>
      <div>
        <NoteItem notes={notes} />
      </div>
    </>
  );
}
