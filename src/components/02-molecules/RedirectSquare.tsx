import DiagonalArrow from "../../icons/misc/DiagonalArrow";

const RedirectSquare = ({
  title,
  subtitle,
  className,
  titleClassName,
  IconComponent,
}: {
  title: string;
  subtitle: string;
  IconComponent?: React.ComponentType<any>;
  className?: string;
  titleClassName?: string;
}) => {
  return (
    <div
      className={`${className} flex flex-col justify-between w-96 pb-12 border-2 h-72 bg-blue-0 rounded-lg border-blue-6`}
    >
      <div className="flex justify-end mt-8 pr-7 w-full">
        <DiagonalArrow />
      </div>

      <div className="flex pl-11">
        <div>
          <div className="flex">
            {IconComponent ? (
              <div className="">
                <IconComponent className="mt-2 mr-2" />
              </div>
            ) : null}
            <p className={`${titleClassName} text-4xl font-bold`}>{title}</p>
          </div>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default RedirectSquare;
