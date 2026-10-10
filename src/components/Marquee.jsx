import { fmt, fmtPct, unitBn } from "../lib/getproducts";

export default function Marquee({ products = [] }) {
  if (!products.length) return null;
  const items = [...products, ...products];

  return (
    <div className="ticker overflow-hidden whitespace-nowrap border-b border-gray-100 bg-white">
      <style>{`
        .ticker-track { display: inline-flex; width: max-content; animation: ticker-scroll 90s linear infinite; }
        .ticker:hover .ticker-track { animation-play-state: paused; }
        @keyframes ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      <div className="ticker-track py-2 text-xs">
        {items.map((p, i) => {
          const dir = p.change?.dir;
          return (
            <span key={`${p.id}-${i}`} className="flex items-center gap-1.5 px-5">
              <span>{p.image}</span>
              <b className="text-gray-900">{p.nameBn}</b>
              <span className="text-gray-600">
                {fmt(p.today)} টাকা/{unitBn[p.unit] ?? p.unit}
              </span>
              {dir === "up" && (
                <span className="font-semibold text-red-600">▲ {fmtPct(p.change.pct)}%</span>
              )}
              {dir === "down" && (
                <span className="font-semibold text-green-600">▼ {fmtPct(p.change.pct)}%</span>
              )}
              {dir === "flat" && <span className="text-gray-500">— {fmtPct(0)}%</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}