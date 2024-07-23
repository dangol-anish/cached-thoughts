import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NoteItem } from "./NoteItem";

interface NoteItem {
  note_title: string;
  note_description: string;
}

export function ShowNotes({ item }: { item: NoteItem }) {
  return (
    <>
      <Dialog>
        <DialogTrigger className="text-left pl-2 p-2 hover:bg-slate-100 rounded-md">
          Show
        </DialogTrigger>

        <DialogContent className="p-10">
          <DialogHeader>
            <DialogTitle className="flex">
              <ScrollArea className="h-[55px] mb-5">
                {item.note_title}
              </ScrollArea>
            </DialogTitle>
            <DialogDescription>
              <ScrollArea className="h-[300px]">
                {item.note_description}
              </ScrollArea>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
