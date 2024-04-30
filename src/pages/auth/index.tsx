"use client";
import TestAtomComp from "@/components/01-atoms/TestAtomComponent";
import api from "@/utils/axios";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useEffect } from "react";

const AuthPage = () => {
  const authGitHub = async () => {
    console.log("Starting auth");

    const params = {
      redirect_to: window.location.href,
    };

    const url = api.getUri() + "/oauth/github/authorize";

    console.log(url);

    window.location.href = url + "?" + new URLSearchParams(params);
  };

  const checkAuth = async () => {
    try {
      const resp = await api.get(
        "https://api-staging.anyflow.pro/api/oauth/github/check"
      );

      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="text-3xl">
      <button onClick={authGitHub}>Github login</button>
      <br />
      <button onClick={checkAuth}>Check login</button>
    </div>
  );
};

export default AuthPage;
