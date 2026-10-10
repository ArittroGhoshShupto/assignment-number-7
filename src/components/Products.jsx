import Link from "next/link";
import ProductCard from "./productcard";

export default function Products({ products }) {
  const list = Array.isArray(products) ? products : [];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((item) => (
        <Link key={item.id} href={`/product/${item.id}`}>
          <ProductCard product={item} />
        </Link>
      ))}
    </div>
  );
}