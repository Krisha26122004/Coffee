import { FiInstagram, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#2B160D] text-[#F9F3EB]">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div><h3 className="brand-font text-3xl text-[#D4A25A]">BrewNest</h3><p className="mt-3 text-sm text-[#e4d5c4]">Premium coffee, cafe merchandise, and custom gift boxes crafted for slow mornings and thoughtful gifting.</p></div>
        <div><h4 className="font-bold">Shop</h4><p className="mt-3 text-sm text-[#e4d5c4]">Coffee Beans<br />Cafe Merchandise<br />Brewing Kits<br />Gift Boxes</p></div>
        <div><h4 className="font-bold">Support</h4><p className="mt-3 text-sm text-[#e4d5c4]">Track Order<br />Returns<br />Help & Support<br />Secure Payments</p></div>
        <div><h4 className="font-bold">Contact</h4><p className="mt-3 flex items-center gap-2 text-sm text-[#e4d5c4]"><FiMapPin /> Ahmedabad, India</p><p className="flex items-center gap-2 text-sm text-[#e4d5c4]"><FiPhone /> +91 98765 43210</p><p className="flex items-center gap-2 text-sm text-[#e4d5c4]"><FiMail /> hello@brewnest.cafe</p><FiInstagram className="mt-4 text-2xl text-[#D4A25A]" /></div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-[#d9c9b6]">© 2026 BrewNest. Crafted for coffee people.</div>
    </footer>
  );
}
