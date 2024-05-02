"use client";
import TestAtomComp from "@/components/01-atoms/TestAtomComponent";
import api, { awaitForCsrfCookie } from "@/utils/axios";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useEffect } from "react";

const AuthPage = () => {
  const authGitHub = async () => {
    await awaitForCsrfCookie();
    console.log("Starting auth");

    const params = {
      redirect_to: "https://app-staging.anyflow.pro/",
    };

    const url = api.getUri() + "/oauth/github/authorize";

    window.location.href = url + "?" + new URLSearchParams(params);

    console.log(url + "?" + new URLSearchParams(params));
  };

  const checkAuth = async () => {
    try {
      await awaitForCsrfCookie();
      const resp = await api.get("/api/oauth/github/check");

      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      await awaitForCsrfCookie();
      const resp = await api.get("/api/user");

      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
    // getUser();
  }, []);

  return (
    <div className="text-3xl">
      <button onClick={authGitHub}>Github login</button>
      <br />
      <br />
      <button onClick={checkAuth}>Check login</button>
    </div>
  );
};

export default AuthPage;
