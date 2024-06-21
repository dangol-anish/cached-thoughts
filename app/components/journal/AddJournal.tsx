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
import { addJournal } from "@/app/journal/action";
import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Smile, Laugh, Meh, Frown, Angry } from "lucide-react";

const wait = () => new Promise((resolve) => setTimeout(resolve, 300));

function FormContent() {
  const { pending } = useFormStatus();
  const [value, setValue] = useState("meh");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add a new journal</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="col-span-2">
            Journal Title
          </Label>
          <Input
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
          <Label htmlFor="username" className="col-span-2">
            Highlight of the Day
          </Label>
          <Textarea
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
          value={value}
          onValueChange={(value) => {
            if (value) setValue(value);
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
        <input type="hidden" name="mood" value={value} />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={pending}>
          Add
        </Button>
      </DialogFooter>
    </>
  );
}

export function AddJournal() {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            {" "}
            <SquarePen />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            ref={formRef}
            action={async (data) => {
              await addJournal(data);
              wait().then(() => setOpen(false));
              formRef.current?.reset();
            }}
          >
            <FormContent />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
