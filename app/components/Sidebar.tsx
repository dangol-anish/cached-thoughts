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

export default function Sidebar() {
  return (
    <>
      <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4">
        <div>
          <UserItem />
        </div>
        <div className="grow">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {menuList.map((menu: any, key: number) => (
                <CommandGroup key={key} heading={menu.group}>
                  {menu.items.map((options: any, optionKey: number) => (
                    <CommandItem key={optionKey}>
                      {options.icon}
                      {options.text}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </div>
        <div>Settings</div>
      </div>
    </>
  );
}
