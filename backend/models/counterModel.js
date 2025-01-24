const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  merchant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  dishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Counter", CounterSchema);
