import Footer from "./components/Footer";
import Header from "./components/Header";
import Content from "./components/Content";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import App1 from "./components/App1";
import App2 from "./components/App2";
import App3 from "./components/App3";
import App4 from "./components/App4";
import App5 from "./components/App5";
import App6 from "./components/App6";
import App7 from "./components/App7";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
export const AppContext = createContext();
function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Content />} />
          <Route path="cart" element={<Cart />} />
          <Route path="app1" element={<App1 />} />
          <Route path="app2" element={<App2 />} />
           <Route path="app3" element={<App3 />} />
            <Route path="app4" element={<App4 />} />
             <Route path="app5" element={<App5 flag={2} />} />
              <Route path="app6" element={<App6 />} />
              <Route path="app7" element={<App7 />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}
export default App;
