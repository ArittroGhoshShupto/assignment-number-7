"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.100.8 2.200v3.300c0 .3.2.7.8.6 4.600-1.500 7.900-5.800 7.900-10.900C23.500 5.700 18.300.5 12 .5z" />
    </svg>
  );
}

export default function SocialButtons() {
  const [loading, setLoading] = useState("");

  async function handleSocial(provider) {
    setLoading(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
      setLoading("");
    }
  }

  const btn =
    "flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 sm:text-sm";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button type="button" disabled={!!loading} onClick={() => handleSocial("google")} className={btn}>
        <GoogleIcon />
        {loading === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
      </button>
      <button type="button" disabled={!!loading} onClick={() => handleSocial("github")} className={btn}>
        <GithubIcon />
        {loading === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
}