import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiSearch, FiShoppingCart, FiUser, FiX, FiGift, FiLogOut, FiSettings } from "react-icons/fi";
import { FaCoffee, FaShippingFast } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const nav = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Coffee Box Builder", "/coffee-box"],
  ["About Us", "/about"],
  ["Blog", "/blog"],
  ["Contact", "/contact"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `relative py-3 text-base font-semibold ${
      isActive
        ? "text-[#2B160D] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#D4A25A]"
        : "text-[#2B160D] hover:text-[#C99854]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#2B160D]/10 bg-[#FFF8EC]/95 backdrop-blur">
      <div className="bg-gradient-to-r from-[#2B160D] via-[#3b1e0f] to-[#2B160D] text-xs text-[#F9F3EB]">
        <div className="container flex items-center justify-between py-2">
          <span className="flex items-center gap-2">
            <FaShippingFast /> Free Shipping on orders above {"\u20b9"}999
          </span>
          <span>Track Order | Help & Support</span>
        </div>
      </div>
      <div className="container flex items-center justify-between py-5">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center text-[#8B5A2B]">
            <FaCoffee className="text-4xl" />
          </span>
          <span>
            <strong className="brand-font text-3xl leading-none">BrewNest</strong>
            <small className="block text-xs text-[#2B160D]">Sip. Savor. Shop.</small>
          </span>
        </Link>
        <nav className="hidden items-center gap-10 lg:flex">
          {nav.map(([label, path]) => (
            <NavLink key={path} className={linkClass} to={path}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-6 text-3xl text-black">
          <Link to="/shop" title="Search">
            <FiSearch className="text-2xl" />
          </Link>
          
          {/* User Profile dropdown menu */}
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 text-2xl font-bold cursor-pointer text-[#2B160D] hover:text-[#C99854]"
                >
                  <FiUser className="text-2xl" />
                  <span className="hidden sm:inline text-sm font-bold tracking-tight">
                    {user.name.split(" ")[0]}
                  </span>
                </button>
              </div>
            ) : (
              <Link to="/login" title="Profile">
                <FiUser className="text-2xl" />
              </Link>
            )}

            {user && menuOpen && (
              <>
                {/* Backdrop to close dropdown on click outside */}
                <div onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40" />
                <div className="absolute right-0 mt-3 w-52 rounded-xl border border-[#D4A25A]/20 bg-white p-2 shadow-2xl z-50 text-sm text-[#2B160D] animate-[modalRise_0.2s_ease]">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-[10px] text-[#7d6047] font-bold uppercase">Logged in as</p>
                    <p className="text-sm font-extrabold truncate">{user.name}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold hover:bg-[#FFF8EC] hover:text-[#C99854] transition-colors"
                  >
                    <FiSettings className="text-lg" /> Profile Settings
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold hover:bg-[#FFF8EC] hover:text-[#C99854] transition-colors"
                  >
                    <FiGift className="text-lg" /> My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    <FiLogOut className="text-lg" /> Logout
                  </button>
                </div>
              </>
            )}
          </div>

          <Link to="/cart" className="relative" title="Cart">
            <FiShoppingCart className="text-2xl" />
            {count > 0 && (
              <span className="absolute -right-3 -top-3 grid h-5 w-5 place-items-center rounded-full bg-[#D4A25A] text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          
          <button onClick={() => setOpen(!open)} className="lg:hidden text-2xl">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="container grid gap-4 pb-5 lg:hidden">
          {nav.map(([label, path]) => (
            <NavLink
              key={path}
              onClick={() => setOpen(false)}
              className={linkClass}
              to={path}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
