import React, { useEffect, useState } from "react";
import "./style.css";

const BASE_URL = "https://akshat-e-commerce.onrender.com";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  // Fetch products from backend
  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching:", err);
        setLoading(false);
      });
  }, []);

  // Handle category filter
  const handleFilter = (cat) => {
    setCategory(cat);
    if (cat === "All") setFilteredProducts(products);
    else setFilteredProducts(products.filter((p) => p.category === cat));
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <h2>🛍️ Akshat E-Commerce</h2>
        <div className="cart">
          <span>🛒</span>
        </div>
      </nav>

      {/* Filter bar */}
      <div className="filter-bar">
        {["All", "Clothing", "Shoes", "Accessories"].map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="loading">Loading products...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="grid">
          {filteredProducts.map((item) => (
            <div className="card" key={item.id || item._id}>
              <img
                src={`https://picsum.photos/250?random=${item.id}`}
                alt={item.name}
                className="product-img"
              />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">No products available</p>
      )}

      {/* Footer */}
      <footer>Made with ❤️ by Akshat</footer>
    </div>
  );
}
