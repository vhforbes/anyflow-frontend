"use client";

import { AuthContextWrapper } from "@/contexts/AuthContext";
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
