import { NextPage } from "next";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimerCard } from "../components/pomodoro/TimerCard";
import { Progress } from "@/components/ui/progress";

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
        <p className="h-[10%] text-[20px]">Pomodoro</p>
        <div className="h-[90%] flex justify-center ">
          <TimerCard />
        </div>
      </div>
    </>
  );
};

export default Page;
