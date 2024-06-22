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

export function EditJournal({
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
          Edit
        </DialogTrigger>
        <DialogContent>Content 2</DialogContent>
      </Dialog>
    </>
  );
}
