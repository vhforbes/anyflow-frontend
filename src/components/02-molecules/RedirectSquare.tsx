"use client";

import { ReactNode } from "react";
import DiagonalArrow from "../../icons/misc/DiagonalArrow";
import Link from "next/link";

const RedirectSquare = ({
  title,
  subtitle,
  className,
  titleClassName,
  IconComponent,
  href,
}: {
  title: string;
  subtitle: string;
  IconComponent?: ReactNode;
  className?: string;
  titleClassName?: string;
  href: string;
}) => {
  return (
    <Link href={href}>
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
                <div className="mt-2 mr-2">
                  <>{IconComponent}</>
                </div>
              ) : null}
              <p className={`${titleClassName} text-4xl font-bold`}>{title}</p>
            </div>
            <p>{subtitle}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RedirectSquare;
