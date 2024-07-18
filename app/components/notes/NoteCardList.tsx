import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { highlightShortener } from "@/utils/textShortener";
import { Archive, CircleAlert, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteNotes } from "@/app/notes/actions";
import { useFormStatus } from "react-dom";
import { DialogTrigger } from "@/components/ui/dialog";
import { ShowNotes } from "./ShowNotes";

interface Notes {
  note_id: number;
  note_title: string;
  note_description: string;
  is_important: boolean;
  is_archived: boolean;
  inserted_at: string;
}

export function NoteCardList({ item }: { item: Notes }) {
  const { pending } = useFormStatus();

  return (
    <>
      <DialogTrigger asChild>
        <Card
          key={item.note_id}
          className="flex flex-col h-full mb-5 cursor-pointer"
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{highlightShortener(item.note_title, 3)}</span>
              <span className="text-sm font-light">
                {new Date(item.inserted_at).toLocaleDateString()}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <CardDescription className="text-left">
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
                  {/* <DropdownMenuItem
                    className="hover:cursor-pointer"
                    disabled={pending}
                    onClick={() => handleDelete(item.note_id)}
                  >
                    Delete
                  </DropdownMenuItem> */}
                  <ShowNotes />
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </CardFooter>
        </Card>
      </DialogTrigger>
    </>
  );
}
