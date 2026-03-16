import React from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const handleLogin = () => {
    console.log(user)
  }
  return (
    <div>
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
