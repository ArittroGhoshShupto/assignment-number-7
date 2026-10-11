import { Suspense } from "react";
import { connection } from "next/server";
import Navbar from "./Navbar";
import Marquee from "./Marquee";
import Footer from "./footer";
import { getProducts, getCategories, bnDate } from "../lib/getproducts";

async function Header() {
  await connection();
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Navbar categories={categories} date={bnDate()} />
      <Marquee products={products} />
    </>
  );
}

export default function Shell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F7F4]">
      <Suspense fallback={<div className="h-40 animate-pulse bg-white" />}>
        <Header />
      </Suspense>
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 sm:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}