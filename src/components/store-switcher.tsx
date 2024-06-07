"use client";
import { cn } from "@/lib/utils";
import { Store } from "@prisma/client";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useStoreModal } from "../../hook/use-store-modal";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export default function StoreSwitcher({
  items = [],
  className,
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const formattedItem = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItem.find(
    (item) => item.value === params.storeId
  );
  //  what happen when trigger another store
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          variant={"outline"}
          role="combobox"
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
          aria-expanded={open}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="h-4 w-4 ml-auto shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store...." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItem.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 ",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false), storeModal.onOpen();
                }}
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Create store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
