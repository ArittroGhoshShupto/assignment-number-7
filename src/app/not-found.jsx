import Link from "next/link";
import Shell from "../components/Shell";

export default function NotFound() {
  return (
    <Shell>
      <div className="py-20 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="mt-4 text-3xl font-bold">৪০৪ — পেজটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-2 text-gray-500">আপনি যে পেজটি খুঁজছেন তা নেই বা সরিয়ে ফেলা হয়েছে।</p>
        <Link href="/" className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-2 text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </Shell>
  );
}