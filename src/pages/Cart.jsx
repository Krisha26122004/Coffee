import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, total, updateQty, removeFromCart, clearCart } = useCart();
  return (
    <section className="container py-10"><h1 className="brand-font text-5xl">Shopping Cart</h1>
      {cart.length === 0 ? <div className="mt-8 rounded-lg bg-white p-8 coffee-shadow"><p>Your cart is empty.</p><Link to="/shop" className="mt-4 inline-block rounded-md bg-[#2B160D] px-6 py-3 font-bold text-white">Shop Now</Link></div> :
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]"><div className="space-y-4">{cart.map((item) => <div key={item.cartKey} className="grid gap-4 rounded-lg bg-white p-4 coffee-shadow sm:grid-cols-[100px_1fr_auto]"><img src={item.image} className="h-24 w-24 rounded-md object-cover" /><div><h3 className="font-bold">{item.name}</h3><p className="text-sm text-[#7d6047]">{item.category}</p><p className="font-black">₹{item.price}</p></div><div className="flex items-center gap-3"><input type="number" min="1" value={item.quantity} onChange={(e) => updateQty(item.cartKey, Number(e.target.value))} className="w-16 rounded border p-2" /><button onClick={() => removeFromCart(item.cartKey)} className="rounded-md bg-red-50 p-3 text-red-700"><FiTrash2 /></button></div></div>)}</div><aside className="h-fit rounded-lg bg-white p-6 coffee-shadow"><h2 className="brand-font text-3xl">Summary</h2><p className="mt-5 flex justify-between"><span>Subtotal</span><strong>₹{total}</strong></p><p className="mt-2 flex justify-between"><span>Shipping</span><strong>{total > 999 ? "Free" : "₹99"}</strong></p><p className="mt-5 border-t pt-5 text-2xl font-black">₹{total + (total > 999 ? 0 : 99)}</p><Link to="/checkout" className="mt-5 block rounded-md bg-[#C99854] px-6 py-3 text-center font-bold text-[#2B160D]">Checkout</Link><button onClick={clearCart} className="mt-3 w-full rounded-md border border-[#2B160D]/20 px-6 py-3 font-bold">Clear Cart</button></aside></div>}
    </section>
  );
}
