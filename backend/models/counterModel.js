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
    },
  ],
  counter_name: {
    type: String,
    required: [true, "Please provide a name"],
  },
});

module.exports = mongoose.model("Counter", CounterSchema);
