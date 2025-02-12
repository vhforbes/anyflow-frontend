import RedirectSquare from "@/components/02-molecules/RedirectSquare";
import RocketIcon from "@/icons/fun/RocketIcon";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex">
        <RedirectSquare
          className="md:mr-6"
          titleClassName="text-primary"
          title="Start Main"
          subtitle="Here you start the main deployment. Couch!"
          IconComponent={<RocketIcon />}
          href="/deploy-steps/01-code-provider"
        />

        <RedirectSquare
          title="Start Test"
          subtitle="Here you start just a test, don't worry!"
          href=""
        />
      </div>
    </div>
  );
}
