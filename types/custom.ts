import { Database } from "./supabase";

export type Journal = Database["public"]["Tables"]["journal"];

export type Notes = Database["public"]["Tables"]["notes"];
