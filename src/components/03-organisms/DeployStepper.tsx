const DeployStepper = ({ currentStep }: { currentStep: number }) => {
  // Currently very basic logic with fixed steps.
  // Can increment it to become more compolex, passing the steps names and a custom number of steps

  const setStep = (stepNumber: number) => {
    if (stepNumber <= currentStep) return "step-primary";
  };

  return (
    <ul className="steps steps-vertical sm:min-w-[400px] sm:steps-horizontal">
      <li className={`step ${setStep(1)}`}>Provider</li>
      <li className={`step ${setStep(2)}`}>Settings</li>
      <li className={`step ${setStep(3)}`}>Status</li>
    </ul>
  );
};

export default DeployStepper;
