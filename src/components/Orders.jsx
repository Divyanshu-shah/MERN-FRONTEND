import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {AppContext} from "../App";
export default function Orders() {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    const url = `${API_URL}/orders/show-orders/${user.email}`;
    const res = await axios.get(url);
    setOrders(res.data);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h3>Orders</h3>
      <div>
        {orders &&
          orders.map((order) => (
            <div>
              <h4>OrderId:{order._id}</h4>
              <ol>
                {order.cart.map((item) => (
                  <li>
                    {item.name}-{item.price}-{item.quantity}-
                    {item.price * item.quantity}
                  </li>
                ))}
              </ol>
              <h4>Order Value:{order.orderValue}</h4>
              <h3>Status:{order.status}</h3>
              <hr />
            </div>
          ))}
      </div>
      ;
    </div>
  );
}
