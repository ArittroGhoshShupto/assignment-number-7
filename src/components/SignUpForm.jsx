"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { signUp, signIn } from "../lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");
    const confirm = String(f.get("confirm") ?? "");

    if (name.length < 3) return toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return toast.error("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "সাইন আপ করা যায়নি");

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  };

  const social = async (provider) => {
    const { error } = await signIn.social({ provider, callbackURL: "/" });
    if (error) toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
  };

  return (
    <div className="mx-auto max-w-md py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-gray-500">
          বিস্তারিত দাম ও বাজার তুলনা দেখতে নতুন অ্যাকাউন্ট খুলুন।
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <Form className="space-y-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            validate={(v) => (v.length < 3 ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে" : null)}
          >
            <Label>নাম</Label>
            <Input name="name" placeholder="আপনার পুরো নাম" />
            <FieldError />
          </TextField>

          <TextField isRequired>
            <Label>ইমেইল</Label>
            <Input name="email" type="email" placeholder="you@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            validate={(v) => (v.length < 8 ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" : null)}
          >
            <Label>পাসওয়ার্ড</Label>
            <Input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" />
            <FieldError />
          </TextField>

          <TextField isRequired>
            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input name="confirm" type="password" placeholder="আবার লিখুন" />
            <FieldError />
          </TextField>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-700 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </Form>

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
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-emerald-700 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <p className="mt-5 text-center text-xs text-gray-500">
        <Link href="/" className="hover:text-emerald-700">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}