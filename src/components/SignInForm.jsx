"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { signIn } from "../lib/auth-client";

export default function SignInForm() {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");

    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) return toast.error("ইমেইল বা পাসওয়ার্ড ভুল");

    toast.success("সাইন ইন সফল হয়েছে");
    router.push(next);
    router.refresh();
  };

  const social = async (provider) => {
    const { error } = await signIn.social({ provider, callbackURL: next });
    if (error) toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
  };

  return (
    <div className="mx-auto max-w-md py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">সাইন ইন</h1>
        <p className="mt-1 text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <Form className="space-y-4" onSubmit={onSubmit}>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-700 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
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
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-emerald-700 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <p className="mt-5 text-center text-xs text-gray-500">
        <Link href="/" className="hover:text-emerald-700">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}