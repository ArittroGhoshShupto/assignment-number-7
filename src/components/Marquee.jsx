"use client";

export default function Marquee() {
 
  const itemsToRender = [
    { emoji: "🍚", name: "স্বর্ণা চাল", price: 48, unit: "কেজি", change: 2.1, isUp: true },
    { emoji: "🍚", name: "মিনিকেট চাল", price: 99, unit: "কেজি", change: 2.9, isUp: false },
    { emoji: "🍚", name: "বাশমতি চাল", price: 66, unit: "কেজি", change: 3.1, isUp: true },
    { emoji: "🫘", name: "মসুর ডাল", price: 152, unit: "কেজি", change: 2.9, isUp: true },
    { emoji: "🫘", name: "ছোলা", price: 120, unit: "কেজি", change: 2.8, isUp: false },
    { emoji: "🧅", name: "পেঁয়াজ", price: 54, unit: "কেজি", change: 12.5, isUp: true },
    { emoji: "🫚", name: "আদা", price: 85, unit: "কেজি", change: 9.0, isUp: true },
    { emoji: "🍆", name: "বেগুন", price: 44, unit: "কেজি", change: 4.8, isUp: true },
    { emoji: "🐟", name: "রুই মাছ", price: 45, unit: "কেজি", change: 4.5, isUp: true },
    { emoji: "🥚", name: "ডিম", price: 148, unit: "ডজন", change: 3.6, isUp: true },
  ];

  const toBanglaNum = (num) => {
    if (num === undefined || num === null || num === "") return "০";
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (d) => banglaDigits[d]);
  };

  return (
    <div className="w-full bg-[#F3F8F5] py-3 border-y border-dashed border-emerald-200/80 overflow-hidden text-sm select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
       
        <div className="flex items-center gap-8 px-4">
          {itemsToRender.map((item, index) => (
            <div key={`set1-${index}`} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-base">{item.emoji}</span>
              <span className="font-semibold text-slate-900">{item.name}</span>
              <span className="text-slate-600 font-normal">{toBanglaNum(item.price)} টাকা/{item.unit}</span>
              <span className={`font-bold flex items-center gap-0.5 ${item.isUp ? 'text-red-500' : 'text-emerald-600'}`}>
                {item.isUp ? '▲' : '▼'} {toBanglaNum(item.change)}%
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-8 px-4">
          {itemsToRender.map((item, index) => (
            <div key={`set2-${index}`} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-base">{item.emoji}</span>
              <span className="font-semibold text-slate-900">{item.name}</span>
              <span className="text-slate-600 font-normal">{toBanglaNum(item.price)} টাকা/{item.unit}</span>
              <span className={`font-bold flex items-center gap-0.5 ${item.isUp ? 'text-red-500' : 'text-emerald-600'}`}>
                {item.isUp ? '▲' : '▼'} {toBanglaNum(item.change)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}