import React, { useState, useEffect } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import axios from "axios";
export default function Cart() {
  const { user, setUser, cart, setCart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [orderValue, setOrderValue] = useState(0);
  const Navigate = useNavigate();
  const increment = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      }),
    );
  };

  const decrement = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      }),
    );
  };

  useEffect(() => {
    if (cart.length > 0) {
      setOrderValue(
        cart.reduce((sum, item) => {
          return sum + item.quantity * item.price;
        }, 0),
      )
    }
  }, [cart]);

  const placeOrder = async () => {
    const url = `${API_URL}/orders/place-order`;
    const order = {
      email: user.email,
      cart,
      orderValue,
    };
    const res = await axios.post(url, order);
    setCart({});
    Navigate("/orders");
  };
  return (
    <div>
      <h3 style={{ padding: "10px" }}>My Cart</h3>
      {cart.length > 0 ? (
        <div>
          <table>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {cart &&
              cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td className="rAlign">{item.price}</td>
                  <td className="cAlign">
                    <button onClick={() => decrement(item._id)}>-</button>
                    {item.quantity}
                    <button onClick={() => increment(item._id)}>+</button>
                  </td>
                  <td className="rAlign">{item.price * item.quantity}</td>
                </tr>
              ))}
            <tr className="tableFooter">
              <td colspan="3">Order Value:</td>
              <td className="rAlign">{orderValue}</td>
            </tr>
          </table>

          {user?.email ? (
            <p>
              <button onClick={placeOrder} className="App-Cart-Button">
                Place Order
              </button>
            </p>
          ) : (
            <p>
              <button
                className="App-Cart-Button"
                onClick={() => Navigate("/login")}
              >
                Login to Order
              </button>
            </p>
          )}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}
