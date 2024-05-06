"use client";
import { useAuth } from "@/hooks/useAuth";
import useLoader from "@/hooks/useLoader";
import { on } from "events";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type UserInfoType = {
  email: string;
  name: string;
};

type AuthContextType = {
  userInfo: UserInfoType;
  isAuthenticated: boolean | undefined;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfoType>({} as UserInfoType);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    false
  );

  const { checkAuthState, getUserAuthData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const authState = await checkAuthState();

      setIsAuthenticated(authState);

      if (!authState) router.push("/login");

      const localUserInfo = localStorage.getItem("userInfo");

      if (localUserInfo !== "undefined" && authState) {
        console.log("Entering log");
        setUserInfo(JSON.parse(localUserInfo as string));
        return;
      }

      const userData = await getUserAuthData();

      localStorage.setItem("userInfo", JSON.stringify(userData));

      if (userData) {
        setUserInfo({
          email: userData?.email,
          name: userData?.name,
        });
      }
    };

    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
