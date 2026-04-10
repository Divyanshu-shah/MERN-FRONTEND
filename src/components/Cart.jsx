import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineTrash,
  HiOutlineShoppingBag,
  HiOutlineArrowLeft,
  HiOutlineLockClosed,
  HiOutlineTruck,
} from "react-icons/hi2";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [orderValue, setOrderValue] = useState(0);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const getImageUrl = (img) => {
    if (!img) return "";
    return `${API_URL}${img.startsWith("/") ? img : `/${img}`}`;
  };

  const inc = (id) =>
    setCart(cart.map((i) => (i._id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const dec = (id) =>
    setCart(
      cart
        .map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  const remove = (id) => {
    setCart(cart.filter((i) => i._id !== id));
    toast.success("Removed from bag");
  };

  useEffect(() => {
    setOrderValue(cart.reduce((s, i) => s + i.quantity * i.price, 0));
  }, [cart]);

  const placeOrder = async () => {
    setPlacing(true);
    try {
      await axios.post(`${API_URL}/orders/place-order`, {
        email: user.email,
        cart,
        orderValue,
      });
      setCart([]);
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch {
      toast.error("Failed to place order");
    }
    setPlacing(false);
  };

  // ═══ EMPTY CART ═══
  if (cart.length === 0) {
    return (
      <section className="min-h-[calc(100vh-180px)] flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-sm"
        >
          <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-[#f0ede8] flex items-center justify-center">
            <HiOutlineShoppingBag className="w-12 h-12 text-[#8a857c] animate-float" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2d2926] mb-3">
            Your bag is empty
          </h1>
          <p className="text-[#5c564e] text-sm mb-10 leading-relaxed">
            Looks like you haven't added anything yet.
            <br />
            Let's find something you'll love.
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary h-12 px-10 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase inline-flex items-center gap-2"
          >
            <span>Start Shopping</span>
          </button>
        </motion.div>
      </section>
    );
  }

  // ═══ CART WITH ITEMS ═══
  return (
    <section className="px-6 sm:px-10 lg:px-16 py-8 sm:py-12 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back + Title */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#5c564e] hover:text-[#2d2926] font-semibold mb-6 transition-colors link-underline"
        >
          <HiOutlineArrowLeft className="w-3.5 h-3.5" />
          Continue Shopping
        </button>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2d2926]">
            Your Bag
          </h1>
          <p className="text-[#5c564e] text-sm mt-1.5">
            {cart.length} {cart.length === 1 ? "item" : "items"} · ₹{orderValue} total
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* ═══ ITEMS LIST ═══ */}
          <div className="lg:col-span-3">
            <div className="border-t border-[#e8e5de]">
              <AnimatePresence>
                {cart.map((item) =>
                  item.quantity > 0 ? (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-5 py-6 border-b border-[#f0ede8] group"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#f0ede8] shrink-0">
                        <img
                          src={getImageUrl(item.imageUrl)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[#2d2926] mb-0.5 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#7a6e60] mb-4">₹{item.price}</p>

                        {/* Quantity + Delete */}
                        <div className="flex items-center gap-4">
                          <div className="inline-flex items-center border border-[#e8e5de] rounded-full h-9 bg-white">
                            <button
                              onClick={() => dec(item._id)}
                              className="w-9 h-9 flex items-center justify-center text-[#5c564e] hover:text-[#2d2926] transition-colors active:scale-90"
                            >
                              <HiOutlineMinus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold text-[#2d2926]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => inc(item._id)}
                              className="w-9 h-9 flex items-center justify-center text-[#5c564e] hover:text-[#2d2926] transition-colors active:scale-90"
                            >
                              <HiOutlinePlus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => remove(item._id)}
                            className="text-[11px] tracking-[0.1em] uppercase text-[#8a857c] hover:text-[#c8553a] font-semibold transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Line total */}
                      <span className="text-sm font-bold text-[#2d2926] whitespace-nowrap pt-0.5">
                        ₹{item.price * item.quantity}
                      </span>
                    </motion.div>
                  ) : null
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ═══ ORDER SUMMARY ═══ */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 bg-white rounded-2xl p-6 sm:p-7 border border-[#e8e5de]/60 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
              <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#7a6e60] mb-6">
                Order Summary
              </h2>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#5c564e]">Subtotal</span>
                  <span className="text-[#2d2926] font-medium">₹{orderValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5c564e]">Shipping</span>
                  <span className="text-[#4a8c6e] font-medium flex items-center gap-1">
                    <HiOutlineTruck className="w-3.5 h-3.5" />
                    Free
                  </span>
                </div>
                <div className="border-t border-[#f0ede8] pt-4 mt-4 flex justify-between items-baseline">
                  <span className="text-[#2d2926] font-semibold">Total</span>
                  <span className="text-xl font-bold text-[#2d2926] font-serif">
                    ₹{orderValue}
                  </span>
                </div>
              </div>

              {user?.email ? (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={placeOrder}
                  disabled={placing}
                  className="w-full mt-7 btn-primary h-12 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <HiOutlineLockClosed className="w-3.5 h-3.5" />
                  <span>{placing ? "Placing Order..." : "Place Order"}</span>
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/login")}
                  className="w-full mt-7 btn-primary h-12 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center justify-center"
                >
                  Sign In to Checkout
                </motion.button>
              )}

              <p className="text-[10px] text-[#8a857c] text-center mt-5 tracking-wide flex items-center justify-center gap-1.5">
                <HiOutlineLockClosed className="w-3 h-3" />
                Secure checkout · Free shipping on all orders
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
