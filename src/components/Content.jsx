import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Content.css";

function Content() {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  function ItemQuantity({ id }) {
    const item = cart.find((item) => item._id === id && item.quantity > 0);
    return item.quantity;
  }

  const fetchProducts = async () => {
    const url = `${API_URL}/products`;
    const res = await axios.get(url);
    setProducts(res.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.quantity = 1;
      setCart([...cart, product]);
    }
  };

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
      cart
        .map((item) => {
          if (item._id === id && item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        })
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <div className="row">
      {products &&
        products.map((product) => (
          <div className="box" key={product._id}>
            <img src={`${API_URL}${product.imageUrl}`} width={300} alt="" />
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <h4>{product.price}</h4>

            {cart.find(
              (item) => item._id === product._id && item.quantity > 0,
            ) ? (
              <>
                <button onClick={() => decrement(product._id)}>-</button>
                <ItemQuantity id={product._id} />
                <button onClick={() => increment(product._id)}>+</button>
              </>
            ) : (
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            )}
          </div>
        ))}
    </div>
  );
}

export default Content;
