const BASE =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

// দাম প্রতি ৬০ সেকেন্ডে refresh হবে (instant navigation + কম API request)
async function get(path) {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API ${res.status} on ${path}`);
  return res.json();
}

// /products  (category দিলে category field দিয়ে filter হয়)
export async function getProducts(category) {
  try {
    const json = await get("/products");
    const all = Array.isArray(json) ? json : json?.products ?? json?.data ?? [];
    return category ? all.filter((p) => p.category === category) : all;
  } catch (e) {
    console.error("getProducts failed:", e);
    return [];
  }
}

// /products/1
export async function getProduct(id) {
  try {
    const p = await get(`/products/${id}`);
    return p && p.id ? p : null;
  } catch (e) {
    console.error("getProduct failed:", e);
    return null;
  }
}

// /categories
export async function getCategories() {
  try {
    const json = await get("/categories");
    return Array.isArray(json) ? json : [];
  } catch (e) {
    console.error("getCategories failed:", e);
    return [];
  }
}

// /categories/chal  (invalid slug হলে API 404 দেয় → null)
export async function getCategory(slug) {
  try {
    const c = await get(`/categories/${slug}`);
    return c && c.slug ? c : null;
  } catch (e) {
    return null;
  }
}

export const unitBn = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

// ১,৮৫০
export const fmt = (n) => Number(n ?? 0).toLocaleString("bn-BD");

// ২.১ / ১২.৫ / ০.০  (negative হলে abs করে)
export const fmtPct = (n) =>
  Math.abs(Number(n ?? 0)).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

// ৬৩ বা ৬৩.৫০ (fraction থাকলে ২ decimal)
export const fmtAvg = (n) => {
  const v = Number(n ?? 0);
  return v.toLocaleString("bn-BD", {
    minimumFractionDigits: Number.isInteger(v) ? 0 : 2,
    maximumFractionDigits: 2,
  });
};

// আজকের বাংলা তারিখ (banner এ hardcode না করে এটা ব্যবহার করো)
export const bnDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());