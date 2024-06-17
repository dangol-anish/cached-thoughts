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
import { Library } from "lucide-react";

export default function Sidebar() {
  return (
    <>
      <div className="hidden md:flex flex-col w-[300px] min-w-[300px] border-r min-h-screen ">
        <div className="">
          <div className="flex  gap-2 px-6 py-4">
            <Library />

            <p>cachedThoughts</p>
          </div>
        </div>
        <div className="h-full flex flex-grow px-4">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {menuList.map((menu: any, key: number) => (
                <CommandGroup key={key} heading={menu.group}>
                  {menu.items.map((options: any, optionKey: number) => (
                    <CommandItem key={optionKey}>
                      <Link
                        className="flex gap-2 items-center"
                        href={options.link}
                      >
                        <p>{options.icon}</p>
                        <p>{options.text}</p>
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </div>
        <div className="">
          {" "}
          <UserItem />
        </div>
      </div>
    </>
  );
}
