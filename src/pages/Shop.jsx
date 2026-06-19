import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";

export default function Shop() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [max, setMax] = useState(3000);
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(() => {
    const list = products.filter((p) => (category === "All" || p.category === category) && p.price <= max && p.name.toLowerCase().includes(search.toLowerCase()));
    return [...list].sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : b.rating - a.rating);
  }, [search, category, max, sort]);
  return (
    <section className="container py-10">
      <div className="mb-8 rounded-lg bg-[#2B160D] p-8 text-white"><h1 className="brand-font text-5xl">Shop BrewNest</h1><p className="mt-2 text-[#e6d5c3]">Beans, brewing tools, merchandise, and gift-ready bundles.</p></div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-lg bg-white p-5 coffee-shadow">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" className="w-full rounded-md border border-[#2B160D]/15 px-4 py-3" />
          <label className="mt-5 block text-sm font-bold">Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full rounded-md border border-[#2B160D]/15 px-4 py-3">{categories.map((c) => <option key={c}>{c}</option>)}</select>
          <label className="mt-5 block text-sm font-bold">Price up to ₹{max}</label><input type="range" min="300" max="3000" value={max} onChange={(e) => setMax(Number(e.target.value))} className="mt-3 w-full accent-[#C99854]" />
          <label className="mt-5 block text-sm font-bold">Sort by</label><select value={sort} onChange={(e) => setSort(e.target.value)} className="mt-2 w-full rounded-md border border-[#2B160D]/15 px-4 py-3"><option value="featured">Best rated</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
        </aside>
        <div><div className="mb-4 flex justify-between"><strong>{filtered.length} products</strong><span className="text-sm text-[#7d6047]">Interactive filters enabled</span></div><div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((p) => <ProductCard key={p.id} product={p} />)}</div></div>
      </div>
    </section>
  );
}
