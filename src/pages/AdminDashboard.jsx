import { products } from "../data/products";

export default function AdminDashboard() {
  const revenue = products.reduce((s, p) => s + p.price * 3, 0);
  return <section className="container py-10"><h1 className="brand-font text-5xl">Admin Dashboard</h1><div className="mt-8 grid gap-5 md:grid-cols-3">{[["Products", products.length], ["Mock Orders", 24], ["Revenue", `₹${revenue}`]].map(([k, v]) => <div key={k} className="rounded-lg bg-white p-6 coffee-shadow"><p className="text-[#7d6047]">{k}</p><strong className="text-4xl">{v}</strong></div>)}</div><div className="mt-8 rounded-lg bg-white p-6 coffee-shadow"><h2 className="brand-font text-3xl">Product Inventory</h2><div className="mt-4 overflow-x-auto"><table className="w-full text-left"><tbody>{products.map((p) => <tr key={p.id} className="border-t"><td className="py-3 font-bold">{p.name}</td><td>{p.category}</td><td>₹{p.price}</td><td>{p.stock} stock</td></tr>)}</tbody></table></div></div></section>;
}
