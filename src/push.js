import React from "react";
import { useNavigate } from "react-router-dom";

const newitem = [
  { id: Date.now(), item: "Laptop", qty: 10, cost: 35000 },
  { id: Date.now() + 1, item: "Mobile", qty: 10, cost: 10000 },
  { id: Date.now() + 2, item: "TV", qty: 10, cost: 25000 },
  { id: Date.now() + 3, item: "Refrigerator", qty: 10, cost: 20000 },
  { id: Date.now() + 4, item: "Washing Machine", qty: 10, cost: 15000 },
];

function Push() {
  const navigate = useNavigate();

  const update = () => {
    localStorage.setItem("cart", JSON.stringify(newitem));
    setTimeout(() => navigate("/app"), 300);
  };

  const remove = () => {
    localStorage.removeItem("cart");
    alert("Cart cleared!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Push Products</h2>
      <p>Click “Add” to save products and open the App page.</p>
      <button onClick={update}>Add</button>
      <button onClick={remove}>Delete</button>
    </div>
  );
}

export default Push;
