import "../../app/bg.css";
import HeaderComponent from "../03-organisms/Header";
import FooterComponent from "../03-organisms/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <HeaderComponent />
        <div className="bottom-0 left-0 w-full h-full fixed top-0 pattern"></div>
        <main className="flex-grow bg-base-200 bg-opacity-95">{children}</main>
        <FooterComponent />
      </div>
    </>
  );
}
