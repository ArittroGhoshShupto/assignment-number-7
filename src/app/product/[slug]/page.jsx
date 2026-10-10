import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "../../../components/Shell";
import { getProduct, unitBn, fmt, fmtPct, fmtAvg } from "../../../lib/getproducts";

// Next.js 16 dev "Insight" fix: ei route instant navigation chhara render hobe
export const instant = false;

export default async function ProductPage({ params }) {
  const { slug } = await params; // /product/1 → "1"
  const p = await getProduct(slug);
  if (!p) notFound();

  const rows = (p.markets ?? [])
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const minMarket = rows.length ? rows.reduce((a, b) => (b.min < a.min ? b : a)) : null;
  const maxMarket = rows.length ? rows.reduce((a, b) => (b.max > a.max ? b : a)) : null;
  const avgPrice = rows.length
    ? Math.round(rows.reduce((s, m) => s + m.avg, 0) / rows.length)
    : 0;

  const diff = p.today - p.yesterday;
  const dir = p.change?.dir;
  const unit = unitBn[p.unit] ?? p.unit;

  const badgeCls =
    dir === "up"
      ? "bg-red-50 text-red-600"
      : dir === "down"
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-500";
  const badgeText =
    dir === "up"
      ? `▲ ${fmtPct(p.change.pct)}%`
      : dir === "down"
      ? `▼ ${fmtPct(p.change.pct)}%`
      : `— ${fmtPct(0)}%`;

  return (
    <Shell>
      <div className="mx-auto max-w-[1000px] space-y-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-emerald-600">হোম</Link>
          <span>›</span>
          <Link href={`/catagory/${p.category}`} className="hover:text-emerald-600">
            {p.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-700">{p.nameBn}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-4xl">
              {p.image}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{p.nameBn}</h1>
              <p className="text-xs text-gray-500">
                প্রতি {unit} · {p.categoryNameBn}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {diff === 0 ? (
                  "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
                ) : (
                  <>
                    গতকালের তুলনায় আজ দাম{" "}
                    <b className={diff > 0 ? "text-red-600" : "text-green-600"}>
                      {diff > 0 ? "বেড়েছে" : "কমেছে"}
                    </b>{" "}
                    · {fmt(Math.abs(diff))} টাকা
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 px-6 py-3 text-center">
            <p className="text-[11px] text-gray-500">আজকের দাম</p>
            <p className="text-3xl font-bold text-gray-900">{fmt(p.today)}</p>
            <p className="text-xs text-gray-500">টাকা / {unit}</p>
            <span
              className={`mt-1 inline-block rounded px-2 py-0.5 text-xs font-semibold ${badgeCls}`}
            >
              {badgeText}
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-bold text-emerald-600">
                {fmt(minMarket?.min)} <span className="text-sm">টাকা</span>
              </p>
              <p className="text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার: {minMarket?.market}
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
              <p className="text-2xl font-bold text-red-600">
                {fmt(maxMarket?.max)} <span className="text-sm">টাকা</span>
              </p>
              <p className="text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার: {maxMarket?.market}
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500">গড় দাম</p>
              <p className="text-2xl font-bold text-emerald-600">
                {fmt(avgPrice)} <span className="text-sm">টাকা</span>
              </p>
              <p className="text-xs text-gray-500">প্রতি {unit}-এর হিসাবে</p>
            </div>
          </div>
        </div>

        {/* Market table */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
                  <th className="py-2">বাজার</th>
                  <th className="py-2">বিভাগ</th>
                  <th className="py-2 text-right">সর্বনিম্ন</th>
                  <th className="py-2 text-right">সর্বোচ্চ</th>
                  <th className="py-2 text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m) => (
                  <tr key={m.market} className="border-b border-gray-50 last:border-0">
                    <td className="py-3">{m.market}</td>
                    <td className="py-3 text-gray-600">{m.division}</td>
                    <td className="py-3 text-right">{fmt(m.min)} টাকা</td>
                    <td className="py-3 text-right">{fmt(m.max)} টাকা</td>
                    <td className="py-3 text-right font-semibold">{fmtAvg(m.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
}