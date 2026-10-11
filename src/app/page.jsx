import Shell from "../components/Shell";
import Banner from "../components/banner";
import Products from "../components/Products";
import { getProducts, fmt } from "../lib/getproducts";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <Shell>
      <div className="space-y-10">
        <Banner />

        {products.length === 0 && (
          <p className="rounded-xl bg-red-50 p-4 text-center text-red-600">
            ডাটা লোড করা যায়নি, একটু পরে আবার চেষ্টা করুন।
          </p>
        )}

        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-red-600">
            <span>▲</span> আজ দাম বেড়েছে
          </h2>
          <Products products={risers} />
        </section>

        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-emerald-600">
            <span>▼</span> আজ দাম কমেছে
          </h2>
          <Products products={fallers} />
        </section>

        <section id="সব-পণ্য" className="scroll-mt-6 space-y-4 border-t border-gray-200 pt-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
            <p className="text-xs text-gray-500">
              মোট {fmt(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
          <Products products={products} />
        </section>
      </div>
    </Shell>
  );
}