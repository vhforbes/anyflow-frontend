"use client";

import { Deployment } from "@/interfaces/DeploymentInterface";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const useTimeElapsed = ({
  createdAt,
  finishedAt,
}: {
  createdAt?: string;
  finishedAt?: string;
}) => {
  const [timeElapsed, setTimeElapsed] = useState<string>();

  useEffect(() => {
    if (!createdAt) return;

    const timer = setInterval(() => {
      const timeElapsedInMili = dayjs().diff(dayjs(createdAt), "millisecond");
      setTimeElapsed(millisToMinutesAndSeconds(timeElapsedInMili));
    }, 1000);

    if (finishedAt) {
      const timeElapsedAfterFinish = dayjs(finishedAt).diff(
        dayjs(createdAt),
        "millisecond"
      );

      setTimeElapsed(millisToMinutesAndSeconds(timeElapsedAfterFinish));
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [createdAt, finishedAt]);

  function millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return { timeElapsed };
};
