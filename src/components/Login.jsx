import { AppContext } from "../App";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const smoothSpring = { type: "spring", stiffness: 300, damping: 25, mass: 0.8 };

export default function Login() {
  const { setUser, cart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    if (!form.email || !form.password) return toast.error("Please fill all fields");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/admin/login`, form);
      setUser(res.data);
      toast.success(`Welcome back, ${res.data.name}!`);
      cart.length > 0 ? navigate("/cart") : navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <section className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_8px_60px_rgba(0,0,0,0.08)] border border-[#e5e7ef] p-10 sm:p-12"
      >
        <h1 className="text-[28px] font-serif font-bold text-[#1a1f36] text-center mb-10">
          Sign In
        </h1>

        <div className="mb-6">
          <label className="block text-[14px] font-bold text-[#1a1f36] mb-2">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter your email"
            className="w-full h-[50px] px-6 rounded-full bg-[#f5f6fa] text-[14px] text-[#1a1f36] placeholder:text-[#b0b4c8] border border-[#e5e7ef] focus:outline-none focus:border-[#6366f1] focus:ring-3 focus:ring-[#6366f1]/10 transition-all duration-300"
          />
        </div>

        <div className="mb-8">
          <label className="block text-[14px] font-bold text-[#1a1f36] mb-2">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter your password"
            className="w-full h-[50px] px-6 rounded-full bg-[#f5f6fa] text-[14px] text-[#1a1f36] placeholder:text-[#b0b4c8] border border-[#e5e7ef] focus:outline-none focus:border-[#6366f1] focus:ring-3 focus:ring-[#6366f1]/10 transition-all duration-300"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          transition={smoothSpring}
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-[50px] bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white text-[15px] font-semibold rounded-full hover:shadow-[0_6px_24px_rgba(99,102,241,0.35)] transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </motion.button>

        <p className="text-center text-[#64698b] text-[14px] mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#6366f1] font-bold hover:underline">
            Create Account
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
