import { NextPage } from "next";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { TimerCard } from "../components/pomodoro/TimerCard";
import { Timer } from "lucide-react";

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
    <>
      <div className="h-full">
        <div className="flex flex-col items-start    items pb-4">
          <div className="flex items-center gap-2 ">
            {" "}
            <Timer size={28} />
            <span className="h-[10%] text-[28px]">Pomodoro</span>
          </div>

          <span className="text-[14px] text-slate-700 ">
            Structured Work Intervals with Pomodoro
          </span>
        </div>
        <Separator />
        <div className="h-[90%] flex justify-center items-center">
          <TimerCard />
        </div>
      </div>
    </>
  );
};

export default Page;
