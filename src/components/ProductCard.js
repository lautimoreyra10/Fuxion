import React from "react";
import "../products.css";
export const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <div className="title">{product.title}</div>
      <div className="price">${product.price}</div>
    </div>
  );
};
