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
        <div className="flex-grow">
          <div className="h-screen flex flex-col bg-blue-0 bg-opacity-95">
            <HeaderComponent className="flex md:flex-row flex-col items-center justify-between" />
            <main className="flex flex-1 overflow-auto">
              {/* <Loader /> */}
              {children}
            </main>
          </div>
        </div>
        <FooterComponent />
      </div>
    </>
  );
}
