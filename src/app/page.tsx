import ChainsScrollerComponent from "@/components/03-organisms/ChainsScroller";
import Layout from "@/components/04-layouts/Layout";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-evenly mb-14">
        <div className="md:mr-8">
          <Image
            width={800}
            height={800}
            src={"/anyflow-image-temp.png"}
            alt="image with anyflow logo"
          />
        </div>
        <div className="flex flex-col justify-around max-w-80">
          <h1 className="text-4xl font-black">Stricking Title!</h1>
          <p>
            We bet you have grown tired of deploying on 10 different chains,
            having to use only your command line...
            <br />
            <br />
            We're here to help you! Deploy on any of our XX supported chains
            with a seamless integration with your github repo!
          </p>
          <button className="btn btn-primary max-w-40">Start now!</button>
        </div>
      </div>
      <ChainsScrollerComponent />
    </div>
  );
}
