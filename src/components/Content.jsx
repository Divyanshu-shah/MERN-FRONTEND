import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Content.css";
function Content() {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchProducts = async () => {
    const url = `${API_URL}/products`;
    const res = await axios.get(url);
    // Ensure products is always an array
    const data = Array.isArray(res.data) ? res.data : [];
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if(!found){
      product.quantity = 1
      setCart([...cart,product])
    }
  };

  return (
    <div className="row">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div className="box" key={product._id}>
            <img src={`${API_URL}${product.imageUrl}`} width={300} alt="" />
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <h4>{product.price}</h4>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default Content;
