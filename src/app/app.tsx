import { AuthContextProvider } from "@/contexts/AuthContext";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { Toaster } from "react-hot-toast";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoaderProvider>
        <AuthContextProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "bg-base-100",
              duration: 30000,
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
        </AuthContextProvider>
      </LoaderProvider>
    </>
  );
}
