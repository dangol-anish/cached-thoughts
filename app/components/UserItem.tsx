import { createClient } from "@/utils/supabase/server";
import { NextPage } from "next";

interface Props {}

const UserItem: NextPage<Props> = async ({}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="outline rounded-sm p-1 outline-slate-400">
      <p>{user?.user_metadata.user_name}</p>
      <p>{user?.email}</p>
    </div>
  );
};

export default UserItem;
