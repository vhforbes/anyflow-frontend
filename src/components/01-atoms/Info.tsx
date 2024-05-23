import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export function Info({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <InfoIcon width={16} />
        </TooltipTrigger>
        <TooltipContent className="bg-blue-0 bg-opacity-100 border-blue-6">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
