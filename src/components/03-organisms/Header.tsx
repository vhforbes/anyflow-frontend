"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import AnyflowFull from "../icons/brand/AnyflowFull";
import AnyflowLogo from "../icons/brand/AnyflowLogo";

import BetaIcon from "../icons/BetaIcon";
import { LanguageSelector } from "../02-molecules/LanguageSelector";
import { useRouter } from "next/navigation";

const HeaderComponent = ({ className }: { className?: string }) => {
  const router = useRouter();

  return (
    <div
      className={`${className} bg-blue-0 h-[72px] px-10 shadow-primary border-b-[1px] border-[#475467]`}
    >
      <div className="flex items-center">
        <div className="md:mr-12 md:ml-28 flex items-center">
          <button onClick={() => router.push("/")}>
            <AnyflowFull className="mr-2" />
          </button>
          <BetaIcon />
        </div>

        <div>
          <button className="btn btn-neutral border-none bg-blue-2 h-fit px-3 py-2 mr-1">
            Start
          </button>
          {/* // Check wich page the user is and alter class accordingly */}
          <button className="bg-none h-fit px-3 py-2">History</button>
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
