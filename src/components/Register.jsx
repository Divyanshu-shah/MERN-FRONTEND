import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!obj.name || !obj.email || !obj.password)
      return toast.error("Fill all fields");
    setLoading(true);
    try {
      await axios.post(`${API_URL}/admin/signup`, obj);
      toast.success("Account created!");
      navigate("/login");
    } catch {
      toast.error("Registration failed");
    }
    setLoading(false);
  };

  return (
    <section className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl border border-[#e4e0d9] shadow-[0_2px_24px_rgba(0,0,0,0.06)] px-8 py-10 sm:px-10 sm:py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#2d2926] mb-1.5">
              Create Account
            </h2>
            <p className="text-[#5c564e] text-sm">
              Join the store today
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#5c564e] tracking-wide uppercase mb-2">
                Full Name
              </label>
              <input
                type="text"
                onChange={(e) => setObj({ ...obj, name: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}

                className="w-full h-12 px-4 rounded-xl border border-[#e4e0d9] bg-[#faf9f6] text-sm text-[#2d2926] placeholder:text-[#a8a49c] focus:outline-none focus:border-[#2d2926] focus:ring-2 focus:ring-[#2d2926]/5 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5c564e] tracking-wide uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setObj({ ...obj, email: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}

                className="w-full h-12 px-4 rounded-xl border border-[#e4e0d9] bg-[#faf9f6] text-sm text-[#2d2926] placeholder:text-[#a8a49c] focus:outline-none focus:border-[#2d2926] focus:ring-2 focus:ring-[#2d2926]/5 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5c564e] tracking-wide uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setObj({ ...obj, password: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}

                className="w-full h-12 px-4 rounded-xl border border-[#e4e0d9] bg-[#faf9f6] text-sm text-[#2d2926] placeholder:text-[#a8a49c] focus:outline-none focus:border-[#2d2926] focus:ring-2 focus:ring-[#2d2926]/5 transition-all"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-12 bg-[#2d2926] text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-full hover:bg-[#3d3530] transition-colors disabled:opacity-50 mt-1"
            >
              {loading ? "Creating..." : "Create Account"}
            </motion.button>
          </div>
        </div>

        <p className="text-center text-[#5c564e] text-sm mt-7">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2d2926] font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
