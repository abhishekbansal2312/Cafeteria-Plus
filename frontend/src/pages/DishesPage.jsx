import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import DishesList from "../components/dishes/DishesList";
import { useDispatch } from "react-redux";
import { setDishes } from "../slices/dishesSlice";

export default function DishesPage() {
  const makeRequest = useAxios();
  const dispatch = useDispatch();

  const fetchDishes = async () => {
    const response = await makeRequest(
      "http://localhost:3000/api/dishes",
      "GET"
    );
    console.log(response, "dcsdds");

    dispatch(setDishes(response));
  };
  useEffect(() => {
    fetchDishes();
  }, []);
  return (
    <div>
      <DishesList />
    </div>
  );
}
