import { StepStatus } from "@/enums/StepStatus";
import { StepIcon } from "../01-atoms/StepIcon";

export const CurrentStep = ({
  status,
  name,
}: {
  status: StepStatus;
  name: string;
}) => (
  <div className="flex flex-col justify-center z-20">
    <div className="w-fit m-auto">
      <StepIcon status={status} />
    </div>
    <p className="mt-4">{name}</p>
  </div>
);
