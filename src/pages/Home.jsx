import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCoffee, FaGoogle, FaHeadset, FaLock, FaRegEnvelope, FaRegUser, FaShieldAlt, FaShippingFast } from "react-icons/fa";
import { FiArrowRight, FiX } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const categoryCards = [
  ["Coffee Beans", "/shop?category=Coffee%20Beans", "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=900&q=85"],
  ["Cafe Merchandise", "/shop?category=Cafe%20Merchandise", "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=85"],
  ["Brewing Accessories", "/shop?category=Brewing%20Accessories", "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=85"],
  ["Gift Boxes", "/shop?category=Gift%20Boxes", "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=85"],
  ["Build Your Coffee Box", "/coffee-box", "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=85"],
];

const features = [
  ["Free Shipping", "On orders above \u20b9999", FaShippingFast],
  ["Premium Quality", "Handpicked & Roasted", FaCoffee],
  ["Secure Payments", "100% Safe & Secure", FaShieldAlt],
  ["24/7 Support", "We are here to help", FaHeadset],
];

export default function Home() {
  const featured = products.filter((p) => ["Ceramic Mugs", "Travel Tumblers", "Cafe Merchandise", "Coffee Beans"].includes(p.category)).slice(0, 8);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [modalForm, setModalForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  useEffect(() => {
    if (sessionStorage.getItem("brewnestSignupModalClosed")) return;
    const timer = setTimeout(() => setShowSignupModal(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const closeSignupModal = () => {
    sessionStorage.setItem("brewnestSignupModalClosed", "true");
    setShowSignupModal(false);
  };

  return (
    <>
      {showSignupModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#120804]/75 px-4 backdrop-blur-md animate-[fadeIn_.25s_ease-out]">
          <div className="relative w-full max-w-md rounded-[20px] border border-white/50 bg-[#FFF8EC]/90 p-7 text-[#2B160D] shadow-2xl shadow-black/40 backdrop-blur-xl animate-[modalRise_.35s_ease-out]">
            <button onClick={closeSignupModal} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/70 text-[#2B160D] hover:bg-[#2B160D] hover:text-white" aria-label="Close signup popup">
              <FiX />
            </button>
            <div className="pr-10">
              <div className="flex items-center gap-3 text-[#8B5A2B]">
                <FaCoffee className="text-3xl" />
                <span className="brand-font text-3xl">BrewNest</span>
              </div>
              <h2 className="mt-6 brand-font text-4xl">Join the BrewNest Family</h2>
              <p className="mt-3 leading-7 text-[#6f5644]">Create your account for curated coffee experiences, early access to new roasts, and exclusive member offers.</p>
            </div>
            <form className="mt-6 space-y-3">
              <PopupField icon={FaRegUser} placeholder="Full Name" value={modalForm.name} onChange={(value) => setModalForm({ ...modalForm, name: value })} />
              <PopupField icon={FaRegEnvelope} placeholder="Email" type="email" value={modalForm.email} onChange={(value) => setModalForm({ ...modalForm, email: value })} />
              <PopupField icon={FaLock} placeholder="Password" type="password" value={modalForm.password} onChange={(value) => setModalForm({ ...modalForm, password: value })} />
              <PopupField icon={FaLock} placeholder="Confirm Password" type="password" value={modalForm.confirmPassword} onChange={(value) => setModalForm({ ...modalForm, confirmPassword: value })} />
              <Link to="/register" onClick={closeSignupModal} className="block w-full rounded-xl bg-[#7A3F1E] py-4 text-center font-black text-white shadow-lg shadow-[#7A3F1E]/25 hover:bg-[#2B160D]">Sign Up</Link>
              <button type="button" className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#D8B884] bg-white/70 py-4 font-black text-[#4d2f1d] hover:bg-white">
                <FaGoogle className="text-[#8B5A2B]" /> Sign Up with Google
              </button>
            </form>
          </div>
        </div>
      )}

      <section className="relative min-h-[560px] overflow-hidden bg-[#1a0b04] text-white">
        <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1900&q=90" alt="BrewNest coffee mug with roasted beans" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-[#1f1008]/75 to-black/20" />
        <div className="container relative grid min-h-[560px] content-center py-16">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[.18em] text-[#ead7bd] md:text-base">Premium coffee & cafe merchandise</p>
          <h1 className="max-w-3xl brand-font text-5xl font-bold leading-tight md:text-7xl">Brew Your <span className="text-[#D4A25A]">Perfect</span><br />Moment</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#f4eadb] md:text-lg">Discover premium coffee beans, stylish cafe merchandise and build your own custom coffee box.</p>
          <div className="mt-8 flex flex-wrap gap-5">
            <Link to="/shop" className="rounded-md bg-[#D4A25A] px-8 py-4 font-bold text-white shadow-lg shadow-black/20 hover:bg-[#C99854]">Shop Now</Link>
            <Link to="/coffee-box" className="rounded-md border border-white/80 px-8 py-4 font-bold text-white hover:bg-white hover:text-[#2B160D]">Build Your Coffee Box</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2]">
        <div className="container grid gap-0 py-8 md:grid-cols-4">
          {features.map(([title, text, Icon], index) => (
            <div key={title} className={`flex items-center gap-5 px-5 py-4 ${index > 0 ? "md:border-l md:border-[#D8B884]/60" : ""}`}>
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#F1DEC0] text-2xl text-[#2B160D]"><Icon /></span>
              <span><strong className="block text-lg">{title}</strong><small className="text-sm text-[#5e4634]">{text}</small></span>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <div className="text-center">
          <h2 className="brand-font text-4xl md:text-5xl">Shop by Category</h2>
          <div className="mx-auto mt-4 flex w-56 items-center justify-center gap-4 text-[#8B5A2B]"><span className="h-px flex-1 bg-[#D4A25A]" /><FaCoffee /><span className="h-px flex-1 bg-[#D4A25A]" /></div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categoryCards.map(([title, path, image]) => (
            <Link key={title} to={path} className="group relative min-h-52 overflow-hidden rounded-lg bg-[#2B160D] coffee-shadow">
              <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-75 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 text-white"><h3 className="brand-font text-2xl leading-tight">{title}</h3><span className="mt-3 flex items-center gap-2 font-bold">Explore <FiArrowRight /></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><h2 className="brand-font text-4xl">Shop Now</h2><p className="mt-2 text-[#6f5644]">Aesthetic coffee mugs, premium tumblers, fresh roasts, and cafe gifts.</p></div>
          <Link to="/shop" className="font-bold text-[#8B5A2B] hover:text-[#C99854]">View all products</Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="container my-12">
        <div className="grid items-center gap-6 rounded-lg bg-[#F4E7D3] px-8 py-6 coffee-shadow md:grid-cols-[180px_1fr_420px_160px]">
          <img src="https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=500&q=85" alt="Coffee tumbler" className="mx-auto h-28 w-28 rounded-full object-cover" />
          <h2 className="brand-font text-2xl md:text-3xl">Love coffee? Get exclusive offers, new arrivals & brewing tips.</h2>
          <form className="flex flex-col gap-3 sm:flex-row"><input className="flex-1 rounded-md border border-[#D8B884] bg-white px-4 py-3" placeholder="Enter your email" /><button className="rounded-md bg-[#8B5A2B] px-6 py-3 font-bold text-white hover:bg-[#2B160D]">Subscribe</button></form>
          <img src="https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&w=500&q=85" alt="Coffee plant" className="hidden h-24 w-24 rounded-full object-cover md:block" />
        </div>
      </section>
    </>
  );
}

function PopupField({ icon: Icon, onChange, ...props }) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-[#D8B884] bg-white/60 px-4 py-3 focus-within:border-[#8B5A2B] focus-within:ring-2 focus-within:ring-[#E9C98D]">
      <Icon className="shrink-0 text-[#8B5A2B]" />
      <input {...props} onChange={(event) => onChange(event.target.value)} className="w-full bg-transparent font-semibold outline-none placeholder:text-[#8a6d55]" />
    </label>
  );
}
