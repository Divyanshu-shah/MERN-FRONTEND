import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e8e5de] bg-white">
      {/* Main footer */}
      <div className="px-6 sm:px-10 lg:px-16 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <h3 className="text-lg font-serif font-bold text-[#2d2926] tracking-tight">
            <span className="italic font-normal text-[#7a6e60] mr-0.5">my</span>Store
          </h3>

          {/* Links */}
          <div className="flex items-center gap-8">
            {[
              { to: "/", label: "Shop" },
              { to: "/cart", label: "Cart" },
              { to: "/login", label: "Account" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="link-underline text-[11px] tracking-[0.15em] uppercase text-[#5c564e] hover:text-[#2d2926] transition-colors font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[#8a857c] text-xs tracking-wide">
            © {new Date().getFullYear()} myStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;