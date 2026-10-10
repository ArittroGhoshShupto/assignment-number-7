"use client";
import { useMemo, useState } from "react";
import Products from "./Products";
import { fmt } from "../lib/getproducts";

export default function CategoryView({ products }) {
  const [sort, setSort] = useState("default");

  const list = useMemo(() => {
    const arr = [...products];
    if (sort === "asc") arr.sort((a, b) => a.today - b.today);
    if (sort === "desc") arr.sort((a, b) => b.today - a.today);
    return arr;
  }, [products, sort]);

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
            className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs">
            ▾
          </span>
        </div>
      </div>

      <p className="mb-3 text-xs text-gray-500">
        মোট {fmt(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <Products products={list} />
    </>
  );
}