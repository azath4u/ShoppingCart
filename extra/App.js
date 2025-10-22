import React, { useEffect, useState } from "react";
import { useCart } from "./context";
import "./App.css";
//import Push from "./push";

function App() {
  const [quantity, setquantity] = useState({});
  const [products, setproduct] = useState([]);
  const { update, setnewcart } = useCart();
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart"));
    setproduct(stored || []);
  }, []);
  const handleqty = (id, newqty) => {
    setquantity((prev) => ({
      ...prev,
      [id]: newqty,
    }));
  };
  /*const handleupdate = () => {
    products.forEach((p) => {
      const qty = quantity[p.id] || 1;
      update(p.id, qty);
    });
  };*/

  return (
    <div className="maincontainer">
      <div className="cartcontainer">
        <h1>List of products</h1>
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <span>{p.item}</span>
              <div className="qty-action">
                <input
                  type="Number"
                  value={quantity[p.id] || 1}
                  onChange={(e) => handleqty(p.id, e.target.value)}
                  className="qtybox"
                  min="1"
                />
                <button
                  onClick={() =>
                    update(p.id, p.item, quantity[p.id] ?? 1, p.cost)
                  }
                >
                  Add to cart
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button onClick={() => setnewcart(true)} className="gocart">
          Go to cart
        </button>
      </div>
    </div>
  );
}
export default App;
