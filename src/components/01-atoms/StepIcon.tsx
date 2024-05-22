import { StepStatus } from "@/enums/StepStatus";
import { ReactNode } from "react";

export const StepIcon = ({
  status = StepStatus.Current,
}: {
  status: StepStatus;
}): ReactNode => {
  return (
    <>
      {status === StepStatus.Current && (
        <div className="bg-white rounded-full p-[2px]">
          <div className="rounded-full border-2 border-primary m-1 p-2">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="5" r="5" fill="#E83664" />
            </svg>
          </div>
        </div>
      )}

      {status === StepStatus.NotCompleted && (
        <div className="bg-white rounded-full p-3 border-2 border-blue-8">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="5" cy="5" r="5" fill="#9E9FA8" />
          </svg>
        </div>
      )}

      {status === StepStatus.Completed && (
        <div className="bg-primary p-3 rounded-full">
          <svg
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.7953 0.853403L5.24867 10.0667L2.71534 7.36007C2.24867 6.92007 1.51534 6.8934 0.982005 7.26674C0.462005 7.6534 0.315338 8.3334 0.635338 8.88007L3.63534 13.7601C3.92867 14.2134 4.43534 14.4934 5.00867 14.4934C5.55534 14.4934 6.07534 14.2134 6.36867 13.7601C6.84867 13.1334 16.0087 2.2134 16.0087 2.2134C17.2087 0.986737 15.7553 -0.093263 14.7953 0.84007V0.853403Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </>
  );
};
