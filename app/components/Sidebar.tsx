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

export default function Sidebar() {
  return (
    <>
      <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4">
        <div className=""></div>
        <div className="h-full flex flex-grow">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {menuList.map((menu: any, key: number) => (
                <CommandGroup key={key} heading={menu.group}>
                  {menu.items.map((options: any, optionKey: number) => (
                    <CommandItem key={optionKey}>
                      <Link href={options.link}>
                        {" "}
                        {options.icon}
                        {options.text}
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </div>
        <div className="flex-grow-0">
          {" "}
          <UserItem />
        </div>
      </div>
    </>
  );
}
