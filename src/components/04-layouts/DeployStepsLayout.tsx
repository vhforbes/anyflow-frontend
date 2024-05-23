import DeployStepper from "../03-organisms/DeployStepper";

const DeployStepsLayout = ({
  children,
  currentStep,
}: {
  children: React.ReactNode;
  currentStep: number;
}) => {
  return (
    <div className="flex flex-col items-center mx-auto w-full">
      <div className="mx-auto">
        <DeployStepper currentStep={currentStep} />
      </div>
      <div className="mt-10 w-full h-fit">{children}</div>
    </div>
  );
};

export default DeployStepsLayout;
