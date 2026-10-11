"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Products from "./Products";
import { fmt } from "../lib/getproducts";

export default function CategoryView({ products = [] }) {
  const [sort, setSort] = useState("default");

  const list = useMemo(() => {
    const arr = [...products];
    if (sort === "asc") arr.sort((a, b) => Number(a.today) - Number(b.today));
    if (sort === "desc") arr.sort((a, b) => Number(b.today) - Number(a.today));
    return arr;
  }, [products, sort]);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="text-6xl">🛒</div>
        <h2 className="mt-4 text-2xl font-bold">৪০৪ — কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="mt-2 text-gray-500">এই ক্যাটেগরিতে এখন কোনো পণ্য নেই।</p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-green-700 px-6 py-2.5 font-medium text-white hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-2 rounded-2xl bg-white p-3 text-sm shadow-sm">
        <label htmlFor="sort" className="text-gray-600">
          সাজান:
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      <p className="mb-3 text-xs text-gray-500">
        মোট {fmt(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <Products products={list} />
    </>
  );
}