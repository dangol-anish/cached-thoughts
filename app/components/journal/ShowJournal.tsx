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

interface JournalItem {
  journal_title: string;
  highlight_of_the_day: string;
  mood: string;
}

export function ShowJournal({
  item,
  isShowOpen,
  isEditOpen,
  setIsShowOpen,
  setIsEditOpen,
}: {
  item: JournalItem;
  isShowOpen: boolean;
  isEditOpen: boolean;
  setIsShowOpen: (open: boolean) => void;
  setIsEditOpen: (open: boolean) => void;
}) {
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
