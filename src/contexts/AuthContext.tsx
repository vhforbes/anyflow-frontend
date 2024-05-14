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

type UserInfo = {
  email: string;
  name: string;
};

type AuthContextType = {
  userInfo: UserInfo | undefined;
  isAuthenticated: boolean | undefined;
};

const AuthContext = createContext<AuthContextType>({
  userInfo: undefined,
  isAuthenticated: undefined,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { checkAuthState, getUserAuthData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const authState = await checkAuthState();

      if (!authState) {
        return;
      }

      setIsAuthenticated(authState);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
