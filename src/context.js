import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  memo,
} from "react";

const Cartcontext = createContext();

export const Cartprovider = ({ children }) => {

  const [cart, setcart] = useState([]);

  
  const [product, setproduct] = useState(() => {
    const stored = localStorage.getItem("newcart");
    return stored ? JSON.parse(stored) : [];
  });

  const [shownewcart, setnewcart] = useState(false);
  const [message, setmessage] = useState("");


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setcart(storedCart);
  }, []);

 
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setcart(storedCart);
  }, [shownewcart, product]);


  const update = (id, item, qty, cost) => {
    setproduct((prev) => {
      const exist = prev.find((p) => p.id === id);
      let updated;

      if (exist) {
        updated = prev.map((p) =>
          p.id === id ? { ...p, qty: Number(qty) } : p
        );
      } else {
        updated = [...prev, { id, item, qty: Number(qty), cost: Number(cost) }];
      }

      localStorage.setItem("newcart", JSON.stringify(updated));
      return updated;
    });
  };

 
  const handleQtyChange = (id, newqty) => {
    const updated = product.map((item) =>
      item.id === id ? { ...item, qty: Number(newqty) } : item
    );
    setproduct(updated);
    localStorage.setItem("newcart", JSON.stringify(updated));
  };


  const removeItem = useCallback(
    (id) => {
      const updated = product.filter((p) => p.id !== id);
      setproduct(updated);
      localStorage.setItem("newcart", JSON.stringify(updated));
      setmessage("Item removed from cart");
    },
    [product]
  );

 
  const buynow = useCallback(
    (p) => {
      const stockItem = cart.find((c) => c.id === p.id);

      if (!stockItem || stockItem.qty <= 0) {
        alert("Out of stock");
        return;
      }

      if (p.qty > stockItem.qty) {
        alert("Not enough stock available");
        return;
      }

      const updatedCart = cart.map((item) =>
        item.id === p.id
          ? { ...item, qty: Math.max(item.qty - p.qty, 0) }
          : item
      );

      const updatedNewCart = product.filter((item) => item.id !== p.id);

      setcart(updatedCart);
      setproduct(updatedNewCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("newcart", JSON.stringify(updatedNewCart));

      setmessage(`${p.item} purchased successfully`);
    },
    [cart, product]
  );

  const totalcost = product.reduce(
    (acc, p) => acc + Number(p.qty) * Number(p.cost),
    0
  );


  useEffect(() => {
    localStorage.setItem("newcart", JSON.stringify(product));
  }, [product]);

  return (
    <Cartcontext.Provider
      value={{
        cart,
        setcart,
        update,
        product,
        handleQtyChange,
        removeItem,
        buynow,
        totalcost,
        message,
        shownewcart,
        setnewcart,
      }}
    >
      {children}

      {shownewcart && (
        <div className="newcartcontainer">
          <button className="close-btn" onClick={() => setnewcart(false)}>
            ✖ Close
          </button>
          <h2>Your Cart</h2>

          {product.length > 0 ? (
            <>
              <ul>
                {product.map((p) => (
                  <Productitem
                    key={p.id}
                    p={p}
                    cart={cart}
                    handleQtyChange={handleQtyChange}
                    removeItem={removeItem}
                    buynow={buynow}
                  />
                ))}
              </ul>
              <h4>Grand Total: ₹{totalcost}</h4>
            </>
          ) : (
            <p>Your cart is empty 🛒</p>
          )}

          {message && (
            <p style={{ color: "blue", fontWeight: "bold" }}>{message}</p>
          )}
        </div>
      )}
    </Cartcontext.Provider>
  );
};


const Productitem = memo(({ p, handleQtyChange, removeItem, buynow, cart }) => {
  const [localqty, setlocalqty] = useState(p.qty);

  const cartItem = cart.find((c) => c.id === p.id);
  const availableStock = cartItem ? cartItem.qty : 0;

  const onQtyChange = (e) => {
    const newqty = Number(e.target.value);
    setlocalqty(newqty);
    handleQtyChange(p.id, newqty);
  };

  return (
    <li className="newcartitem">
      <div className="itemheader">
        <h3>{p.item}</h3>
        <p className="price">₹{p.cost}</p>
      </div>

      <div className="itemdetails">
        <label>
          <strong>Quantity:</strong>
          <input
            type="number"
            value={localqty}
            onChange={onQtyChange}
            min="1"
            className="newcartqtybox"
          />
        </label>

        <p>
          <strong>Total:</strong> ₹{localqty * p.cost}
        </p>

        <p>
          <strong>Available Stock:</strong>{" "}
          <span
            style={{
              color:
                availableStock === 0
                  ? "red"
                  : availableStock < 5
                  ? "orange"
                  : "green",
              fontWeight: "bold",
            }}
          >
            {availableStock > 0 ? availableStock : "Out of stock"}
          </span>
        </p>
      </div>

      <div className="itemaction">
        <button
          className="buy-btn"
          onClick={() => buynow(p)}
          disabled={availableStock === 0}
        >
          Buy Now
        </button>
        <button className="remove-btn" onClick={() => removeItem(p.id)}>
          Remove
        </button>
      </div>
    </li>
  );
});

export const useCart = () => useContext(Cartcontext);
