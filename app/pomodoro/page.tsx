import { NextPage } from "next";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { TimerCard } from "../components/pomodoro/TimerCard";

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
        <p className="h-[20%] text-[20px]">Pomodoro</p>
        <div className="h-[80%] flex justify-center ">
          <TimerCard />
        </div>
      </div>
    </>
  );
};

export default Page;
