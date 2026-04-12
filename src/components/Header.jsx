import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineBars2,
  HiOutlineXMark,
  HiOutlineUser,
} from "react-icons/hi2";

const smoothSpring = { type: "spring", stiffness: 300, damping: 25, mass: 0.8 };

function Header() {
  const { user, cart } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const cartCount = cart.reduce((s, i) => s + (i.quantity || 0), 0);
  const active = (p) => location.pathname === p;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Shop" },
    { to: "/cart", label: "Cart" },
    ...(user?.email ? [{ to: "/orders", label: "Orders" }] : []),
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-[background,border-color,box-shadow] duration-300 ease-out ${
        scrolled
          ? "glass border-b border-white/40 shadow-[0_1px_20px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      {/* Main navbar */}
      <div className="px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`link-underline text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors duration-400 ${
                active(link.to) ? "text-[#1a1f36]" : "text-[#64698b] hover:text-[#1a1f36]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -ml-2 rounded-xl hover:bg-[#6366f1]/5 transition-colors duration-300">
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={smoothSpring}>
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="close" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
                  <HiOutlineXMark className="w-5 h-5 text-[#1a1f36]" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
                  <HiOutlineBars2 className="w-5 h-5 text-[#1a1f36]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </button>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <motion.h1 className="text-[22px] sm:text-[26px] font-serif font-bold tracking-[-0.01em] text-[#1a1f36]" whileHover={{ scale: 1.02 }} transition={smoothSpring}>
            <span className="italic font-normal text-[#6366f1] mr-0.5">my</span>Store
          </motion.h1>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          {user?.email ? (
            <>
              <Link to="/logout" className="hidden md:flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-[#64698b] hover:text-[#1a1f36] font-semibold transition-colors duration-300 link-underline">
                Logout
              </Link>
              <motion.div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#818cf8] to-[#6366f1] text-white flex items-center justify-center text-[11px] font-bold uppercase shadow-sm" whileHover={{ scale: 1.08 }} transition={smoothSpring}>
                {user.email.charAt(0)}
              </motion.div>
            </>
          ) : (
            <Link to="/login" className="hidden md:flex items-center gap-1.5 p-2 rounded-xl hover:bg-[#6366f1]/5 transition-colors duration-300">
              <HiOutlineUser className="w-[18px] h-[18px] text-[#64698b]" />
            </Link>
          )}

          <Link to="/cart" className="relative p-2 rounded-xl hover:bg-[#6366f1]/5 transition-colors duration-300">
            <HiOutlineShoppingBag className="w-[18px] h-[18px] text-[#64698b]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={smoothSpring}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#6366f1] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 shadow-md">
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.3, ease: "easeOut" } }}
            className="md:hidden overflow-hidden border-t border-[#e5e7ef]/60 glass"
          >
            <div className="px-6 py-5 space-y-1">
              {[...navLinks, ...(user?.email ? [{ to: "/logout", label: "Logout" }] : [{ to: "/login", label: "Sign In" }])].map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  <Link to={l.to} onClick={() => setOpen(false)}
                    className={`block py-2.5 text-[13px] font-semibold tracking-wide rounded-lg px-3 transition-all duration-300 ${
                      active(l.to) ? "text-[#6366f1] bg-[#6366f1]/5" : "text-[#64698b] hover:text-[#1a1f36] hover:bg-[#6366f1]/[0.03]"
                    }`}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
