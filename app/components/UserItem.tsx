import { createClient } from "@/utils/supabase/server";
import { LogOut } from "lucide-react";
import { NextPage } from "next";

interface Props {}

const UserItem: NextPage<Props> = async ({}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="border-t-[1px] px-4 outline-slate-400 text-sm py-2 flex justify-between items-center">
      <div>
        {" "}
        <p>{user?.user_metadata.user_name}</p>
        <p className="text-[12px] text-slate-500">{user?.email}</p>
      </div>
      <LogOut size={20} />
    </div>
  );
};

export default UserItem;
