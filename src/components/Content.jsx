import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineMinus, HiOutlineSparkles } from "react-icons/hi2";

const smoothSpring = { type: "spring", stiffness: 300, damping: 25, mass: 0.8 };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

function Content() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const getImageUrl = (img) => {
    if (!img) return "";
    return `${API_URL}${img.startsWith("/") ? img : `/${img}`}`;
  };

  useEffect(() => {
    (async () => {
      try { const res = await axios.get(`${API_URL}/products`); setProducts(res.data); }
      catch { toast.error("Failed to load products"); }
      setLoading(false);
    })();
  }, []);

  const addToCart = (p) => {
    if (!cart.find((i) => i._id === p._id)) {
      setCart([...cart, { ...p, quantity: 1 }]);
      toast.success("Added to bag");
    }
  };

  const inc = (id) => setCart(cart.map((i) => (i._id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const dec = (id) => setCart(cart.map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i)).filter((i) => i.quantity > 0));
  const getQty = (id) => cart.find((i) => i._id === id)?.quantity || 0;

  if (loading) {
    return (
      <div className="px-6 sm:px-10 lg:px-16 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05, duration: 0.4 }}>
              <div className="aspect-[3/4] shimmer-bg rounded-2xl mb-4" />
              <div className="h-3 w-24 shimmer-bg rounded-full mb-2" />
              <div className="h-3 w-16 shimmer-bg rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <section id="products" className="px-6 sm:px-10 lg:px-16 py-10 sm:py-16">
        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7" variants={containerVariants} initial="hidden" animate="visible">
          {products.map((product) => {
            const qty = getQty(product._id);
            return (
              <motion.div key={product._id} variants={cardVariants}
                className="product-card rounded-2xl overflow-hidden flex flex-col"
                style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}
              >
                <div className="relative aspect-[3/4] overflow-hidden" style={{ background: "var(--c-border-light)" }}>
                  <img src={getImageUrl(product.imageUrl)} alt={product.name} className="product-img w-full h-full object-cover" loading="lazy" />
                  <div className="product-overlay absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center pb-5">
                    {qty === 0 && (
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }} transition={smoothSpring} onClick={() => addToCart(product)}
                        className="btn-primary h-10 px-6 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 shadow-lg">
                        <HiOutlinePlus className="w-3.5 h-3.5" /><span>Add to Bag</span>
                      </motion.button>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h3 className="text-[13px] sm:text-sm font-semibold truncate mb-0.5" style={{ color: "var(--c-text)" }}>{product.name}</h3>
                  <p className="text-[11px] sm:text-xs line-clamp-2 mb-4 flex-1 leading-relaxed" style={{ color: "var(--c-text-secondary)" }}>{product.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-base sm:text-lg font-bold tracking-tight" style={{ color: "var(--c-text)" }}>₹{product.price}</span>
                    <AnimatePresence mode="wait">
                      {qty > 0 ? (
                        <motion.div key="controls" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={smoothSpring}
                          className="flex items-center gap-1 rounded-full p-1"
                          style={{ background: "var(--c-surface-alt)", border: "1px solid var(--c-border)" }}>
                          <motion.button whileTap={{ scale: 0.85 }} transition={smoothSpring} onClick={() => dec(product._id)}
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{ color: "var(--c-text-secondary)" }}>
                            <HiOutlineMinus className="w-3 h-3" />
                          </motion.button>
                          <motion.span key={qty} initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={smoothSpring}
                            className="font-bold text-[12px] w-5 text-center" style={{ color: "var(--c-text)" }}>{qty}</motion.span>
                          <motion.button whileTap={{ scale: 0.85 }} transition={smoothSpring} onClick={() => inc(product._id)}
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{ color: "var(--c-text-secondary)" }}>
                            <HiOutlinePlus className="w-3 h-3" />
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.button key="add" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                          whileTap={{ scale: 0.92 }} transition={smoothSpring} onClick={() => addToCart(product)}
                          className="h-8 px-4 bg-[#6366f1] text-white text-[10px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-[#4f46e5] transition-colors duration-300 flex items-center justify-center whitespace-nowrap shadow-sm">
                          Add
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {!loading && products.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="text-center py-32 px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: "var(--c-border-light)" }}>
            <HiOutlineSparkles className="w-8 h-8 text-[#6366f1] animate-float" />
          </div>
          <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: "var(--c-text)" }}>No products yet</h3>
          <p className="text-sm" style={{ color: "var(--c-text-secondary)" }}>New items are on the way. Check back soon!</p>
        </motion.div>
      )}
    </div>
  );
}

export default Content;
