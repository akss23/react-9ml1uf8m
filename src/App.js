import React, { useEffect, useState } from "react";
import "./style.css";

const BASE_URL = "https://akshat-e-commerce.onrender.com";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  // ✅ Image mapping (relevant photos for each product)
  const products = [
  {
    name: "Nike Air Zoom Sneakers",
    price: 4999,
    image: "https://images.unsplash.com/photo-1606813902915-d3b3da9d6b5f?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Adidas Classic Hoodie",
    price: 2999,
    image: "https://images.unsplash.com/photo-1602810318383-e8f7b4b06df0?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Levi’s Denim Jacket",
    price: 3499,
    image: "https://images.unsplash.com/photo-1603252109303-3c28b89e0b3b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Casual Cotton T-Shirt",
    price: 799,
    image: "https://images.unsplash.com/photo-1600180758890-6c3b87f2d4be?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Analog Wrist Watch",
    price: 2599,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w



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
                src={productImages[item.name] || productImages["T-shirt"]}
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
