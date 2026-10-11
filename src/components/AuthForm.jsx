"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

const inputCls =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-600";

export default function AuthForm({ mode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);

  
  const rawNext = params.get("next");
  const next =
    rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

  
  useEffect(() => {
    if (params.get("redirected")) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "redirected" });
    }
  }, [params]);

  async function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");
    const confirm = String(f.get("confirm") ?? "");

    if (isSignup && !name) return toast.error("আপনার নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("সঠিক ইমেইল দিন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (isSignup && password !== confirm) return toast.error("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true);
    const { error } = isSignup
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      return toast.error(
        isSignup ? error.message || "সাইন আপ করা যায়নি" : "ইমেইল বা পাসওয়ার্ড ভুল"
      );
    }

    if (isSignup) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
      router.push("/signin");
    } else {
      toast.success("সাইন ইন সফল হয়েছে");
      router.push(next);
      router.refresh();
    }
  }

  async function social(provider) {
    const { error } = await authClient.signIn.social({ provider, callbackURL: next });
    if (error) toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
  }

  return (
    <div className="mx-auto max-w-md py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {isSignup
            ? "বিস্তারিত দাম ও বাজার তুলনা দেখতে নতুন অ্যাকাউন্ট খুলুন।"
            : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {isSignup && (
            <div className="space-y-1">
              <label htmlFor="name" className="text-xs font-semibold text-gray-700">নাম</label>
              <input id="name" name="name" type="text" placeholder="আপনার পুরো নাম" className={inputCls} />
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="email" className="text-xs font-semibold text-gray-700">ইমেইল</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" className={inputCls} />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-xs font-semibold text-gray-700">পাসওয়ার্ড</label>
            <input id="password" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className={inputCls} />
          </div>

          {isSignup && (
            <div className="space-y-1">
              <label htmlFor="confirm" className="text-xs font-semibold text-gray-700">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input id="confirm" name="confirm" type="password" placeholder="আবার লিখুন" className={inputCls} />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-700 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
          <span className="h-px flex-1 bg-gray-200" />
          অথবা
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => social("google")}
            className="rounded-lg border border-gray-200 py-2 text-xs font-medium hover:bg-gray-50"
          >
            <span className="font-bold text-blue-600">G</span> Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            onClick={() => social("github")}
            className="rounded-lg border border-gray-200 py-2 text-xs font-medium hover:bg-gray-50"
          >
            ⌥ GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-gray-600">
          {isSignup ? "ইতিমধ্যে অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
          <Link
            href={isSignup ? "/signin" : "/signup"}
            className="font-semibold text-emerald-700 hover:underline"
          >
            {isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </div>

      <p className="mt-5 text-center text-xs text-gray-500">
        <Link href="/" className="hover:text-emerald-700">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}