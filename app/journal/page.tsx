import { NextPage } from "next";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Book } from "lucide-react";

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
      <div className="flex items-center gap-2 justify-center pb-4">
        <Book size={20} />
        <span className="h-[10%] text-[20px]">Journal</span>
      </div>
      <Separator />
      <div className="h-[90%] flex justify-center items-center">hello</div>
    </div>
  );
};

export default Page;
