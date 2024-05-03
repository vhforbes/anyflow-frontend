"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  if (isAuthenticated) {
    // router.push("/deploy-steps/01-code-provider");
  }

  return (
    <div className="text-3xl">
      <button>Sign In</button>
    </div>
  );
};

export default AuthPage;
