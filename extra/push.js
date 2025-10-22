import React from "react";

const newitem = [
  { id: Date.now(), item: "Laptop", qty: 10, cost: 35000 },

  { id: Date.now() + 1, item: "Mobile", qty: 10, cost: 10000 },
  { id: Date.now() + 2, item: "TV", qty: 10, cost: 25000 },
  { id: Date.now() + 3, item: "Refigerator", qty: 10, cost: 20000 },
  { id: Date.now() + 4, item: "Washing Machine", qty: 10, cost: 15000 },
];
function Push() {
  const update = () => {
    localStorage.setItem("cart", JSON.stringify(newitem));
  };
  const remove = () => {
    localStorage.removeItem("cart");
  };
  console.log(JSON.parse(localStorage.getItem("cart")));
  return (
    <>
      <button onClick={update}>Add</button>
      <button onClick={remove}>Delete</button>
    </>
  );
}
export default Push;
