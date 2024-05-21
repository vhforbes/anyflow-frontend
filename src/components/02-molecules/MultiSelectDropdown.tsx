"use client";

import * as React from "react";
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
}

export const MultiSelectDropdown = ({ items }: { items?: Item[] }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Item[]>();
  const [selectables, setSelactables] = React.useState<Item[]>();
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((item: Item) => {
    setSelected((prev) => prev?.filter((s) => s.value !== item.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              if (prev) {
                const newSelected = [...prev];
                newSelected.pop();
                return newSelected;
              }
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  React.useEffect(() => {
    const selectables = items?.filter((item) => !selected?.includes(item));

    setSelactables(selectables);
  }, [items]);

  console.log(selectables);
  // console.log(items);

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
                >
                  {/* <X className="h-3 w-3 text-muted-foreground hover:text-foreground" /> */}
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
                    key={selectable.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("");
                      setSelected((prev) => {
                        if (prev) return [...prev, selectable];
                      });
                    }}
                    className={"cursor-pointer"}
                  >
                    <p>{selectable.value}</p>
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
