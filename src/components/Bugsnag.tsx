"use client";

import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import React from "react";

export const BugsnagComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const bugsnagApiKey = process.env.NEXT_PUBLIC_BUGSNAG_API_KEY;

  if (!bugsnagApiKey) {
    console.error("No bugsnag api key found");
    return;
  }

  Bugsnag.start({
    apiKey: bugsnagApiKey,
    plugins: [new BugsnagPluginReact(React)],
  });

  const ErrorBoundary = Bugsnag.getPlugin("react");

  if (!ErrorBoundary) return <>Null</>;

  const ErrorComponent = ErrorBoundary.createErrorBoundary();

  const ErrorScreen = ({ clearError }: { clearError: any }) => (
    <div>
      <h1>⚠️ Error ⚠️</h1>
      <p>
        <strong>Uh oh, there was an error in the component tree!</strong>
      </p>
      <button onClick={clearError}>Reset</button>
    </div>
  );

  const onError = (event: any) => {
    console.log("about to send this event", { event });
  };

  return (
    <ErrorComponent FallbackComponent={ErrorScreen} onError={onError}>
      {children}
    </ErrorComponent>
  );
};
