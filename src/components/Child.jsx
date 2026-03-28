import React from "react";
function Child({flag}) {
  console.log("Child called")
  return <div>This is Child Component</div>;
}

export default React.memo(Child);
