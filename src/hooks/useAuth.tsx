import api from "@/utils/axios";
import useLoader from "./useLoader";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type userAuthData = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

type checkAuthData = {
  isAuthenticated: boolean;
};

export const useAuth = () => {
  const { startLoading, stopLoading } = useLoader();
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  const authUser = async () => {
    const params = {
      redirect_to: window.location.href,
    };

    const url = api.getUri() + "/oauth/github/authorize";

    window.location.href = url + "?" + new URLSearchParams(params);
  };

  const logOut = async () => {
    localStorage.removeItem("userInfo");
    const url = api.getUri() + "/auth/logout";
    window.location.href = url;
  };

  const checkAuthState = async () => {
    try {
      startLoading();
      const { data }: { data: checkAuthData } = await api.get(
        "/api/oauth/github/check"
      );

      stopLoading();
      return data.isAuthenticated;
    } catch (error) {
      console.error(error);
      stopLoading();
    }
  };

  const getUserAuthData = async () => {
    try {
      const { data }: { data: userAuthData } = await api.get("/api/user");

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return { authUser, checkAuthState, getUserAuthData, logOut };
};
