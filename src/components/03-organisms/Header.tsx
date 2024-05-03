"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const HeaderComponent = () => {
  const { userInfo } = useAuthContext();
  const { authUser, logOut } = useAuth();

  return (
    <div className="flex items-center justify-between bg-base-300 h-20 px-10 shadow-primary shadow-lg">
      <div>
        <Image
          width={130}
          height={130}
          src="/anyflow-logo.png"
          alt="anyflow header logo"
          priority
        />
      </div>
      {userInfo.name ? (
        <div className="flex flex-col items-end">
          <p>Hey, {userInfo.name}</p>
          <button onClick={logOut}>Logout</button>
        </div>
      ) : (
        <button
          onClick={authUser}
          className="btn btn-sm border-none hover:bg-opacity-70 btn-secondary bg-opacity-90 h-8"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default HeaderComponent;
