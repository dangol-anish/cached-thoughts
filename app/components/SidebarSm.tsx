import UserItem from "./UserItem";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { menuList } from "./MenuList";
import Link from "next/link";
import { ArrowRight, Library, LogOut, PanelLeftOpen } from "lucide-react";

export default function SidebarSm() {
  return (
    <>
      <div className="flex md:hidden flex-col w-[50px] min-w-[50px] border-r min-h-screen  ">
        <div className="">
          <div className="flex justify-center py-4">
            <PanelLeftOpen size={20} />
          </div>
        </div>
        <div className="grow ">
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
        <div className="border-t-[1px] py-2 outline-slate-400  flex justify-center">
          {" "}
          <LogOut size={20} />
        </div>
      </div>
    </>
  );
}
