import Footer from "./components/Footer";
import Header from "./components/Header";
import Content from "./components/Content";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

export const AppContext = createContext();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route index element={<Content />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  // Theme state — reads from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${API_URL}/admin/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser({ ...res.data, token }))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, []);

  const loginUser = (userData) => {
    if (userData.token) localStorage.setItem("token", userData.token);
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  return (
    <AppContext.Provider value={{ user, setUser: loginUser, logoutUser, cart, setCart, authLoading, theme, toggleTheme }}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col" style={{ background: "var(--c-bg)" }}>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2500,
              style: {
                background: 'var(--c-toast-bg)',
                color: 'var(--c-toast-text)',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: '500',
                fontFamily: "'Inter', system-ui, sans-serif",
                padding: '10px 22px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                letterSpacing: '0.02em',
              },
              success: { iconTheme: { primary: '#10b981', secondary: '#ffffff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#ffffff' } },
            }}
          />
          <Header />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
