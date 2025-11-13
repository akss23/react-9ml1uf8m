import React, { useEffect, useState } from "react";
import "./style.css";

const BASE_URL = "https://akshat-e-commerce.onrender.com";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  // ✅ Image mapping (relevant photos for each product)
  const productImages = {
    "T-shirt":
      "https://cdn.pixabay.com/photo/2016/03/27/19/40/t-shirt-1281575_960_720.jpg",
    Jeans:
      "https://cdn.pixabay.com/photo/2016/11/29/04/12/jeans-1867077_960_720.jpg",
    Sneakers:
      "https://www.google.com/imgres?q=pixabay%20photo%20of%20sneakers&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1688015574%2Fphoto%2Fwhite-sneaker-isolated-on-white-background.jpg%3Fb%3D1%26s%3D612x612%26w%3D0%26k%3D20%26c%3DlMTQkWhlTwsw0Gs6Psupv7bY4IIswW5GHzpEPKh_dtc%3D&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fsneakers%2F&docid=zfgoeGIMsQ03gM&tbnid=PTWeu1krmsphbM&vet=12ahUKEwithPzf8O2QAxWwxzgGHWOpMGIQM3oECCIQAA..i&w=612&h=408&hcb=2&ved=2ahUKEwithPzf8O2QAxWwxzgGHWOpMGIQM3oECCIQAA",
    Cap: "https://cdn.pixabay.com/photo/2016/03/31/20/53/baseball-cap-1299777_960_720.jpg",
  };

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
