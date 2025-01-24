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
    required: [true, "Please provide a name"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
    min: [1, "Price cannot be less than 1"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image"],
  },
  category: {
    type: String,
    enum: CATEGORIES,
    required: [true, "Please provide a category"],
  },
  counter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Counter",
  },
  availability: {
    type: Boolean,
    default: 1,
  },
});
module.exports = mongoose.model("Dish", DishSchema);
