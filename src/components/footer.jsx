// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-12 py-5">
      <div className="max-w-[1120px] w-full mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-500 font-normal">
        {/* বাম পাশের লেখা */}
        <div>
          <span className="font-semibold text-gray-800">বাজার দর</span> — প্রয়োজনীয় পণ্যের দর এক নজরে
        </div>

        {/* ডান পাশের লেখা */}
        <div className="text-center sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}