import Loader from "@/components/01-atoms/Loader";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { LoaderProvider } from "@/contexts/LoaderContext";
import useLoader from "@/hooks/useLoader";
import { useEffect } from "react";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoaderProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </LoaderProvider>
    </>
  );
}
