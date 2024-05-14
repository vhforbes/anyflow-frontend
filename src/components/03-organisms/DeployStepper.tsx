import { StepStatus } from "@/enums/StepStatus";
import { CurrentStep } from "../02-molecules/CurrentStep";

const DeployStepper = ({ currentStep }: { currentStep: number }) => {
  // Currently very basic logic with fixed steps.
  // Can increment it to become more compolex, passing the steps names and a custom number of steps

  const setStep = (stepNumber: number) => {
    if (stepNumber <= currentStep) return "step-primary";
  };

  const steps = [
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
  ];

  return (
    <div className="mt-8 flex flex-col justify-start lg:min-w-[1000px]">
      <ul className="flex w-full">
        {steps.map((step, i) => (
          <div
            key={step.name}
            className={`h-[2px] w-full relative right-32 top-5

            ${step.status === "notCompleted" && i !== 0 ? "bg-white" : ""}
            
            ${step.status === "current" && i !== 0 ? "bg-white" : ""}

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
