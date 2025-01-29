import React, { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import DishesList from "../components/dishes/DishesList";
export default function DishesPage() {
  const makeRequest = useAxios();
  const [dishes, setDishes] = React.useState([]);
  const fetchDishes = async () => {
    const response = await makeRequest(
      "http://localhost:3000/api/dishes",
      "GET",
      null,
      null
    );

    setDishes(response);
  };
  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div>
      <DishesList dishes={dishes} makeRequest={makeRequest} />{" "}
    </div>
  );
}
