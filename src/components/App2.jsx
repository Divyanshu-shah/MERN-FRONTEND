import React, { useEffect } from "react";
import { useRef, useState } from "react";
export default function App2() {
  const nameRef = useRef();
  const txtRef = useRef();
  const [value, setValue] = useState(750);
  useEffect(() => {
    nameRef.current = value;
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (nameRef.current > e.target.value) {
      txtRef.current.style.color = "red";
    } else {
      txtRef.current.style.color = "green";
    }
  };

  return (
    <div>
      <p>
        SBI Stock Price<input type="number" value={value} ref={txtRef} onChange={handleChange} />
      </p>
      {/* <p>
        {nameRef.current}-{value}
      </p> */}
    </div>
  );
}

// import React from "react";
// import { useRef, useState } from "react";
// export default function App2() {
//   const nameRef = useRef();
//   const emailRef = useRef();
//   const [data, setData] = useState({});
//   const handleSubmit = () => {
//     setData({
//       name: nameRef.current.value,
//       email: emailRef.current.value,
//     });
//     nameRef.current.style.backgroundColor = "pink"
//   };
//   return (
//     <div>
//       <p>
//         <input type="text" ref={nameRef} />
//       </p>
//       <p>
//         <input type="text" ref={emailRef} />
//       </p>
//       <p>
//         <button onClick={handleSubmit}>Submit</button>
//         {data.name}-{data.email}
//       </p>
//     </div>
//   );
// }

// import React from "react";
// import { useState } from "react";
// export default function App2() {
//   const [name, setName] = useState();
//    const [email, setEmail] = useState();
//   return (
//     <div>
//       <p>
//         <input type="text" onChange={(e)=>setName(e.target.value)} />
//       </p>
//       <p>
//         <input type="text" onChange={(e)=>setEmail(e.target.value)} />
//       </p>
//       <p><button>Submit</button></p>
//       {name}- {email}
//     </div>
//   );
// }
