import api from "@/utils/axios";

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
  const authUser = async () => {
    const params = {
      redirect_to: window.location.href,
    };

    const url = api.getUri() + "/oauth/github/authorize";

    window.location.href = url + "?" + new URLSearchParams(params);
  };

  const logOut = async () => {
    try {
      localStorage.removeItem("userInfo");
      const url = api.getUri() + "/auth/logout";
      window.location.href = url;
    } catch (error) {}
  };

  const checkAuthState = async () => {
    try {
      const { data }: { data: checkAuthData } = await api.get(
        "/api/oauth/github/check"
      );

      return data.isAuthenticated;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAuthData = async () => {
    try {
      const { data }: { data: userAuthData } = await api.get("/api/user");

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { authUser, checkAuthState, getUserAuthData, logOut };
};
