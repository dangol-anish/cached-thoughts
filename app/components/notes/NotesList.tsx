import { createClient } from "@/utils/supabase/server";
// import { NoteItem } from "./NoteItem";
import { Badge } from "@/components/ui/badge";
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
      <div className="w-full">
        <div className="flex gap-3 py-4   ">
          <Badge variant="outline">All</Badge>
          <Badge variant="outline">Archived</Badge>
          <Badge variant="outline">Important</Badge>
        </div>
        <NoteItem notes={notes} />
      </div>
    </>
  );
}
