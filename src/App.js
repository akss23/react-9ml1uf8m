import React, { useEffect, useState } from "react";
import "./style.css";

const BASE_URL = "https://akshat-e-commerce.onrender.com";


export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <h1>🛍️ Akshat E-Commerce</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid">
          {products.map((item) => (
            <div className="card" key={item.id || item._id}>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
