"use client";

import "../../styles/bg.css";
import HeaderComponent from "../03-organisms/Header";
import FooterComponent from "../03-organisms/Footer";
import Loader from "../01-atoms/Loader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex-grow">
        <div className="h-screen flex flex-col">
          <div className="bottom-0 left-0 w-full h-full absolute top-0 pattern"></div>
          <HeaderComponent className="flex md:flex-row flex-col items-center justify-between" />
          <main className="flex flex-col flex-1 relative bg-blue-0 bg-opacity-95">
            <Loader />
            {children}
            <FooterComponent />
          </main>
        </div>
      </div>
    </>
  );
}
