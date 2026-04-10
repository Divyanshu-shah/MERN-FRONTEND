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

export const AppContext = createContext();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart }}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#f8f7f4]">
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2500,
              style: {
                background: '#2d2926',
                color: '#f8f7f4',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: '500',
                fontFamily: "'Inter', system-ui, sans-serif",
                padding: '10px 22px',
                boxShadow: '0 12px 40px rgba(45,41,38,0.25)',
                letterSpacing: '0.02em',
              },
              success: {
                iconTheme: {
                  primary: '#4a8c6e',
                  secondary: '#f8f7f4',
                },
              },
              error: {
                iconTheme: {
                  primary: '#c8553a',
                  secondary: '#f8f7f4',
                },
              },
            }}
          />
          <Header />
          <main className="flex-1">
            <Routes>
              <Route index element={<Content />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Orders />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="logout" element={<Logout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
