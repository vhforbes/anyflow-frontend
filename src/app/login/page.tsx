"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import GitHubIcon from "@/icons/companies/GitHubIcon";
import AnyflowLogo from "@/icons/brand/AnyflowLogo";

import { useEffect } from "react";
import BitbucketIcon from "@/icons/companies/BitbucketIcon";
import GitlabIcon from "@/icons/companies/GitlabIcon";

const AuthPage = () => {
  const { isAuthenticated } = useAuthContext();
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // MAKE A CONDITINAL HERE TO NOT RENDER WHEN LOADING?
  return (
    <div className="flex justify-center mt-10 w-full h-full">
      <div className="card flex flex-col items-center shadow-xl p-4">
        <AnyflowLogo className="w-16 h-16" />
        <p className="text-4xl font-bold mt-6">Welcome to Anyflow</p>
        <p className="text-center mt-3">Link your code provider to start.</p>

        <div className="flex mt-8">
          <input type="checkbox" className="mr-2" />
          <p className="text-blue-8">Remember for 30 days</p>
        </div>

        <div className="flex flex-col w-full mt-6">
          <button
            className="btn bg-white text-blue-0 font-bold hover:bg-blue-8"
            onClick={authUser}
          >
            {" "}
            <GitHubIcon className="fill-black" /> Log in With Github
          </button>
          <button
            className="btn w-full disabled:text-blue-5 disabled:bg-blue-2 font-bold mt-6"
            disabled
          >
            {" "}
            <BitbucketIcon className="fill-blue-5" /> Log in With Bitbucket
          </button>
          <button
            className="btn w-full disabled:text-blue-5 disabled:bg-blue-2 font-bold mt-6"
            disabled
          >
            {" "}
            <GitlabIcon className="fill-blue-5" /> Log in With Gitlab
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
