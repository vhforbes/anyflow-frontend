"use client";

import "../../styles/bg.css";
import HeaderComponent from "../03-organisms/Header";
import FooterComponent from "../03-organisms/Footer";
import RootLayout from "@/app/layout";
import Loader from "../01-atoms/Loader";
import useLoader from "@/hooks/useLoader";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="bottom-0 left-0 w-full h-full fixed top-0 pattern"></div>
        <HeaderComponent />
        <main className="flex-grow bg-opacity-90 bg-base-200 relative">
          <Loader />
          {children}
        </main>
        <FooterComponent />
      </div>
    </>
  );
}
