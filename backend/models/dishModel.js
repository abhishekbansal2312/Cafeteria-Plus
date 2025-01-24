const mongoose = require("mongoose");

const CATEGORIES = [
  "breakfast",
  "lunch",
  "dinner",
  "snacks",
  "dessert",
  "drinks",
  "others",
];

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Dish name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Dish description is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Dish price is required"],
    min: [1, "Price cannot be less than 1"],
  },
  image: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: CATEGORIES,
    required: [true, "Dish category is required"],
  },
  counter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Counter",
    required: [true, "Counter ID is required"],
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Dish", DishSchema);
