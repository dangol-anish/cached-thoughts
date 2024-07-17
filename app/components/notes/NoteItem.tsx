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
import { useRef, useState } from "react";
import { updateNotes } from "@/app/notes/actions";

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

const wait = () => new Promise((resolve) => setTimeout(resolve, 300));

interface NoteCardProps {
  notes: Notes[];
}

interface EditNotesProps {
  pending: boolean;
  item: {
    note_id: number;
    note_title: string;
    note_description: string;
    is_important: boolean;
    is_archived: boolean;
    inserted_at: string;
  };
}

export function EditNotes({ pending, item }: EditNotesProps) {
  const [currentData, setCurrentData] = useState({
    noteId: item.note_id,
    noteTitle: item.note_title,
    noteDescription: item.note_description,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentData({
      ...currentData,
      noteTitle: e.target.value,
    });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurrentData({
      ...currentData,
      noteDescription: e.target.value,
    });
  };

  return (
    <>
      <DialogHeader className="w-full">
        <DialogTitle className="flex w-full justify-between items-center py-4 ">
          <Input
            placeholder="Your Notes Title."
            id="noteTitle"
            disabled={pending}
            minLength={3}
            value={currentData.noteTitle}
            name="noteTitle"
            className="w-[80%]"
            required
            onChange={handleTitleChange}
          />
          <span className="text-sm font-light">
            {new Date(item.inserted_at).toLocaleDateString()}
          </span>
        </DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <ScrollArea className="h-[300px]">
          <Textarea
            className="col-span-4 resize-none h-[300px]"
            placeholder="Type your notes here."
            disabled={pending}
            minLength={3}
            name="noteDescription"
            value={currentData.noteDescription}
            required
            onChange={handleDescriptionChange}
          />
        </ScrollArea>
        <input type="hidden" name="noteId" value={currentData.noteId} />
      </DialogDescription>
      <DialogFooter className="justify-end">
        <Button type="submit" disabled={pending}>
          Update
        </Button>
      </DialogFooter>
    </>
  );
}

export function NoteCard({ notes }: NoteCardProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {notes.length === 0 ? (
        <p>There are no notes to display.</p>
      ) : (
        notes.map((item: Notes) => (
          <Dialog key={item.note_id}>
            <NoteCardList item={item} />
            <DialogContent className="w-[90%] md:w-full">
              <form
                ref={formRef}
                action={async (data) => {
                  await updateNotes(data);
                  wait().then(() => setOpen(false));
                  formRef.current?.reset();
                }}
              ></form>
              <EditNotes pending={pending} item={item} />
            </DialogContent>
          </Dialog>
        ))
      )}
    </div>
  );
}
