"use client";
import { Button } from "@/components/ui/button";
import { type Editor } from "@tiptap/react";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-5">
      <Button type="button">H1</Button>
    </div>
  );
};
