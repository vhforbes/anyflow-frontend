// import Navbar from './navbar'
// import Footer from './footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <h1>Test Layout</h1>
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
}
