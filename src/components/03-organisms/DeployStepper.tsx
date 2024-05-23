import { StepStatus } from "@/enums/StepStatus";
import { CurrentStep } from "../02-molecules/CurrentStep";
import { useEffect, useState } from "react";

const DeployStepper = ({ currentStep }: { currentStep: number }) => {
  const [steps, setSteps] = useState<
    {
      name: string;
      status: StepStatus;
    }[]
  >();

  useEffect(() => {
    switch (currentStep) {
      case 1:
        setSteps([
          {
            name: "Code Provider",
            status: StepStatus.Current,
          },
          {
            name: "Deployment Settings",
            status: StepStatus.NotCompleted,
          },
          {
            name: "Deployment Preview",
            status: StepStatus.NotCompleted,
          },
          {
            name: "Deployment Status",
            status: StepStatus.NotCompleted,
          },
        ]);

        break;

      case 2:
        setSteps([
          {
            name: "Code Provider",
            status: StepStatus.Completed,
          },
          {
            name: "Deployment Settings",
            status: StepStatus.Current,
          },
          {
            name: "Deployment Preview",
            status: StepStatus.NotCompleted,
          },
          {
            name: "Deployment Status",
            status: StepStatus.NotCompleted,
          },
        ]);

        break;

      case 3:
        setSteps([
          {
            name: "Code Provider",
            status: StepStatus.Completed,
          },
          {
            name: "Deployment Settings",
            status: StepStatus.Completed,
          },
          {
            name: "Deployment Preview",
            status: StepStatus.Current,
          },
          {
            name: "Deployment Status",
            status: StepStatus.NotCompleted,
          },
        ]);

        break;

      case 4:
        setSteps([
          {
            name: "Code Provider",
            status: StepStatus.Completed,
          },
          {
            name: "Deployment Settings",
            status: StepStatus.Completed,
          },
          {
            name: "Deployment Preview",
            status: StepStatus.Completed,
          },
          {
            name: "Deployment Status",
            status: StepStatus.Current,
          },
        ]);

        break;

      case 5:
        setSteps([
          {
            name: "Code Provider",
            status: StepStatus.Completed,
          },
          {
            name: "Deployment Settings",
            status: StepStatus.Completed,
          },
          {
            name: "Deployment Preview",
            status: StepStatus.Completed,
          },
          {
            name: "Deployment Status",
            status: StepStatus.Completed,
          },
        ]);

        break;

      default:
        break;
    }
  }, [currentStep]);

  if (!steps) return null;

  return (
    <div className="mt-8 flex flex-col justify-start lg:min-w-[1000px]">
      <ul className="flex w-full">
        {steps.map((step, i) => (
          <div
            key={step.name}
            className={`h-[2px] w-full relative right-32 top-5

            ${step.status === "notCompleted" && i !== 0 ? "bg-white" : ""}
            
            ${step.status === "current" && i !== 0 ? "bg-primary" : ""}

            ${step.status === "completed" ? "bg-primary" : ""}

            ${i === 0 ? "bg-transparent" : ""}
            `}
          ></div>
        ))}
      </ul>

      <ul className="flex justify-between">
        {steps.map((step) => (
          <li
            key={step.name}
            className="flex flex-col w-full justify-center items-center"
          >
            <CurrentStep status={step.status} name={step.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeployStepper;
