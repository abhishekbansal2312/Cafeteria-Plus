import React from "react";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";

export default function HomePage({ theme }) {
  return (
    <div>
      <Header theme={theme} />
      <Categories theme={theme} />
    </div>
  );
}
