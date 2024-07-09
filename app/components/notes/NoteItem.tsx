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

interface Notes {
  note_id: number;
  note_title: string;
  note_description: string;
  is_important: boolean;
  is_archived: boolean;
  inserted_at: string;
}

export function NoteItem({ notes }: { notes: Notes[] }) {
  return (
    <form className="w-full">
      <NoteCard notes={notes} />
    </form>
  );
}

export function NoteCard({ notes }: { notes: Notes[] }) {
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
              <DialogHeader>
                <ScrollArea>
                  <DialogTitle className="w-full flex justify-between items-center py-4 ">
                    <span>{item.note_title}</span>
                    <span className="text-sm font-light">
                      {new Date(item.inserted_at).toLocaleDateString()}
                    </span>
                  </DialogTitle>
                </ScrollArea>
                <DialogDescription>
                  <ScrollArea className="h-[300px]">
                    {item.note_description}
                  </ScrollArea>
                </DialogDescription>
              </DialogHeader>

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
