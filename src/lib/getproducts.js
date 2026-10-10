const BASE =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://openapi.programming-hero.com/api/bazardor";

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API ${res.status} on ${path}`);
  return res.json();
}

const toArray = (json) =>
  Array.isArray(json) ? json : json?.products ?? json?.categories ?? json?.data ?? [];
export async function getProducts(category) {
  try {
    if (!category) return toArray(await get("/products"));

    let list = [];
    try {
      list = toArray(await get(`/products?category=${encodeURIComponent(category)}`));
    } catch (e) {
      console.error("category endpoint failed, falling back:", e.message);
    }

    if (list.length === 0) {
      const all = toArray(await get("/products"));
      list = all.filter((p) => p.category === category || p.categorySlug === category);
    }
    return list;
  } catch (e) {
    console.error("getProducts failed:", e);
    return [];
  }
}

export async function getProduct(id) {
  try {
    const p = await get(`/products/${id}`);
    return p && p.id ? p : null;
  } catch (e) {
    console.error("getProduct failed:", e);
    return null;
  }
}

export async function getCategories() {
  try {
    return toArray(await get("/categories"));
  } catch (e) {
    console.error("getCategories failed:", e);
    return [];
  }
}

export async function getCategory(slug) {
  const list = await getCategories();
  const found = list.find((c) => c.slug === slug || c.id === slug);
  if (found) return found;

  try {
    const c = await get(`/categories/${encodeURIComponent(slug)}`);
    return c && c.slug ? c : null;
  } catch (e) {
    return null; 
  }
}

export const unitBn = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

export const fmt = (n) => Number(n ?? 0).toLocaleString("bn-BD");

export const fmtPct = (n) =>
  Math.abs(Number(n ?? 0)).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
export const fmtAvg = (n) => {
  const v = Number(n ?? 0);
  return v.toLocaleString("bn-BD", {
    minimumFractionDigits: Number.isInteger(v) ? 0 : 2,
    maximumFractionDigits: 2,
  });
};
export const bnDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());