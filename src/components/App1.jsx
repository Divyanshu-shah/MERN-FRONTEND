import React from "react";
import { useEffect, useState } from "react";
export default function App1() {
  const [counter, setCounter] = useState(0);
  const [flag, setFlag] = useState(0);
  useEffect(() => {
    console.log("Component Mounted or Updated");
    return () => {
      console.log("Component Unmounted");
    };
  }, [counter]);
  const updateFlag = () => {
    setFlag(flag + 1);
  };
  const updateCounter = () => {
    setCounter(counter + 1);
  };
  return (
    <div>
      <button onClick={updateFlag}>Flag({flag})</button>
      <button onClick={updateCounter}>Counter({counter})</button>
    </div>
  );
}
