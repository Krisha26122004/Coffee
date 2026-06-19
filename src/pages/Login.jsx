import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaCoffee, FaEye, FaEyeSlash, FaHome, FaLock, FaRegEnvelope, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const authImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=90";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Backend is not running. Start it with npm.cmd run dev:full.");
    }
  };

  return (
    <AuthShell
      mode="login"
      headline="Welcome Back"
      text="Good coffee. Great vibes. Welcome back to BrewNest."
      quote="Life happens, coffee helps."
      perks={[
        ["Fast & Secure Login", FaHome],
        ["Your orders, saved", FaBoxOpen],
        ["Exclusive member perks", FaShieldAlt],
      ]}
    >
      <form onSubmit={submit} className="mt-8 space-y-5">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
        <AuthField
          icon={FaRegEnvelope}
          label="Email address"
          placeholder="Enter your email"
          type="email"
          value={form.email}
          onChange={(value) => setForm({ ...form, email: value })}
        />
        <AuthField
          icon={FaLock}
          label="Password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(value) => setForm({ ...form, password: value })}
          actionIcon={showPassword ? FaEyeSlash : FaEye}
          onAction={() => setShowPassword((current) => !current)}
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-[#6f5644]">
            <input type="checkbox" className="h-4 w-4 accent-[#8B5A2B]" />
            Remember me
          </label>
          <button type="button" className="font-semibold text-[#8B5A2B]">Forgot password?</button>
        </div>
        <button className="w-full rounded-lg bg-[#7A3F1E] py-4 font-black text-white shadow-lg shadow-[#7A3F1E]/25 hover:bg-[#2B160D]">Login</button>
        <div className="flex items-center gap-4 text-xs text-[#9a8068]">
          <span className="h-px flex-1 bg-[#D8B884]" />
          or
          <span className="h-px flex-1 bg-[#D8B884]" />
        </div>
        <p className="text-center text-sm text-[#6f5644]">
          Don't have an account? <Link className="font-black text-[#8B5A2B]" to="/register">Sign up</Link>
        </p>
      </form>
    </AuthShell>
  );
}

export function AuthShell({ mode, headline, text, quote, perks, children }) {
  const isSignup = mode === "signup";

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#1a0b04] text-white">
      <img src={authImage} alt="Warm BrewNest cafe" className="absolute inset-0 h-full w-full object-cover opacity-80 blur-[2px] scale-105" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#2B160D]/55 to-black/70" />
      <div className="container relative grid min-h-screen items-center gap-10 py-12 lg:grid-cols-[1fr_440px]">
        <div className="max-w-xl">
          <h1 className="brand-font text-5xl font-bold leading-tight md:text-6xl">{headline} <span className="text-[#D4A25A]">☕</span></h1>
          <p className="mt-5 text-xl leading-8 text-white">{text}</p>
          <div className="mt-8 space-y-5">
            {perks.map(([item, Icon]) => (
              <div key={item} className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#B06A35]/70 text-[#F4E7D3]"><Icon /></span>
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-16 text-lg font-semibold italic text-white/90">"{quote}"</p>
        </div>

        <div className="rounded-[20px] border border-white/45 bg-[#FFF8EC]/92 p-8 text-[#2B160D] shadow-2xl shadow-black/35 backdrop-blur-xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <FaCoffee className="text-4xl text-[#8B5A2B]" />
              <div>
                <h2 className="brand-font text-4xl leading-none">BrewNest</h2>
                <p className="text-sm font-semibold">Sip. Savor. Shop.</p>
              </div>
            </div>
            <h3 className="mt-8 brand-font text-3xl">{isSignup ? "Create your account" : "Login to your account"}</h3>
            <p className="mt-2 text-[#7d6047]">{isSignup ? "Let's get you started." : "Welcome back! Please enter your details."}</p>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

export function AuthField({ label, icon: Icon, actionIcon: ActionIcon, onAction, onChange, ...props }) {
  return (
    <label className="block text-sm font-black text-[#4d2f1d]">
      {label}
      <span className="mt-2 flex items-center gap-3 rounded-lg border border-[#D8B884] bg-white/55 px-4 py-3 focus-within:border-[#8B5A2B] focus-within:ring-2 focus-within:ring-[#E9C98D]">
        <Icon className="shrink-0 text-[#7A3F1E]" />
        <input {...props} onChange={(event) => onChange(event.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-[#9a8068]" required />
        {ActionIcon && (
          <button type="button" onClick={onAction} className="text-[#4d2f1d]" aria-label="Toggle password visibility">
            <ActionIcon />
          </button>
        )}
      </span>
    </label>
  );
}
