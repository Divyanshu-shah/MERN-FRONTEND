import { useState, useEffect } from "react";
import axios from "axios";
import "./Content.css"
function Content() {
  const [products, setProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchProducts = async () => {
    const url = `${API_URL}/products`;
    const res = await axios.get(url);
    setProducts(res.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="row">
      {products &&
        products.map((product) => (
          <div class="box" key={product._id}>
            <img
              src={`${API_URL}${product.imageUrl}`}
              width={300}
              alt=""
            />
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <h4>{product.price}</h4>
            <button>Add to Cart</button>
          </div>
        ))}
    </div>
  );
}

export default Content;
