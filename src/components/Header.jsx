import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineBars2,
  HiOutlineXMark,
  HiOutlineUser,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

function Header() {
  const { user, cart } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const cartCount = cart.reduce((s, i) => s + (i.quantity || 0), 0);
  const active = (p) => location.pathname === p;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Shop" },
    { to: "/cart", label: "Cart" },
    ...(user?.email
      ? [
          { to: "/orders", label: "Orders" },
        ]
      : []),
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/40 shadow-[0_1px_20px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      {/* ── Announcement marquee ── */}
      <div className="bg-[#2d2926] text-[#e8e5de] overflow-hidden">
        <div className="marquee-container py-1.5">
          <div className="marquee-content">
            <span className="inline-flex items-center gap-8 text-[10px] tracking-[0.25em] uppercase font-medium">
              <span>✦ Free shipping on all orders</span>
              <span>✦ Premium quality guaranteed</span>
              <span>✦ Easy returns within 30 days</span>
              <span>✦ New arrivals every week</span>
              <span>✦ Free shipping on all orders</span>
              <span>✦ Premium quality guaranteed</span>
              <span>✦ Easy returns within 30 days</span>
              <span>✦ New arrivals every week</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <div className="px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
        {/* Left nav - desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`link-underline text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors duration-300 ${
                active(link.to)
                  ? "text-[#2d2926]"
                  : "text-[#5c564e] hover:text-[#2d2926]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -ml-2 rounded-xl hover:bg-[#2d2926]/5 transition-colors"
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? (
              <HiOutlineXMark className="w-5 h-5 text-[#2d2926]" />
            ) : (
              <HiOutlineBars2 className="w-5 h-5 text-[#2d2926]" />
            )}
          </motion.div>
        </button>

        {/* Center logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-[22px] sm:text-[26px] font-serif font-bold tracking-[-0.01em] text-[#2d2926]">
            <span className="italic font-normal text-[#7a6e60] mr-0.5">my</span>Store
          </h1>
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {user?.email ? (
            <>
              <Link
                to="/logout"
                className="hidden md:flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-[#5c564e] hover:text-[#2d2926] font-semibold transition-colors link-underline"
              >
                Logout
              </Link>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b8a99a] to-[#8c7b6b] text-white flex items-center justify-center text-[11px] font-bold uppercase shadow-sm">
                {user.email.charAt(0)}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1.5 p-2 rounded-xl hover:bg-[#2d2926]/5 transition-colors"
            >
              <HiOutlineUser className="w-[18px] h-[18px] text-[#4a453e]" />
            </Link>
          )}

          <Link to="/cart" className="relative p-2 rounded-xl hover:bg-[#2d2926]/5 transition-colors">
            <HiOutlineShoppingBag className="w-[18px] h-[18px] text-[#4a453e]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#c8553a] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>

      {/* ── Mobile nav drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-[#e8e5de]/60 glass"
          >
            <div className="px-6 py-5 space-y-1">
              {[
                ...navLinks,
                ...(user?.email
                  ? [{ to: "/logout", label: "Logout" }]
                  : [{ to: "/login", label: "Sign In" }]),
              ].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`block py-2.5 text-[13px] font-semibold tracking-wide rounded-lg px-3 transition-all ${
                      active(l.to)
                        ? "text-[#2d2926] bg-[#2d2926]/5"
                        : "text-[#5c564e] hover:text-[#2d2926] hover:bg-[#2d2926]/[0.03]"
                    }`}
                  >
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
