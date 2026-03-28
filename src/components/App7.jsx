import React from "react";
import { useState } from "react";
import Child from "./Child";
export default function App7() {
  const [counter, setCounter] = useState(0);
  const [flag, setFlag] = useState(0);
  return (
    <div>
      <h3>This is App7 Component</h3>
      <button onClick={() => setCounter(counter + 1)}>Update</button>
      <button onClick={() => setFlag(flag + 1)}>Update</button>
      <p>Counter:{counter}</p>
      <p>Flag:{flag}</p>
      <Child flag={flag} />
    </div>
  );
}
