import { NextPage } from "next";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Notebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
            <Notebook size={28} />
            <p className="h-[10%] text-[28px]">Notes</p>
          </div>

          <span className="text-[14px] text-slate-700 ">
            Concise records of key information
          </span>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Page;
