import { Journal } from "@/types/custom";
export type Action = "delete" | "update" | "create";

import { createClient } from "@/utils/supabase/server";
import { JournalItem } from "./JournalItem";

export type JournalOptimisticUpdate = (action: {
  action: Action;
  journal: Journal;
}) => void;

export async function JournalList() {
  const supabase = await createClient();

  const { data: journal } = await supabase
    .from("journal")
    .select()
    .order("inserted_at", { ascending: false });

  if (!journal) {
    return <div>No journals found.</div>;
  }

  return (
    <>
      <JournalItem journal={journal} />
    </>
  );
}
