import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "../../../components/Shell";
import CategoryView from "../../../components/catagoryview";
import { getCategory, getProducts, fmt } from "../../../lib/getproducts";

export default async function CategoryProducts({ params }) {
  
  const p = await params;
  const categorySlug = Object.values(p ?? {})[0];

  if (!categorySlug) notFound();

  const [currentCategory, categoryProducts] = await Promise.all([
    getCategory(categorySlug),
    getProducts(categorySlug),
  ]);

  if (!currentCategory) notFound();

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-emerald-600">
            হোম
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-900">{currentCategory.nameBn}</span>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
          <div className="rounded-xl bg-emerald-50 p-3 text-4xl">{currentCategory.icon}</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentCategory.nameBn}</h1>
            <p className="mt-0.5 text-sm text-gray-500">
              {fmt(categoryProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {categoryProducts.length > 0 ? (
          <CategoryView products={categoryProducts} />
        ) : (
          <div className="space-y-4 rounded-2xl border border-gray-200/80 bg-white py-16 text-center">
            <div className="text-5xl">🔍</div>
            <h2 className="text-xl font-bold text-gray-800">কোনো পণ্য পাওয়া যায়নি!</h2>
            <p className="text-sm text-gray-500">
              এই মুহূর্তে এই ক্যাটাগরিতে কোনো পণ্য উপলব্ধ নেই।
            </p>
            <Link
              href="/"
              className="inline-block rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}
      </div>
    </Shell>
  );
}