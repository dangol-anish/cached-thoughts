"use client";
import { ReactNode, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisVertical } from "lucide-react";
import { moodConverter } from "@/utils/moodConverter";
import { formatDate } from "@/utils/formatDate";
import { useFormStatus } from "react-dom";
import { deleteJournal } from "@/app/journal/action";
import { highlightShortener } from "@/utils/textShortener";
import { titleShortener } from "@/utils/titleShortener";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditJournal } from "./EditJournal";
import { ShowJournal } from "./ShowJournal";
import { Dialog } from "@radix-ui/react-dialog";

interface Journal {
  journal_id: number;
  journal_title: string;
  highlight_of_the_day: string;
  mood: string;
  inserted_at: string;
}

export function JournalItem({ journal }: { journal: Journal[] }) {
  return (
    <form className="w-full">
      <JournalCard journals={journal} />
    </form>
  );
}

export function JournalCard({ journals }: { journals: Journal[] }) {
  const { pending } = useFormStatus();

  const rowsPerPage = 8;
  const [startIndex, setStartIndex] = useState(0);

  const endIndex = startIndex + rowsPerPage;

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - rowsPerPage);
    }
  };

  const handleNext = () => {
    if (endIndex < journals.length) {
      setStartIndex(startIndex + rowsPerPage);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJournal(id);
    } catch (error) {
      console.error("Failed to delete journal", error);
    }
  };

  return (
    <>
      {journals.length === 0 ? (
        <p className="text-center my-4">There are no journals to display.</p>
      ) : (
        <>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Date</TableHead>
                <TableHead className="w-[15%]">Title</TableHead>
                <TableHead className="w-[45%]">Highlight Of the Day</TableHead>
                <TableHead className="w-[10%]">Mood</TableHead>
                <TableHead className="w-[5%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {journals.slice(startIndex, endIndex).map((item: Journal) => (
                <TableRow key={item.journal_id}>
                  <TableCell>{formatDate(item.inserted_at)}</TableCell>
                  <TableCell>{titleShortener(item.journal_title)}</TableCell>
                  <TableCell>
                    {highlightShortener(item.highlight_of_the_day)}
                  </TableCell>
                  <TableCell>{moodConverter(item.mood)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/* <DropdownMenuItem> */}
                        <ShowJournal item={item} />
                        {/* </DropdownMenuItem> */}

                        <DropdownMenuItem>
                          <EditJournal />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={pending}
                          onClick={() => handleDelete(item.journal_id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePrevious} />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={handleNext} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </>
  );
}
