import React, { useEffect, useState } from "react";
import {Navbar} from "../components/Navbar";
import {ProductCard} from "../components/ProductCard";
import "../styles.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="home-page container">
        <h1>Bienvenido a Fuxion</h1>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
