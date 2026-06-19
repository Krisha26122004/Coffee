import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaEye, FaEyeSlash, FaHeart, FaLock, FaPhoneAlt, FaRegEnvelope, FaRegUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { AuthField, AuthShell } from "./Login";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Backend is not running. Start it with npm.cmd run dev:full.");
    }
  };

  return (
    <AuthShell
      mode="signup"
      headline="Join the BrewNest Family ♡"
      text="Create your account and discover handcrafted coffee experiences."
      quote="Brew more. Save more. Enjoy more."
      perks={[
        ["Track your orders", FaBoxOpen],
        ["Save your favorites", FaHeart],
        ["Exclusive offers & rewards", FaRegEnvelope],
      ]}
    >
      <form onSubmit={submit} className="mt-7 space-y-4">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
        <AuthField icon={FaRegUser} label="Full name" placeholder="Enter your full name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField icon={FaRegEnvelope} label="Email address" placeholder="Enter your email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
          <AuthField icon={FaPhoneAlt} label="Phone number" placeholder="Enter your phone" type="tel" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
        </div>
        <AuthField icon={FaLock} label="Password" placeholder="Create a password" type={showPassword ? "text" : "password"} minLength="6" value={form.password} onChange={(value) => setForm({ ...form, password: value })} actionIcon={showPassword ? FaEyeSlash : FaEye} onAction={() => setShowPassword((current) => !current)} />
        <AuthField icon={FaLock} label="Confirm password" placeholder="Confirm your password" type={showConfirm ? "text" : "password"} minLength="6" value={form.confirmPassword} onChange={(value) => setForm({ ...form, confirmPassword: value })} actionIcon={showConfirm ? FaEyeSlash : FaEye} onAction={() => setShowConfirm((current) => !current)} />
        <label className="flex items-start gap-2 text-sm text-[#6f5644]">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[#8B5A2B]" required />
          I agree to the <span className="font-black text-[#8B5A2B]">Terms & Conditions</span> and <span className="font-black text-[#8B5A2B]">Privacy Policy</span>
        </label>
        <button className="w-full rounded-lg bg-[#7A3F1E] py-4 font-black text-white shadow-lg shadow-[#7A3F1E]/25 hover:bg-[#2B160D]">Sign up</button>
        <p className="text-center text-sm text-[#6f5644]">
          Already have an account? <Link className="font-black text-[#8B5A2B]" to="/login">Login</Link>
        </p>
      </form>
    </AuthShell>
  );
}
