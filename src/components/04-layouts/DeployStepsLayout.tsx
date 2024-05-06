import DeployStepper from "../03-organisms/DeployStepper";

const DeployStepsLayout = ({
  children,
  currentStep,
}: {
  children: React.ReactNode;
  currentStep: number;
}) => {
  return (
    <main>
      <div className="flex justify-center sm:mt-10">
        <DeployStepper currentStep={currentStep} />
      </div>
      <div className="mt-10">{children}</div>
    </main>
  );
};

export default DeployStepsLayout;
