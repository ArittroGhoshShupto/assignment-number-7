"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // protected route theke redirect hole toast
  useEffect(() => {
    if (params.get("redirect")) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "auth-redirect" });
    }
  }, [params]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return toast.error("সঠিক ইমেইল দিন");
    }
    if (password.length < 8) {
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      return toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">সাইন ইন</h1>
        <p className="mt-2 text-sm text-gray-500">
          বাজারের তুলনা ও সাম্প্রতিক দাম এক জায়গায় দেখুন।
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block text-sm font-medium">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-2.5 font-medium text-white hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
          <span className="h-px flex-1 bg-gray-200" />
          অথবা
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <SocialButtons />

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-green-700 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <p className="mt-5 text-center text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}