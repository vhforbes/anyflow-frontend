import TestAtomComp from "@/components/01-atoms/TestAtomComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-2xl">Home Page</div>
      <TestAtomComp />
    </main>
  );
}
