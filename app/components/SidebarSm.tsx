import { Library, LogOut, PanelLeftOpen } from "lucide-react";
import { signOut } from "../auth/actions";
import { Button } from "@/components/ui/button";
import { SidebarMenuSm } from "./SidebarMenuSm";

export default function SidebarSm() {
  return (
    <div className="flex md:hidden flex-col w-[50px] min-w-[50px] border-r min-h-screen">
      <div className="flex justify-center py-4">
        <Library size={20} />
      </div>
      <div className="grow">
        <SidebarMenuSm />
      </div>
      <form
        action={signOut}
        className="border-t-[1px] py-2 outline-slate-400 flex justify-center"
      >
        <Button className="bg-white text-slate-950 p-0 hover:bg-white">
          {" "}
          <LogOut size={20} />
        </Button>
      </form>
    </div>
  );
}
