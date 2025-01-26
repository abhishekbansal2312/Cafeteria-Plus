import React from "react";
import DishCard from "./DishCard";

export default function DishList({ dishes }) {
  return (
    <div className="dish-list">
      <h2>Dishes</h2>
      {dishes.length > 0 ? (
        dishes.map((dish) => <DishCard key={dish._id} dish={dish} />)
      ) : (
        <p>No dishes available.</p>
      )}
    </div>
  );
}
