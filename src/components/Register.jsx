import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Register() {
  const [obj, setObj] = useState({});
  const handleSubmit = () => {
    console.log(obj);
  };
  return (
    <div>
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
