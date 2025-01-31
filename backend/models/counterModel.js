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
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counter", CounterSchema);

CounterSchema.pre("save", async function (next) {
  if (this.reviews.length > 0) {
    const reviews = await mongoose
      .model("Review")
      .find({ _id: { $in: this.reviews } });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = totalRating / reviews.length;
  }
  next();
});
