"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { menuList } from "./MenuList";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarMenu = ({}) => {
  const pathname = usePathname();
  return (
    <div>
      <Command>
        <CommandList>
          <CommandEmpty>...</CommandEmpty>
          {menuList.map((menu: any, key: number) => (
            <CommandGroup key={key} heading={menu.group}>
              {menu.items.map((options: any, optionKey: number) => (
                <Link key={optionKey} href={options.link}>
                  <CommandItem
                    className={`flex gap-2 items-center hover:cursor-pointer  ${
                      pathname === options.link ? "bg-slate-200 rounded-sm" : ""
                    }`}
                    key={optionKey}
                  >
                    <p>{options.icon}</p>
                    <p>{options.text}</p>
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </div>
  );
};

export default SidebarMenu;
