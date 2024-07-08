"use client";
import { useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Archive, CircleAlert, EllipsisVertical } from "lucide-react";
import { highlightShortener } from "@/utils/textShortener";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteNotes } from "@/app/notes/actions";

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

  const handleDelete = async (id: number) => {
    try {
      await deleteNotes(id);
    } catch (error) {
      console.error("Failed to delete notes", error);
    }
  };

  return (
    <div className="w-full pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {notes.length === 0 ? (
        <p>There are no notes to display.</p>
      ) : (
        notes.map((item: Notes) => (
          <Card key={item.note_id} className="flex flex-col h-full mb-5">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{item.note_title}</span>
                <span className="text-sm font-thin">
                  {new Date(item.inserted_at).toLocaleDateString()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <CardDescription>
                {highlightShortener(item.note_description, 30)}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end items-center gap-3">
              <span>{item.is_important ? <CircleAlert size={18} /> : ""}</span>
              <span>{item.is_archived ? <Archive size={18} /> : ""}</span>
              <span>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical size={18} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col text-sm">
                    <DropdownMenuItem
                      className="hover:cursor-pointer"
                      disabled={pending}
                      onClick={() => handleDelete(item.note_id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
