import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"
export default function Register() {
  const [obj, setObj] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const handleSubmit = async () => {
    const url = `${API_URL}/admin/signup`;
    const res = await axios.post(url, obj);
    Navigate("/login");
  };
  return (
    <div className="App-Register-Form">
      <h3>Register</h3>
      <p>
        <input
          type="text"
          onChange={(e) => setObj({ ...obj, name: e.target.value })}
          placeholder="Name"
        />
      </p>
      <p>
        <input
          type="text"
          onChange={(e) => setObj({ ...obj, email: e.target.value })}
          placeholder="Email"
        />
      </p>
      <p>
        <input
          type="password"
          onChange={(e) => setObj({ ...obj, password: e.target.value })}
          placeholder="Password"
        />
      </p>
      <p>
        <button onClick={handleSubmit}>Submit</button>
      </p>
      <p>
        <Link to="/login">Already a memeber? Login here</Link>
      </p>
    </div>
  );
}
