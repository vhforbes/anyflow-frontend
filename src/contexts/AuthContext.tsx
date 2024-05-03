"use client";
import { useAuth } from "@/hooks/useAuth";
import { on } from "events";
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

export const AuthContextWrapper = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfoType>({} as UserInfoType);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    false
  );

  const { checkAuthState, getUserAuthData } = useAuth();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await getUserAuthData();

        console.log("Setting userData state");

        if (userData) {
          setUserInfo({
            email: userData?.email,
            name: userData?.name,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const checkUserIsAuthenticated = async () => {
      if (!isAuthenticated) setIsAuthenticated(await checkAuthState());
    };

    const localUserInfo = localStorage.getItem("userInfo");

    if (!localUserInfo) {
      getUserData();
    }

    checkUserIsAuthenticated();
  }, []);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo, isAuthenticated]);

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
