import { Link } from "react-router-dom";
import { FiEye, FiShoppingCart, FiStar } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const normalized = { ...product, id: product._id || product.id, cartKey: product._id || product.id };
  return (
    <article className="group overflow-hidden rounded-lg bg-white coffee-shadow">
      <Link to={`/products/${normalized.id}`} className="block aspect-[4/3] overflow-hidden bg-[#eadccf]"><img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105" /></Link>
      <div className="p-5">
        <div className="flex items-center justify-between text-xs text-[#7d6047]"><span>{product.category}</span><span className="flex items-center gap-1"><FiStar className="fill-[#D4A25A] text-[#D4A25A]" />{product.rating}</span></div>
        <h3 className="mt-2 min-h-12 text-lg font-bold">{product.name}</h3>
        <p className="mt-1 text-2xl font-black text-[#2B160D]">₹{product.price}</p>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <button onClick={() => addToCart(normalized)} className="flex items-center justify-center gap-2 rounded-md bg-[#2B160D] px-4 py-3 text-sm font-bold text-white hover:bg-[#C99854]"><FiShoppingCart /> Add To Cart</button>
          <Link to={`/products/${normalized.id}`} className="grid place-items-center rounded-md border border-[#2B160D]/15 px-4 text-[#2B160D] hover:border-[#C99854] hover:text-[#C99854]" title="Quick View"><FiEye /></Link>
        </div>
      </div>
    </article>
  );
}
