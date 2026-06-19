import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FiMinus, FiPlus, FiStar } from "react-icons/fi";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id) || products[0];
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const add = () => addToCart({ ...product, cartKey: product.id }, qty);
  return (
    <section className="container py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div><img src={product.image} alt={product.name} className="aspect-square w-full rounded-lg object-cover coffee-shadow" /><div className="mt-4 grid grid-cols-3 gap-3">{[product.image, ...related.map((p) => p.image)].slice(0, 3).map((img) => <img key={img} src={img} className="aspect-video rounded-md object-cover" />)}</div></div>
        <div className="rounded-lg bg-white p-6 coffee-shadow">
          <p className="font-bold text-[#C99854]">{product.category}</p><h1 className="mt-2 brand-font text-5xl">{product.name}</h1>
          <p className="mt-3 flex items-center gap-2"><FiStar className="fill-[#D4A25A] text-[#D4A25A]" /> {product.rating} rating • {product.stock} in stock</p>
          <p className="mt-5 text-[#6f5644]">{product.description}</p><p className="mt-6 text-4xl font-black">₹{product.price}</p>
          <div className="mt-6 flex items-center gap-3"><button onClick={() => setQty(Math.max(1, qty - 1))} className="rounded-md border p-3"><FiMinus /></button><span className="w-10 text-center text-xl font-bold">{qty}</span><button onClick={() => setQty(qty + 1)} className="rounded-md border p-3"><FiPlus /></button></div>
          <div className="mt-6 flex flex-wrap gap-3"><button onClick={add} className="rounded-md bg-[#2B160D] px-7 py-4 font-bold text-white">Add To Cart</button><button onClick={() => { add(); navigate("/checkout"); }} className="rounded-md bg-[#C99854] px-7 py-4 font-bold text-[#2B160D]">Buy Now</button></div>
          <div className="mt-8 rounded-md bg-[#F9F3EB] p-4"><h3 className="font-bold">Product Reviews</h3><p className="mt-2 text-sm text-[#6f5644]">“Beautiful packaging, rich aroma, and fast delivery. BrewNest feels properly premium.”</p></div>
        </div>
      </div>
      <h2 className="mt-14 brand-font text-4xl">Related Products</h2><div className="mt-6 grid gap-6 md:grid-cols-3">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      <Link to="/shop" className="mt-8 inline-block font-bold text-[#C99854]">Back to shop</Link>
    </section>
  );
}
