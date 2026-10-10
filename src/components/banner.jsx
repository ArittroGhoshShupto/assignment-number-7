import Image from 'next/image';
import bannerImg from '../bazar-hero.png'; 
export default function HeroBanner() {
  return (
    <section className="max-w-[1120px] w-full mx-auto p-6 md:p-8 rounded-[24px] border border-gray-200 bg-white flex flex-col-reverse md:flex-row items-center justify-between gap-6">
      <div className="flex-1 space-y-4">
        <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
          মঙ্গলবার, ৯ অক্টোবর, ২০২৬
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মশলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <div>
          <button className="bg-[#008a45] hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm">
            সব পণ্য দেখুন
          </button>
        </div>
      </div>
      <div className="w-full md:w-[300px] flex justify-center items-center">
        <Image
          src={bannerImg}
          alt="Bazardor Hero Illustration"
          width={300}
          height={220}
          priority
          className="object-contain"
        />
      </div>
    </section>
  );
}