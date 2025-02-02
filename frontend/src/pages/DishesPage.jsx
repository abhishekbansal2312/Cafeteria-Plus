import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import DishesList from "../components/dishes/DishesList";
import { useDispatch } from "react-redux";
import { setDishes } from "../slices/dishesSlice";
import FilterInput from "../components/inputs/InputField";
import FilterSelect from "../components/inputs/SelectField";
import Pagination from "../components/Pagination";
import DishSkeleton from "../components/dishes/DishSkeleton";

export default function DishesPage({ theme }) {
  const makeRequest = useAxios();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    category: "",
    search: "",
    availability: "",
    minPrice: "",
    maxPrice: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    category: "",
    search: "",
    availability: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
    limit: 5,
  });

  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

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
    setLoading(true);
    try {
      const response = await makeRequest(
        `https://dinesync-seamlessdining.onrender.com/api/dishes?page=${appliedFilters.page}&limit=${appliedFilters.limit}&category=${appliedFilters.category}&search=${appliedFilters.search}&availability=${appliedFilters.availability}&minPrice=${appliedFilters.minPrice}&maxPrice=${appliedFilters.maxPrice}`,
        "GET"
      );
      console.log(response, "dishes data");
      dispatch(setDishes(response.dishes));
      setTotalResults(response.totalResults);
      setTotalPages(Math.ceil(response.totalResults / appliedFilters.limit));
    } catch (error) {
      console.error("Error fetching dishes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();

    return () => {
      dispatch(setDishes([]));
    };
  }, [appliedFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters, page: 1, limit: 5 });
  };

  const handlePageChange = (newPage) => {
    setAppliedFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  const AVAILABILITY_OPTIONS = [
    { value: "", label: "All Availability" },
    { value: "true", label: "Available" },
    { value: "false", label: "Not Available" },
  ];

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

        {loading ? (
          <DishSkeleton />
        ) : (
          <>
            <DishesList />
            <Pagination
              totalPages={totalPages}
              currentPage={appliedFilters.page}
              onPageChange={handlePageChange}
              totalResults={totalResults}
            />
          </>
        )}
      </div>
    </div>
  );
}
