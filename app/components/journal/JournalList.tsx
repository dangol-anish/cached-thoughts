import { Journal } from "@/types/custom";
export type Action = "delete" | "update" | "create";

export type JournalOptimisticUpdate = (action: {
  action: Action;
  journal: Journal;
}) => void;
