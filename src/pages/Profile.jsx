import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  return <section className="container py-10"><div className="rounded-lg bg-white p-8 coffee-shadow"><h1 className="brand-font text-5xl">Profile</h1><p className="mt-4 text-xl font-bold">{user?.name}</p><p className="text-[#7d6047]">{user?.email}</p><p className="mt-2 rounded-full bg-[#F9F3EB] px-4 py-2 inline-block text-sm font-bold">Role: {user?.role || "user"}</p><div className="mt-6 flex gap-3"><Link to="/orders" className="rounded-md bg-[#C99854] px-5 py-3 font-bold text-[#2B160D]">My Orders</Link><button onClick={logout} className="rounded-md bg-[#2B160D] px-5 py-3 font-bold text-white">Logout</button></div></div></section>;
}
