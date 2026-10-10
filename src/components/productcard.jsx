import { unitBn, fmt, fmtPct } from "../lib/getproducts";

export default function ProductCard({ product }) {
  const dir = product?.change?.dir;
  const pct = product?.change?.pct ?? 0;

  const badge =
    dir === "up"
      ? { cls: "bg-red-50 text-red-600", text: `▲ ${fmtPct(pct)}%` }
      : dir === "down"
      ? { cls: "bg-green-50 text-green-600", text: `▼ ${fmtPct(pct)}%` }
      : { cls: "bg-gray-100 text-gray-500", text: `— ${fmtPct(0)}%` };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-50 text-2xl">
          {product?.image}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug text-gray-900">{product?.nameBn}</h3>
          <p className="text-xs text-gray-500">
            প্রতি {unitBn[product?.unit] ?? product?.unit}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-gray-500">আজকের দাম</p>
          <p className="whitespace-nowrap text-lg font-bold text-gray-900">
            {fmt(product?.today)} টাকা
          </p>
        </div>
        <span
          className={`whitespace-nowrap rounded px-2 py-1 text-xs font-semibold ${badge.cls}`}
        >
          {badge.text}
        </span>
      </div>
    </div>
  );
}