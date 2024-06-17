import SidebarMenu from "./SidebarMenu";
import UserItem from "./UserItem";

import { Library } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-[300px] min-w-[300px] border-r min-h-screen">
      <div className="px-6 flex items-center justify-between">
        <div className="flex gap-1 py-4 items-center  justify-center">
          <Library size={24} />
          <p className="text-[20px]">CachedThoughts</p>
        </div>
      </div>
      <div className="h-full flex flex-grow px-4">
        <SidebarMenu />
      </div>
      <div>
        <UserItem />
      </div>
    </div>
  );
}
