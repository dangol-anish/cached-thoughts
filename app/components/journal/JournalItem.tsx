"use client";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
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
import { moodConverter } from "@/utils/moodConverter";

interface Journal {
  journal_id: number;
  journal_title: string;
  highlight_of_the_day: string;
  mood: string;
}

export function JournalItem({ journal }: { journal: Journal[] }) {
  return (
    <form>
      <JournalCard journals={journal} />
    </form>
  );
}

export function JournalCard({ journals }: { journals: Journal[] }) {
  const rowsPerPage = 5;
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

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Highlight Of the Day</TableHead>
            <TableHead>Mood</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {journals.slice(startIndex, endIndex).map((item: Journal) => (
            <TableRow key={item.journal_id}>
              <TableCell>{item.journal_title}</TableCell>
              <TableCell>{item.highlight_of_the_day}</TableCell>
              <TableCell>{moodConverter(item.mood)}</TableCell>
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
  );
}
