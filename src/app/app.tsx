import Loader from "@/components/01-atoms/Loader";
import { AuthContextWrapper } from "@/contexts/AuthContext";
import useLoader from "@/hooks/useLoader";
import { useEffect } from "react";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthContextWrapper>{children}</AuthContextWrapper>
    </>
  );
}
