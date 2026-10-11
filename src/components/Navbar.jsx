"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import logoIcon from "../logo-icon.png";
import { authClient } from "../lib/auth-client";

const CATEGORY_BASE = "/category";

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
    <header className="w-full border-b border-gray-100 bg-white font-sans shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10B981] p-1.5 shadow-sm">
            <Image
              src={logoIcon}
              alt="বাজার দর"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight text-gray-900">
              বাজার দর
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">{date}</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 hover:bg-gray-50"
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
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}
                <span className="hidden max-w-[140px] truncate text-sm font-medium text-gray-800 sm:inline">
                  {user.name}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && (
                <div
                  role="menu"
                  className="absolute right-0 z-30 mt-2 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
                >
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">{user.email}</p>
                  </div>

                  <div className="p-1.5">
                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={18} className="text-[#10B981]" />
                      আমার প্রোফাইল
                    </Link>

                    <Link
                      href="/profile/update"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings size={18} className="text-[#10B981]" />
                      তথ্য আপডেট করুন
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 p-1.5">
                    <button
                      onClick={handleSignOut}
                      role="menuitem"
                      className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      সাইন আউট
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-[#10B981] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0D9668]"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-b border-t border-gray-100 bg-white py-3">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:justify-center sm:gap-4 [&::-webkit-scrollbar]:hidden">
          {categories.map((item) => {
            const href = `${CATEGORY_BASE}/${item.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={item.id ?? item.slug}
                href={href}
                aria-current={active ? "page" : undefined}
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