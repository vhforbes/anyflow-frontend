const DeployStepper = ({ currentStep }: { currentStep: number }) => {
  // Currently very basic logic with fixed steps.
  // Can increment it to become more compolex, passing the steps names and a custom number of steps

  const setStep = (stepNumber: number) => {
    if (stepNumber <= currentStep) return "step-primary";
  };

  const steps = [
    {
      name: "Code Provider",
      current: true,
      completed: false,
    },
    {
      name: "Deployment Settings",
      current: false,
      completed: false,
    },
    {
      name: "Deployment Preview",
      current: false,
      completed: true,
    },
    {
      name: "Deployment Status",
      current: false,
      completed: false,
    },
  ];

  return (
    <div className="mt-8 flex flex-col justify-start lg:min-w-[1000px]">
      <ul className="flex w-full">
        {steps.map((step, i) => (
          <div
            key={step.name}
            className={`h-[2px] w-full relative right-32 ${
              step.completed ? "bg-primary" : "bg-white"
            }
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
            {step.current ? <Current /> : null}
            {step.completed && !step.current ? <Completed /> : null}
            {!step.completed && !step.current ? <NotCompleted /> : null}
            <p className="text-center">{step.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Current = () => (
  <div className="">
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="m-2"
    >
      <circle cx="5" cy="5" r="5" fill="#E83664" />
    </svg>
  </div>
);

const NotCompleted = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5" cy="5" r="5" fill="#9E9FA8" />
  </svg>
);

const Completed = () => (
  <svg
    width="17"
    height="15"
    viewBox="0 0 17 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.7953 0.853403L5.24867 10.0667L2.71534 7.36007C2.24867 6.92007 1.51534 6.8934 0.982005 7.26674C0.462005 7.6534 0.315338 8.3334 0.635338 8.88007L3.63534 13.7601C3.92867 14.2134 4.43534 14.4934 5.00867 14.4934C5.55534 14.4934 6.07534 14.2134 6.36867 13.7601C6.84867 13.1334 16.0087 2.2134 16.0087 2.2134C17.2087 0.986737 15.7553 -0.093263 14.7953 0.84007V0.853403Z"
      fill="white"
    />
  </svg>
);

export default DeployStepper;
