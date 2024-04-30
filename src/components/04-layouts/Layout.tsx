// import Navbar from './navbar'
// import Footer from './footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Navbar /> */}
      <div className="text-center h-20 bg-blue-600">Heahder here</div>
      <main className="bg-base-300 h-svh">{children}</main>
      <div className="fixed bottom-0 w-full text-center h-24 bg-blue-900">
        Footer here
      </div>
      {/* <Footer /> */}
    </>
  );
}
