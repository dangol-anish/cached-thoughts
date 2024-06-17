import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { menuList } from "./MenuList";
import Link from "next/link";
import { Library, LogOut, PanelLeftOpen } from "lucide-react";
import { signOut } from "../auth/actions";
import { Button } from "@/components/ui/button";

export default function SidebarSm() {
  return (
    <div className="flex md:hidden flex-col w-[50px] min-w-[50px] border-r min-h-screen">
      <div className="flex justify-center py-4">
        <Library size={20} />
      </div>
      <div className="grow">
        <Command>
          <CommandList>
            <CommandEmpty>...</CommandEmpty>
            {menuList.map((menu: any, key: number) => (
              <CommandGroup className="pb-4" key={key}>
                {menu.items.map((options: any, optionKey: number) => (
                  <CommandItem key={optionKey}>
                    <Link className="flex justify-center" href={options.link}>
                      {options.icon}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
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
