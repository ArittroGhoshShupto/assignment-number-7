"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("আপনার নাম দিন");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error("সঠিক ইমেইল দিন");
    if (form.password.length < 8) {
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    }
    if (form.password !== form.confirm) {
      return toast.error("পাসওয়ার্ড দুটি মিলছে না");
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (error) {
      return toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  }

  const input =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600";

  return (
    <div className="mx-auto max-w-md py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-2 text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে বাজারের দাম দেখুন।
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block text-sm font-medium">নাম</label>
            <input type="text" value={form.name} onChange={set("name")} placeholder="যেমন: হাবিব উদ্দিন" className={input} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">ইমেইল</label>
            <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={input} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">পাসওয়ার্ড</label>
            <input type="password" value={form.password} onChange={set("password")} placeholder="কমপক্ষে ৮ অক্ষর" className={input} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input type="password" value={form.confirm} onChange={set("confirm")} placeholder="আবার লিখুন" className={input} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-2.5 font-medium text-white hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
          <span className="h-px flex-1 bg-gray-200" />
          অথবা
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <SocialButtons />

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-green-700 hover:underline">
            সাইন ইন করুন
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