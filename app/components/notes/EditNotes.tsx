"use client";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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
            id="notes_title"
            disabled={pending}
            minLength={3}
            value={currentData.noteTitle}
            name="notes_title"
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
            name="notes_description"
            value={currentData.noteDescription}
            required
            onChange={handleDescriptionChange}
          />
        </ScrollArea>
      </DialogDescription>
    </>
  );
}
