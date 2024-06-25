"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SquarePen } from "lucide-react";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

const wait = () => new Promise((resolve) => setTimeout(resolve, 300));

function FormContent() {
  const { pending } = useFormStatus();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add a new note</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="col-span-2">
            Title
          </Label>
          <Input
            placeholder="Your Notes Title."
            id="notes_title"
            disabled={pending}
            minLength={3}
            name="notes_title"
            className="col-span-4"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes_description" className="col-span-2">
            Description
          </Label>
          <Textarea
            className="col-span-4 resize-none h-48"
            placeholder="Type your notes here."
            disabled={pending}
            minLength={3}
            name="notes_description"
            required
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={pending}>
          Add
        </Button>
      </DialogFooter>
    </>
  );
}

export function AddNotes() {
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
            // action={async (data) => {
            //   await addJournal(data);
            //   wait().then(() => setOpen(false));
            //   formRef.current?.reset();
            // }}
          >
            <FormContent />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
