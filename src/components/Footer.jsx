import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mt-auto"
      style={{ borderTop: "1px solid var(--c-border)", background: "var(--c-surface)" }}
    >
      <div className="px-6 sm:px-10 lg:px-16 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.h3 whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="text-lg font-serif font-bold tracking-tight" style={{ color: "var(--c-text)" }}>
            <span className="italic font-normal text-[#6366f1] mr-0.5">my</span>Store
          </motion.h3>

          <div className="flex items-center gap-8">
            {[{ to: "/", label: "Shop" }, { to: "/cart", label: "Cart" }, { to: "/login", label: "Account" }].map((link) => (
              <Link key={link.to} to={link.to}
                className="link-underline text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 font-semibold"
                style={{ color: "var(--c-text-secondary)" }}>
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-xs tracking-wide" style={{ color: "var(--c-text-muted)" }}>
            © {new Date().getFullYear()} myStore. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;