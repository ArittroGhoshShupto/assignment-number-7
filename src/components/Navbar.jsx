"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import logoIcon from "../logo-icon.png";
import { authClient } from "../lib/auth-client";

export default function Navbar({ categories = [], date }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  async function handleSignOut() {
    setOpen(false);
    const { error } = await authClient.signOut();
    if (error) return toast.error("সাইন আউট করা যায়নি");
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  }

  const user = session?.user;

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
    
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-[#10B981] w-10 h-10 rounded-xl flex items-center justify-center p-1.5 shadow-sm">
            <Image
              src={logoIcon}
              alt="বাজার দর"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">বাজার দর</h1>
            <p className="text-xs text-gray-500 mt-0.5">{date}</p>
          </div>
        </Link>

        
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-50 cursor-pointer"
              >
                {user.image ? (
                  
                  <img
                    src={user.image}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10B981] text-sm font-bold text-white">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}
                <span className="hidden text-sm font-medium text-gray-800 sm:inline">
                  {user.name}
                </span>
                <span className="text-xs text-gray-500">▾</span>
              </button>

              {open && (
                <div className="absolute right-0 z-30 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                  <div className="border-b border-gray-100 px-3 py-2">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="truncate text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="mt-1 block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    👤আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    🔚সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors px-2 py-1"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="bg-[#10B981] hover:bg-[#0D9668] text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors shadow-sm"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-b border-gray-100 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center sm:justify-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none">
          {categories.map((item) => {
            const href = `/catagory/${item.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={item.id ?? item.slug}
                href={href}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#10B981] text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}