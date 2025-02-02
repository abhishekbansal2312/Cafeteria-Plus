const Dish = require("../models/dishModel");

const filterDishes = (req, res, next) => {
  const { category, search, availability, minPrice, maxPrice } = req.query;

  let filter = {};

  // Apply search filter if provided
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  // Apply category filter if provided
  if (category) {
    filter.category = category;
  }

  // Apply availability filter if provided
  if (availability) {
    filter.availability = availability === "true";
  }

  // Apply price range filter if provided
  if (minPrice && maxPrice) {
    filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
  } else if (minPrice) {
    filter.price = { $gte: parseInt(minPrice) };
  } else if (maxPrice) {
    filter.price = { $lte: parseInt(maxPrice) };
  }

  // If no filter is applied, it returns all dishes
  if (Object.keys(filter).length === 0) {
    filter = {}; // Ensure empty filter means all dishes
  }

  // Pass the filter to the next middleware or controller
  req.filter = filter;
  req.model = Dish;
  next();
};

module.exports = filterDishes;
