import Navbar from "./Navbar";
import Marquee from "./Marquee";
import Footer from "./footer";
import { getProducts } from "../lib/getproducts";

export default async function Shell({ children }) {
  const products = await getProducts();

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F7F4]">
      <Navbar />
      <Marquee products={products} />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 sm:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}