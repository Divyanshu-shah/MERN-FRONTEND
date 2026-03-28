import React from "react";
import Component1 from "./Component1";
import Component2 from "./Component2";
export default function App5({ flag }) {
  return flag === 1 ? <Component1 /> : <Component2 />;
}

// import React from "react";
// import Component1 from "./Component1";
// import Component2 from "./Component2";
// export default function App5({ flag }) {
//   if (flag === 1) return <Component1 />;
//   else return <Component2 />;
// }
