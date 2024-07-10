"use client";
import { useFormStatus } from "react-dom";
import { Archive, CircleAlert, EllipsisVertical } from "lucide-react";
import { highlightShortener } from "@/utils/textShortener";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NoteCardList } from "./NoteCardList";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditNotes } from "./EditNotes";

interface Notes {
  note_id: number;
  note_title: string;
  note_description: string;
  is_important: boolean;
  is_archived: boolean;
  inserted_at: string;
}

interface NoteItemProps {
  notes: Notes[];
}

export function NoteItem({ notes }: NoteItemProps) {
  return (
    <form className="w-full">
      <NoteCard notes={notes} />
    </form>
  );
}

interface NoteCardProps {
  notes: Notes[];
}

export function NoteCard({ notes }: NoteCardProps) {
  const { pending } = useFormStatus();

  return (
    <div className="w-full pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {notes.length === 0 ? (
        <p>There are no notes to display.</p>
      ) : (
        notes.map((item: Notes) => (
          <Dialog key={item.note_id}>
            <NoteCardList item={item} />
            <DialogContent className="w-[90%] md:w-full">
              <EditNotes pending={pending} item={item} />
              <DialogFooter className="justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))
      )}
    </div>
  );
}
