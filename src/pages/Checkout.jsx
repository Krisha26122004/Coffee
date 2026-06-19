import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMapPin, FiPhone, FiCheckCircle, FiCreditCard, FiTruck, FiChevronLeft } from "react-icons/fi";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", address: "", phone: "", paymentMethod: "Cash on Delivery" });
  const [success, setSuccess] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const navigate = useNavigate();

  const shipping = total > 999 ? 0 : 99;
  const grandTotal = total + shipping;

  const handleRazorpayPayment = async (orderData) => {
    // Mock Payment Flow since user does not want to configure Razorpay keys
    setIsPlacing(true);
    
    // Simulate network request for payment gateway
    setTimeout(() => {
      // 4. Save Final Order to DB (simulating success)
      const finalOrder = { ...orderData, paymentStatus: "Paid (Mocked)", razorpayPaymentId: "mock_payment_123" };
      saveOrderLocallyAndDB(finalOrder);
    }, 2000);
  };

  const saveOrderLocallyAndDB = async (order) => {
    const saved = JSON.parse(localStorage.getItem("brewnestOrders") || "[]");
    localStorage.setItem("brewnestOrders", JSON.stringify([{ ...order, _id: `LOCAL${Date.now()}` }, ...saved]));

    await api.post("/orders/create", order).catch(() => null);

    setIsPlacing(false);
    setSuccess(true);
    clearCart();
    setTimeout(() => navigate("/orders"), 2500);
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsPlacing(true);
    const order = {
      products: cart,
      shippingAddress: form,
      paymentMethod: form.paymentMethod,
      totalPrice: grandTotal,
      orderStatus: "Processing"
    };

    if (form.paymentMethod === "Razorpay Online") {
      handleRazorpayPayment(order);
    } else {
      saveOrderLocallyAndDB(order);
    }
  };

  if (success) {
    return (
      <section className="container py-20 max-w-xl text-center animate-[modalRise_0.3s_ease]">
        <div className="rounded-2xl bg-white p-10 coffee-shadow border border-orange-50">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600 mb-6">
            <FiCheckCircle className="text-5xl animate-bounce" />
          </div>
          <h1 className="brand-font text-4xl font-bold text-[#2B160D]">Order Placed Successfully!</h1>
          <p className="mt-4 text-[#7d6047] text-sm">
            Thank you for shopping with BrewNest! We're preparing your package and custom blends.
          </p>
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-500">
            Redirecting to your orders to track shipment status...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-8 max-w-7xl px-4">
      {/* Back to Cart link */}
      <button
        onClick={() => navigate("/cart")}
        className="mb-6 flex items-center gap-1.5 text-sm font-bold text-[#7d6047] hover:text-[#2B160D]"
      >
        <FiChevronLeft /> Back to Cart
      </button>

      <div className="mb-6">
        <h1 className="brand-font text-4xl md:text-5xl font-bold text-[#2B160D]">Secure Checkout</h1>
        <p className="text-[#7d6047] text-sm mt-1">
          Provide your shipping details below to place your order.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        {/* Left Side: Checkout Form */}
        <form onSubmit={submit} className="space-y-6">
          {/* Shipping Address Box */}
          <div className="rounded-2xl bg-white p-6 md:p-8 coffee-shadow border border-orange-50 space-y-5">
            <h2 className="brand-font text-2xl font-bold text-[#2B160D]">
              Shipping Details
            </h2>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-[#4d2f1d]">
                Recipient Name
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 bg-[#FFFCF7] px-4 py-3.5 focus-within:border-[#C99854] focus-within:ring-2 focus-within:ring-[#C99854]/10">
                  <FiUser className="text-[#7A3F1E] shrink-0" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="w-full bg-transparent text-sm font-semibold outline-none placeholder-gray-400"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </label>

              <label className="block text-sm font-bold text-[#4d2f1d]">
                Delivery Address
                <div className="mt-2 flex items-start gap-3 rounded-xl border border-gray-200 bg-[#FFFCF7] px-4 py-3.5 focus-within:border-[#C99854] focus-within:ring-2 focus-within:ring-[#C99854]/10">
                  <FiMapPin className="text-[#7A3F1E] mt-1 shrink-0" />
                  <textarea
                    required
                    rows="3"
                    placeholder="Enter complete shipping address"
                    className="w-full bg-transparent text-sm font-semibold outline-none placeholder-gray-400"
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>
              </label>

              <label className="block text-sm font-bold text-[#4d2f1d]">
                Phone Number
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 bg-[#FFFCF7] px-4 py-3.5 focus-within:border-[#C99854] focus-within:ring-2 focus-within:ring-[#C99854]/10">
                  <FiPhone className="text-[#7A3F1E] shrink-0" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter 10-digit number"
                    className="w-full bg-transparent text-sm font-semibold outline-none placeholder-gray-400"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Payment Details Box */}
          <div className="rounded-2xl bg-white p-6 md:p-8 coffee-shadow border border-orange-50 space-y-4">
            <h2 className="brand-font text-2xl font-bold text-[#2B160D]">
              Payment Method
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label
                className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${
                  form.paymentMethod === "Cash on Delivery"
                    ? "border-[#C99854] bg-[#fff5e8] font-bold"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={form.paymentMethod === "Cash on Delivery"}
                  className="accent-[#C99854] h-4 w-4"
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                />
                <div className="flex items-center gap-2 text-[#2B160D]">
                  <FiTruck className="text-xl" />
                  <span className="text-sm">Cash on Delivery</span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${
                  form.paymentMethod === "Razorpay Online"
                    ? "border-[#C99854] bg-[#fff5e8] font-bold"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Razorpay Online"
                  checked={form.paymentMethod === "Razorpay Online"}
                  className="accent-[#C99854] h-4 w-4"
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                />
                <div className="flex items-center gap-2 text-[#2B160D]">
                  <FiCreditCard className="text-xl" />
                  <span className="text-sm">Online Payment (Mock)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            disabled={!cart.length || isPlacing}
            className="w-full rounded-xl bg-[#2B160D] py-4 text-center font-extrabold text-white hover:bg-[#C99854] hover:text-[#2B160D] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
          >
            {isPlacing ? "Processing Order..." : `Place Order (₹${grandTotal})`}
          </button>
        </form>

        {/* Right Side: Order Summary Card */}
        <aside className="h-fit rounded-2xl bg-white p-6 coffee-shadow border border-orange-50 lg:sticky lg:top-24 space-y-6">
          <h2 className="brand-font text-2xl font-bold text-[#2B160D] border-b pb-3">
            Your Order Summary
          </h2>

          {/* Cart items list */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 divide-y divide-gray-50">
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-3 pt-3 first:pt-0">
                {item.image && (
                  <div className="h-12 w-12 rounded-lg bg-gray-50 border overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#2B160D] truncate">{item.name}</h4>
                  <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-bold text-[#C99854]">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing breakdowns */}
          <div className="border-t pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-[#7d6047]">
              <span>Cart Subtotal</span>
              <span className="font-bold text-[#2B160D]">₹{total}</span>
            </div>
            <div className="flex justify-between text-[#7d6047]">
              <span>Shipping Fee</span>
              <span className="font-bold text-[#2B160D]">
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between items-end">
              <div>
                <span className="text-xs text-[#7d6047] block font-medium">Grand Total</span>
                <span className="text-3xl font-black text-[#2B160D]">₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
