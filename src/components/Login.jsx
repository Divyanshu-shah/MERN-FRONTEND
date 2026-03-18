import React from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"
export default function Login() {
  const { user, setUser, cart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const handleLogin = async () => {
    const url = `${API_URL}/admin/login`;
    const res = await axios.post(url, user);
    setUser(res.data);
    if (cart.length > 0) Navigate("/cart");
    else Navigate("/");
  };
  return (
    <div className="App-Login-Form">
      <h3>Login Form</h3>
      <p>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
      </p>
      <p>
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Password"
        />
      </p>
      <p>
        <button onClick={handleLogin}>Login</button>
      </p>
      <p>
        <Link to="/register">New User Register Here</Link>
      </p>
    </div>
  );
}
