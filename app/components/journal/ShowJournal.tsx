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
import { moodConverter } from "@/utils/moodConverter";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface JournalItem {
  journal_title: string;
  highlight_of_the_day: string;
  mood: string;
}

export function ShowJournal({ item }: { item: JournalItem }) {
  return (
    <>
      <Dialog>
        <DialogTrigger className="text-sm pl-2 w-full hover:bg-slate-100 text-left py-1 rounded-md">
          Show
        </DialogTrigger>
        <DialogContent className="p-10">
          <DialogHeader>
            <DialogTitle className="flex">
              <ScrollArea className="h-[55px] mb-5">
                {item.journal_title}
              </ScrollArea>
            </DialogTitle>
            <DialogDescription>
              <ScrollArea className="h-[300px]">
                {item.highlight_of_the_day}
              </ScrollArea>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>{moodConverter(item.mood)}</DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
