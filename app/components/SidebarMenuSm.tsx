"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { menuList } from "./MenuList";
import Link from "next/link";
import { usePathname } from "next/navigation";
export async function SidebarMenuSm() {
  const pathname = usePathname();
  return (
    <Command>
      <CommandList>
        <CommandEmpty>...</CommandEmpty>
        {menuList.map((menu: any, key: number) => (
          <CommandGroup className="pb-4" key={key}>
            {menu.items.map((options: any, optionKey: number) => (
              <Link href={options.link}>
                <CommandItem
                  className={`flex gap-2 items-center hover:cursor-pointer  ${
                    pathname === options.link ? "bg-slate-200 rounded-sm" : ""
                  }`}
                  key={optionKey}
                >
                  {options.icon}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
}
