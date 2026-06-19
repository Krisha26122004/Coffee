import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import CoffeeBoxBuilder from "./pages/CoffeeBoxBuilder";
import AdminDashboard from "./pages/AdminDashboard";
import StaticPage from "./pages/StaticPage";
import BlogArticle from "./pages/BlogArticle";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { toast, setToast } = useAuth();

  return (
    <div className="min-h-screen bg-[#F9F3EB] text-[#2B160D] relative">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/coffee-box" element={<CoffeeBoxBuilder />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/about" element={<StaticPage title="About BrewNest" />} />
          <Route path="/blog" element={<StaticPage title="Brew Journal" />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/contact" element={<StaticPage title="Contact BrewNest" />} />
        </Routes>
      </main>
      <Footer />

      {/* Floating success toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] max-w-sm rounded-xl border border-[#D4A25A]/30 bg-[#FFF8EC] p-4 shadow-2xl animate-[modalRise_0.3s_ease] coffee-shadow">
          <div className="flex items-start gap-3">
            <span className="text-2xl">☕</span>
            <div className="flex-1">
              <h4 className="font-bold text-[#2B160D] text-sm">BrewNest Note</h4>
              <p className="text-xs text-[#7d6047] mt-1 leading-relaxed">{toast}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-gray-600 font-bold text-xs cursor-pointer ml-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
