"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut, Pencil } from "lucide-react";
import { authClient } from "../lib/auth-client";

export default function ProfileClient() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল দেখতে আগে সাইন ইন করুন");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-2xl animate-pulse space-y-4 py-10">
        <div className="h-8 w-48 rounded bg-gray-200" />
        <div className="h-28 rounded-2xl bg-gray-200" />
        <div className="h-40 rounded-2xl bg-gray-200" />
      </div>
    );
  }

  const { user } = session;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => toast.error("সাইন আউট করা যায়নি"),
      },
    });
  };

  return (
    <div className="mx-auto max-w-2xl py-6">
      <h1 className="text-2xl font-bold sm:text-3xl">আমার প্রোফাইল</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-14 w-14 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600 text-xl font-bold text-white">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-semibold">{user.name}</p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-400 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
        >
          <LogOut size={15} />
          সাইন আউট
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-semibold">তথ্য</h2>
        <p className="text-sm text-gray-500">নাম</p>
        <p className="mb-5 mt-1 font-medium">{user.name}</p>

        <Link
          href="/profile/update"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 py-2.5 font-medium text-white hover:bg-green-800"
        >
          <Pencil size={16} />
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}