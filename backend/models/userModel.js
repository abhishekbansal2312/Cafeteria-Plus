const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  dish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
    enum: ["customer", "merchant", "admin"],
    default: "customer",
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  cart: [CartSchema],
});

module.exports = mongoose.model("User", UserSchema);
