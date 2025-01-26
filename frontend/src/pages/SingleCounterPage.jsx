import React, { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import CounterDetails from "../components/singleCounter/CounterDetails";
import DishesList from "../components/dishes/DishesList";

export default function SingleCounterPage() {
  const makeRequest = useAxios();
  const { id } = useParams();
  const [counter, setCounter] = React.useState({});
  const [dishes, setDishes] = React.useState([]);

  const getDishByCounter = async () => {
    const response = await makeRequest(
      `http://localhost:3000/api/counters/${id}`,
      "GET",
      null,
      true
    );
    if (response) {
      setCounter(response.counter);
      setDishes(response.dishes);
    }
  };

  useEffect(() => {
    getDishByCounter();
  }, [id]);

  return (
    <div>
      <CounterDetails counter={counter} />
      <DishesList dishes={dishes} makeRequest={makeRequest} />
    </div>
  );
}
