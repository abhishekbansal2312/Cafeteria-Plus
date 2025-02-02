import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import DishesList from "../components/dishes/DishesList";
import { useDispatch } from "react-redux";
import { setDishes } from "../slices/dishesSlice";
import FilterInput from "../components/inputs/InputField";
import FilterSelect from "../components/inputs/SelectField";
import Pagination from "../components/Pagination"; // Importing Pagination component

export default function DishesPage({ theme }) {
  const makeRequest = useAxios();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    category: "",
    search: "",
    availability: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
    limit: 5,
  });

  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [totalResults, setTotalResults] = useState(0); // Track total results

  const categories = [
    "breakfast",
    "lunch",
    "dinner",
    "snacks",
    "dessert",
    "drinks",
    "others",
  ];

  const fetchDishes = async () => {
    const response = await makeRequest(
      `https://dinesync-seamlessdining.onrender.com/api/dishes?page=${filters.page}&limit=${filters.limit}&category=${filters.category}&search=${filters.search}&availability=${filters.availability}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`,
      "GET"
    );
    console.log(response, "dishes data");
    dispatch(setDishes(response.dishes));

    // Set total results and total pages based on response
    setTotalResults(response.totalResults);
    setTotalPages(Math.ceil(response.totalResults / filters.limit));
  };

  useEffect(() => {
    fetchDishes();
  }, [
    filters.page,
    filters.limit,
    filters.category,
    filters.search,
    filters.availability,
    filters.minPrice,
    filters.maxPrice,
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: 1, // Reset to page 1 when filters change
    }));
  };

  const applyFilters = () => {
    fetchDishes();
  };

  const AVAILABILITY_OPTIONS = [
    { value: "", label: "All Availability" },
    { value: "true", label: "Available" },
    { value: "false", label: "Not Available" },
  ];

  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  return (
    <div>
      <div
        className={`p-6 min-h-screen ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex gap-2">
          <FilterInput
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search dishes"
          />
          <FilterSelect
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            options={[
              { value: "", label: "All Categories" },
              ...categories.map((category) => ({
                value: category,
                label: category,
              })),
            ]}
          />
          <FilterSelect
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
            options={AVAILABILITY_OPTIONS}
          />
          <FilterInput
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min Price"
          />
          <FilterInput
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max Price"
          />
          <button
            onClick={applyFilters}
            className="p-2 h-10 bg-blue-500 text-white rounded ml-2"
          >
            Apply Filters
          </button>
        </div>

        <DishesList />

        <Pagination
          totalPages={totalPages}
          currentPage={filters.page}
          onPageChange={handlePageChange}
          totalResults={totalResults}
        />
      </div>
    </div>
  );
}
