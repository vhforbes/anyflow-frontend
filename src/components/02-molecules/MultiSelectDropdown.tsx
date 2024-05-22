"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Item } from "@radix-ui/react-select";
import { useCallback, useEffect, useRef, useState } from "react";

type Framework = Record<"value" | "label", string>;

const FRAMEWORKS: Framework[] = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "wordpress",
    label: "WordPress",
  },
  {
    value: "express.js",
    label: "Express.js",
  },
  {
    value: "nest.js",
    label: "Nest.js",
  },
  {
    value: "nestx.js",
    label: "Nestx.js",
  },
  {
    value: "nesty.js",
    label: "Nesty.js",
  },
  {
    value: "nesta.js",
    label: "Nesta.js",
  },
];

interface Item {
  id: string;
  value: string;
  available?: boolean;
}

export const MultiSelectDropdown = ({
  items,
  handleSelection,
}: {
  items?: Item[];
  handleSelection: (id: number) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Item[]>();
  const [selectables, setSelactables] = useState<Item[]>();
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback((item: Item) => {
    setSelected((prev) => prev?.filter((s) => s.value !== item.value));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      return;

      // Ripped off functionality of deleting with backspace
      // (wasn't able to manage state via handleSelection(prop) with it)

      // const input = inputRef.current;
      // if (input) {
      //   if (e.key === "Delete" || e.key === "Backspace") {
      //     if (input.value === "") {
      //       setSelected((prev) => {
      //         if (prev) {
      //           const newSelected = [...prev];
      //           newSelected.pop();
      //           return newSelected;
      //         }
      //       });
      //     }
      //   }
      //   // This is not a default behaviour of the <input /> field
      //   if (e.key === "Escape") {
      //     input.blur();
      //   }
      // }
    },
    []
  );

  useEffect(() => {}, [selected]);

  useEffect(() => {
    const selectables = items?.filter(
      (item) =>
        !selected?.some((selectedItem) => selectedItem.value === item.value)
    );

    setSelactables(selectables);
  }, [selected, items]);

  if (!items) return null;

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-blue-6 px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected?.map((item) => {
            return (
              <Badge key={item.value} variant="white">
                {item.value}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                ></button>
                <button
                  onClick={() => {
                    handleSelection(parseInt(item.id));
                    handleUnselect(item);
                  }}
                >
                  X
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            // placeholder={}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1 cursor-pointer"
          />
          <div className="mt-1">
            <ArrowDown />
          </div>
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList className="h-full overflow-auto bg-blue-0">
              {selectables?.map((selectable) => {
                return (
                  <CommandItem
                    // onClick={() => handleSelection(parseInt(selectable.id))}
                    key={selectable.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      handleSelection(parseInt(selectable.id));
                      setInputValue("");
                      setSelected((prev) => {
                        if (prev) return [...prev, selectable];
                        if (!prev) return [selectable];
                      });
                    }}
                    className={"cursor-pointer"}
                    disabled={!selectable.available}
                  >
                    <div className="w-full flex">
                      <div>
                        <p>{selectable.value}</p>
                        <p>{selectable.id}</p>
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandList>
          </div>
        ) : null}
      </div>
    </Command>
  );
};

const ArrowDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-down h-4 w-4"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);
