"use client";

import AnyflowFull from "../../icons/brand/AnyflowFull";
import AnyflowLogo from "../../icons/brand/AnyflowLogo";

import BetaIcon from "../../icons/BetaIcon";
import { LanguageSelector } from "../02-molecules/LanguageSelector";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const HeaderComponent = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isSelected = "btn btn-neutral border-none bg-blue-2";

  return (
    <div
      className={`${className} relative bg-blue-0 px-10 py-4 shadow-primary border-b-[1px] border-[#475467]`}
    >
      <div className="flex items-center">
        <div className="md:mr-12 md:ml-28 flex items-center">
          <button onClick={() => router.push("/")}>
            <AnyflowFull className="mr-2" />
          </button>
          <BetaIcon />
        </div>

        <div>
          <button
            className={`${
              pathname === "/" ? isSelected : `hover:bg-blue-2`
            } h-fit px-3 py-2 mr-1 bg-none rounded-md`}
          >
            <Link href={"/"}>Start</Link>
          </button>
          {/* // Check wich page the user is and alter class accordingly */}
          <button
            className={`${
              pathname === "/deployments" ? isSelected : `hover:bg-blue-2`
            } h-fit px-3 py-2 bg-none rounded-md`}
          >
            <Link href={"/deployments"}>History</Link>
          </button>
        </div>
      </div>

      <div className="flex">
        <LanguageSelector />

        <div className="rounded-full border-white border-[1px] p-2 ml-6">
          <AnyflowLogo className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
