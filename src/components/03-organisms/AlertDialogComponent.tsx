import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { InfoIcon, RocketIcon, X } from "lucide-react";
import { NavigateButton } from "../01-atoms/NavigateButton";

export const AlertDialogComponent = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="bg-white text-blue-0 max-w-lg px-11">
        <div className="w-full text-right absolute">
          <AlertDialogCancel className="border-none bg-transparent hover:bg-transparent">
            <X width={17} strokeWidth={3} className=" fill-black"></X>
          </AlertDialogCancel>
        </div>
        <AlertDialogHeader className="flex ">
          <div className="flex flex-col w-full justify-between items-center">
            <InfoIcon width={20} strokeWidth={2} className="stroke-primary" />
            <AlertDialogTitle className="mt-4 font-bold">
              Are you ready to launch?
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-center">
            This action will run your deploy scripts on all the selected
            blockchains. Once this process starts, it cannot be stopped or
            reversed. Please ensure that all settings and configurations are
            correct before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center items-center w-full">
            <AlertDialogCancel className="w-28 mr-3 mt-0 border-blue-0">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => onClick && onClick()}
              className="text-white w-28"
            >
              <RocketIcon width={17} className="mr-2" />
              Publish
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
