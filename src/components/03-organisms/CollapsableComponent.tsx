"use client";

import * as React from "react";
import { ChevronDown, ChevronsUpDown, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CollapsibleProps {
  headerChildren: React.ReactNode;
  contentChildren: React.ReactNode;
  className: string;
}

export function CollapsibleComponent({
  headerChildren,
  contentChildren,
  className,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`${className} w-full space-y-2`}
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        {headerChildren}
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronDown className="h-5 w-5" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        {contentChildren}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("w-full space-y-2", className)}
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        {headerChildren}
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2 bg-black">
        <div className="rounded-md border px-4 py-3 font-mono text-sm z-10">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
        {/* {contentChildren} */}
      </CollapsibleContent>
    </Collapsible>
  );
}
