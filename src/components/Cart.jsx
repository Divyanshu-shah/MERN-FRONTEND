import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HiOutlinePlus, HiOutlineMinus, HiOutlineTrash, HiOutlineShoppingBag,
  HiOutlineArrowLeft, HiOutlineLockClosed, HiOutlineTruck,
} from "react-icons/hi2";

const smoothSpring = { type: "spring", stiffness: 300, damping: 25, mass: 0.8 };

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -20,
    transition: { opacity: { duration: 0.15 }, x: { duration: 0.2, ease: "easeIn" } } },
};

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [orderValue, setOrderValue] = useState(0);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const getImageUrl = (img) => { if (!img) return ""; return `${API_URL}${img.startsWith("/") ? img : `/${img}`}`; };
  const inc = (id) => setCart(cart.map((i) => (i._id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const dec = (id) => setCart(cart.map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i)).filter((i) => i.quantity > 0));
  const remove = (id) => { setCart(cart.filter((i) => i._id !== id)); toast.success("Removed from bag"); };

  useEffect(() => { setOrderValue(cart.reduce((s, i) => s + i.quantity * i.price, 0)); }, [cart]);

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/orders/place-order`, { email: user.email, cart, orderValue }, { headers: { Authorization: `Bearer ${token}` } });
      setCart([]); toast.success("Order placed successfully!"); navigate("/orders");
    } catch { toast.error("Failed to place order"); }
    setPlacing(false);
  };

  if (cart.length === 0) {
    return (
      <section className="min-h-[calc(100vh-180px)] flex items-center justify-center px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="text-center max-w-sm">
          <div className="w-28 h-28 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ background: "var(--c-border-light)" }}>
            <HiOutlineShoppingBag className="w-12 h-12 text-[#6366f1] animate-float" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3" style={{ color: "var(--c-text)" }}>Your bag is empty</h1>
          <p className="text-sm mb-10 leading-relaxed" style={{ color: "var(--c-text-secondary)" }}>Looks like you haven't added anything yet.<br />Let's find something you'll love.</p>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={smoothSpring} onClick={() => navigate("/")}
            className="btn-primary h-12 px-10 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase inline-flex items-center gap-2">
            <span>Start Shopping</span>
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-8 sm:py-12 max-w-6xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <motion.button whileHover={{ x: -3 }} transition={smoothSpring} onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold mb-6 transition-colors duration-300 link-underline"
          style={{ color: "var(--c-text-secondary)" }}>
          <HiOutlineArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
        </motion.button>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: "var(--c-text)" }}>Your Bag</h1>
          <p className="text-sm mt-1.5" style={{ color: "var(--c-text-secondary)" }}>{cart.length} {cart.length === 1 ? "item" : "items"} · ₹{orderValue} total</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="lg:col-span-3">
            <div style={{ borderTop: "1px solid var(--c-border)" }}>
              <AnimatePresence>
                {cart.map((item, i) => item.quantity > 0 ? (
                  <motion.div key={item._id} layout variants={itemVariants} initial="initial" animate="animate" exit="exit"
                    transition={{ layout: { type: "spring", stiffness: 350, damping: 30 }, default: { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] } }}
                    className="flex items-start gap-5 py-6 group"
                    style={{ borderBottom: "1px solid var(--c-border-light)" }}>
                    <motion.div whileHover={{ scale: 1.04 }} transition={smoothSpring} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0" style={{ background: "var(--c-border-light)" }}>
                      <img src={getImageUrl(item.imageUrl)} alt={item.name} className="w-full h-full object-cover" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold mb-0.5 truncate" style={{ color: "var(--c-text)" }}>{item.name}</h3>
                      <p className="text-sm mb-4" style={{ color: "var(--c-text-secondary)" }}>₹{item.price}</p>
                      <div className="flex items-center gap-4">
                        <div className="inline-flex items-center rounded-full h-9" style={{ border: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
                          <motion.button whileTap={{ scale: 0.85 }} transition={smoothSpring} onClick={() => dec(item._id)} className="w-9 h-9 flex items-center justify-center transition-colors duration-300" style={{ color: "var(--c-text-secondary)" }}><HiOutlineMinus className="w-3 h-3" /></motion.button>
                          <motion.span key={item.quantity} initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={smoothSpring} className="w-8 text-center text-sm font-semibold" style={{ color: "var(--c-text)" }}>{item.quantity}</motion.span>
                          <motion.button whileTap={{ scale: 0.85 }} transition={smoothSpring} onClick={() => inc(item._id)} className="w-9 h-9 flex items-center justify-center transition-colors duration-300" style={{ color: "var(--c-text-secondary)" }}><HiOutlinePlus className="w-3 h-3" /></motion.button>
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={smoothSpring} onClick={() => remove(item._id)}
                          className="text-[11px] tracking-[0.1em] uppercase font-semibold transition-colors duration-300" style={{ color: "var(--c-text-muted)" }}>Remove</motion.button>
                      </div>
                    </div>
                    <motion.span key={item.price * item.quantity} initial={{ opacity: 0.5, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                      className="text-sm font-bold whitespace-nowrap pt-0.5" style={{ color: "var(--c-text)" }}>₹{item.price * item.quantity}</motion.span>
                  </motion.div>
                ) : null)}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-28 rounded-2xl p-6 sm:p-7"
              style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", boxShadow: "var(--c-card-shadow)" }}>
              <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-6" style={{ color: "var(--c-text-muted)" }}>Order Summary</h2>
              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between"><span style={{ color: "var(--c-text-secondary)" }}>Subtotal</span>
                  <motion.span key={orderValue} initial={{ opacity: 0.5, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={smoothSpring} className="font-medium" style={{ color: "var(--c-text)" }}>₹{orderValue}</motion.span></div>
                <div className="flex justify-between"><span style={{ color: "var(--c-text-secondary)" }}>Shipping</span>
                  <span className="text-[#10b981] font-medium flex items-center gap-1"><HiOutlineTruck className="w-3.5 h-3.5" />Free</span></div>
                <div className="pt-4 mt-4 flex justify-between items-baseline" style={{ borderTop: "1px solid var(--c-border-light)" }}><span className="font-semibold" style={{ color: "var(--c-text)" }}>Total</span>
                  <motion.span key={`t-${orderValue}`} initial={{ opacity: 0.5, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={smoothSpring} className="text-xl font-bold font-serif" style={{ color: "var(--c-text)" }}>₹{orderValue}</motion.span></div>
              </div>
              {user?.email ? (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={smoothSpring} onClick={placeOrder} disabled={placing}
                  className="w-full mt-7 btn-primary h-12 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 disabled:opacity-50">
                  <HiOutlineLockClosed className="w-3.5 h-3.5" /><span>{placing ? "Placing Order..." : "Place Order"}</span>
                </motion.button>
              ) : (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={smoothSpring} onClick={() => navigate("/login")}
                  className="w-full mt-7 btn-primary h-12 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center justify-center">Sign In to Checkout</motion.button>
              )}
              <p className="text-[10px] text-center mt-5 tracking-wide flex items-center justify-center gap-1.5" style={{ color: "var(--c-text-muted)" }}>
                <HiOutlineLockClosed className="w-3 h-3" /> Secure checkout · Free shipping on all orders</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
