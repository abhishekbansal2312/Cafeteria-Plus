const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema(
  {
    merchants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    counter_name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    operating_hours: {
      open: { type: String },
      close: { type: String },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: [{ type: String }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counter", CounterSchema);
