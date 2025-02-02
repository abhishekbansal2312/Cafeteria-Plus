const Dish = require("../models/dishModel");
const filterDishes = (req, res, next) => {
  const { category, search, availability, minPrice, maxPrice } = req.query;

  let filter = {};

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (availability) {
    filter.availability = availability === "true";
  }

  if (minPrice && maxPrice) {
    filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
  } else if (minPrice) {
    filter.price = { $gte: parseInt(minPrice) };
  } else if (maxPrice) {
    filter.price = { $lte: parseInt(maxPrice) };
  }

  req.filter = filter;
  req.model = Dish;
  next();
};

module.exports = filterDishes;
