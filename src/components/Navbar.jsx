"use client";

import Image from "next/image";
import logoIcon from "../logo-icon.png";

export default function Navbar() {
  const categories = [
    { name: "চাল", slug: "chal", icon: "🍚" },
    { name: "ডাল", slug: "dal", icon: "🫘" },
    { name: "তেল", slug: "tel", icon: "🫙" },
    { name: "সবজি", slug: "sobji", icon: "🥦" },
    { name: "মাছ", slug: "mach", icon: "🐟" },
    { name: "মাংস", slug: "mangsho", icon: "🍗" },
    { name: "ডিম-দুধ", slug: "dim-dudh", icon: "🥛" },
    { name: "মসলা", slug: "mosla", icon: "🌶️" },
  ];

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
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
            <p className="text-xs text-gray-500 mt-0.5">মঙ্গলবার, ৯ অক্টোবর, ২০২৬</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors px-2 py-1 cursor-pointer">
            সাইন ইন
          </button>
          <button className="bg-[#10B981] hover:bg-[#0D9668] text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors shadow-sm cursor-pointer">
            সাইন আপ
          </button>
        </div>
      </div>
      <div className="border-t border-b border-gray-100 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 overflow-x-auto scrollbar-none">
          {categories.map((item, index) => (
            <div key={index} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600 transition-colors whitespace-nowrap">
              <span className="text-base">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700 hover:text-emerald-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}