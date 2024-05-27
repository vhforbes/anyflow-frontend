import { AuthContextProvider } from "@/contexts/AuthContext";
import { DeployStepsContextProvider } from "@/contexts/DeployStepsContext";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { Toaster } from "react-hot-toast";
import { BugsnagComponent } from "../components/Bugsnag";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BugsnagComponent>
        <LoaderProvider>
          <AuthContextProvider>
            <DeployStepsContextProvider>
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  // Define default options
                  className: "bg-base-100",
                  duration: 2000,
                  style: {
                    background: "#313541",
                    color: "#fff",
                  },

                  // Default options for specific types
                  // success: {
                  //   duration: 3000,
                  // },
                }}
              />
              {children}
            </DeployStepsContextProvider>
          </AuthContextProvider>
        </LoaderProvider>
      </BugsnagComponent>
    </>
  );
}
