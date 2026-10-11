"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ShieldCheck, User, Save } from "lucide-react";
import { authClient } from "../lib/auth-client";

export default function UpdateProfileClient() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("আগে সাইন ইন করুন");
      router.replace("/signin");
    }
    if (session?.user?.name) setName(session.user.name);
  }, [isPending, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error(error.message || "আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  if (isPending || !session) {
    return (
      <div className="mx-auto h-72 max-w-xl animate-pulse rounded-3xl bg-gray-200" />
    );
  }

  return (
    <div className="mx-auto max-w-xl py-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          <ShieldCheck size={14} />
          BetterAuth Profile
        </span>

        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          প্রোফাইল তথ্য আপডেট করুন
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          আপনার অ্যাকাউন্ট নেম বা প্রোফাইল ডিসপ্লে নাম পরিবর্তন করুন।
        </p>

        <hr className="my-6 border-gray-200" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              ইমেইল (পরিবর্তন অযোগ্য)
            </label>
            <input
              type="email"
              value={session.user.email}
              disabled
              className="w-full cursor-not-allowed rounded-xl bg-gray-100 px-4 py-3 text-gray-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              আপনার নতুন নাম (Name)
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3 focus-within:border-green-600">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full outline-none"
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/profile"
              className="px-5 py-3 font-medium text-gray-600 hover:text-gray-900"
            >
              বাতিল
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
            >
              <Save size={18} />
              {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}