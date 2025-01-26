import React from "react";

export default function DishCard({ dish }) {
  return (
    <div className="dish-card">
      <img src={dish.image} alt={dish.name} className="dish-image" />
      <h3>{dish.name}</h3>
      <p>{dish.description}</p>
      <p>
        <strong>Price:</strong> ₹{dish.price}
      </p>
    </div>
  );
}
