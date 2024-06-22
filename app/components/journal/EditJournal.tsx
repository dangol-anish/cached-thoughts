"use client";
import { Journal } from "@/types/custom";
import { useFormStatus } from "react-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { JournalOptimisticUpdate } from "./JournalList";
import { useRef, useState } from "react";
import { addJournal, updateJournal } from "@/app/journal/action";
import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Smile, Laugh, Meh, Frown, Angry } from "lucide-react";
import { moodConverter } from "@/utils/moodConverter";

const wait = () => new Promise((resolve) => setTimeout(resolve, 300));

interface JournalItem {
  journal_id: number;
  journal_title: string;
  highlight_of_the_day: string;
  mood: string;
}

function FormContent({ item }: { item: JournalItem }) {
  const { pending } = useFormStatus();
  const [formData, setFormData] = useState(item);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMoodChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      mood: value,
    }));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit journal</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="journal_title" className="col-span-2">
            Journal Title
          </Label>
          <Input
            value={formData.journal_title}
            onChange={handleChange}
            placeholder="Your Journal Title."
            id="journal_title"
            disabled={pending}
            minLength={3}
            name="journal_title"
            className="col-span-4"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="highlight_of_the_day" className="col-span-2">
            Highlight of the Day
          </Label>
          <Textarea
            value={formData.highlight_of_the_day}
            onChange={handleChange}
            className="col-span-4 resize-none h-48"
            placeholder="Type your highlight here."
            disabled={pending}
            minLength={3}
            name="highlight_of_the_day"
            required
          />
        </div>
        <ToggleGroup
          type="single"
          value={formData.mood}
          onValueChange={(value) => {
            if (value) handleMoodChange(value);
          }}
        >
          <ToggleGroupItem value="angry" aria-label="Toggle angry">
            <Angry />
          </ToggleGroupItem>
          <ToggleGroupItem value="frown" aria-label="Toggle frown">
            <Frown />
          </ToggleGroupItem>
          <ToggleGroupItem value="meh" aria-label="Toggle meh">
            <Meh />
          </ToggleGroupItem>
          <ToggleGroupItem value="smile" aria-label="Toggle smile">
            <Smile />
          </ToggleGroupItem>
          <ToggleGroupItem value="laugh" aria-label="Toggle laugh">
            <Laugh />
          </ToggleGroupItem>
        </ToggleGroup>
        <input type="hidden" name="mood" value={formData.mood} />
        <input type="hidden" name="journal_id" value={formData.journal_id} />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={pending}>
          Update
        </Button>
      </DialogFooter>
    </>
  );
}

export function EditJournal({ item }: { item: JournalItem }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="text-left pl-2 p-2 hover:bg-slate-100 rounded-md">
          Edit
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            ref={formRef}
            action={async (data) => {
              await updateJournal(data);
              wait().then(() => setOpen(false));
              formRef.current?.reset();
            }}
          >
            <FormContent item={item} />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
