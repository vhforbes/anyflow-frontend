"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import GitHubIcon from "../../icons/GitHubIcon";
import { useEffect } from "react";

const AuthPage = () => {
  const { isAuthenticated } = useAuthContext();
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/deploy-steps/01-code-provider");
    }
  }, [isAuthenticated]);

  // MAKE A CONDITINAL HERE TO NOT RENDER WHEN LOADING?
  return (
    <div className="flex justify-center mt-10">
      <div className="card flex flex-col justify-between min-h-60 items-center w-96 bg-base-100 shadow-xl p-4">
        <p className="text-2xl font-bold">Welcome to Anyflow</p>
        <p className="text-center">
          Please use your github to start deploying you applications using
          anyflow!
          <br />
          (Maybe say something to tranquilize about repo access etc ?)
        </p>
        <button className="btn" onClick={authUser}>
          {" "}
          <GitHubIcon className="fill-white" /> Sign In With Github
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
