import DeployStepper from "../03-organisms/DeployStepper";

const DeployStepsLayout = ({
  children,
  currentStep,
}: {
  children: React.ReactNode;
  currentStep: number;
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="mx-auto">
        <DeployStepper currentStep={currentStep} />
      </div>
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default DeployStepsLayout;
