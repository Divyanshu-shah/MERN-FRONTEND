import React from "react";

export default function App3() {
  //   const employees = ["John", "Cathy", "Amy", "Brian", "Mike"];
  const employees = [
    { id: 1, name: "John" },
    { id: 2, name: "Cathy" },
    { id: 3, name: "Amy" },
  ];
  return (
    <div>
      {employees.map((employee) => (
        <div key={employee.id}>{employee.name}</div>
      ))}
    </div>
  );
}
