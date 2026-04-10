import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineSparkles,
} from "react-icons/hi2";

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
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
      } catch {
        toast.error("Failed to load products");
      }
      setLoading(false);
    })();
  }, []);

  const addToCart = (p) => {
    if (!cart.find((i) => i._id === p._id)) {
      setCart([...cart, { ...p, quantity: 1 }]);
      toast.success("Added to bag");
    }
  };

  const inc = (id) =>
    setCart(cart.map((i) => (i._id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const dec = (id) =>
    setCart(
      cart
        .map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  const getQty = (id) => cart.find((i) => i._id === id)?.quantity || 0;

  // ═══ SKELETON LOADING ═══
  if (loading) {
    return (
      <div className="px-6 sm:px-10 lg:px-16 py-10 sm:py-16">
        <div className="h-4 w-32 shimmer-bg rounded-full mb-2" />
        <div className="h-8 w-48 shimmer-bg rounded-full mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <div className="aspect-[3/4] shimmer-bg rounded-2xl mb-4" />
              <div className="h-3 w-24 shimmer-bg rounded-full mb-2" />
              <div className="h-3 w-16 shimmer-bg rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ═══════════════════════════════════════════
          PRODUCT GRID
          ═══════════════════════════════════════════ */}
      <section id="products" className="px-6 sm:px-10 lg:px-16 py-10 sm:py-16">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#7a6e60] block mb-2">
              Our Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2d2926] leading-tight">
              All Products
            </h2>
            <p className="text-[#5c564e] text-sm mt-2">
              {products.length} carefully selected items
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {products.map((product, i) => {
            const qty = getQty(product._id);
            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="product-card rounded-2xl overflow-hidden bg-white border border-[#e8e5de]/60 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f0ede8]">
                  <img
                    src={getImageUrl(product.imageUrl)}
                    alt={product.name}
                    className="product-img w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Hover overlay with quick-add */}
                  <div className="product-overlay absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center pb-5">
                    {qty === 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(product)}
                        className="btn-primary h-10 px-6 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 shadow-lg"
                      >
                        <HiOutlinePlus className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h3 className="text-[13px] sm:text-sm font-semibold text-[#2d2926] truncate mb-0.5">
                    {product.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#7a6e60] line-clamp-2 mb-4 flex-1 leading-relaxed">
                    {product.desc}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-base sm:text-lg font-bold text-[#2d2926] tracking-tight">
                      ₹{product.price}
                    </span>

                    <AnimatePresence mode="wait">
                      {qty > 0 ? (
                        <motion.div
                          key="controls"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex items-center gap-1 bg-[#f8f7f4] rounded-full p-1 border border-[#e8e5de]"
                        >
                          <button
                            onClick={() => dec(product._id)}
                            className="w-7 h-7 rounded-full hover:bg-white text-[#5c564e] hover:text-[#2d2926] flex items-center justify-center transition-all duration-200 active:scale-90"
                          >
                            <HiOutlineMinus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-[12px] w-5 text-center text-[#2d2926]">
                            {qty}
                          </span>
                          <button
                            onClick={() => inc(product._id)}
                            className="w-7 h-7 rounded-full hover:bg-white text-[#5c564e] hover:text-[#2d2926] flex items-center justify-center transition-all duration-200 active:scale-90"
                          >
                            <HiOutlinePlus className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="add"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product)}
                          className="h-8 px-4 bg-[#2d2926] text-[#f8f7f4] text-[10px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-[#4a3f35] transition-colors flex items-center justify-center whitespace-nowrap shadow-sm"
                        >
                          Add
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div className="text-center py-32 px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#f0ede8] flex items-center justify-center">
            <HiOutlineSparkles className="w-8 h-8 text-[#7a6e60]" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#2d2926] mb-2">
            No products yet
          </h3>
          <p className="text-[#5c564e] text-sm">
            New items are on the way. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}

export default Content;
