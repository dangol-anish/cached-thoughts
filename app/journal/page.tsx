import { NextPage } from "next";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Book } from "lucide-react";

import { AddJournal } from "../components/journal/AddJournal";

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between pb-4">
        <div className="flex flex-col items-start    items ">
          <div className="flex items-center gap-2 ">
            <Book size={28} />
            <p className="h-[10%] text-[28px]">Journal</p>
          </div>

          <span className="text-[14px] text-slate-700 ">
            Reflect upon your day
          </span>
        </div>

        <AddJournal />
      </div>
      <Separator />
      <div className="h-[90%] flex justify-center items-center"></div>
    </div>
  );
};

export default Page;
