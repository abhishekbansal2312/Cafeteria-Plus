const Review = require("../models/reviewModel");
const Counter = require("../models/counterModel");

const getReviewsByCounter = async (req, res) => {
  try {
    const { counterId } = req.params;
    const counter = await Counter.findById(counterId)
      .populate({
        path: "reviews",
        select: "title rating comment user",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .select("reviews");

    if (!counter || !counter.reviews || counter.reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this counter" });
    }

    res.status(200).json(counter.reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getReviewByIdForCounter = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "user",
      "name"
    );
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createReviewForCounter = async (req, res) => {
  try {
    const { title, rating, comment, counterId } = req.body;
    console.log("counterId", counterId, title, rating, comment);
    console.log(req.user.id);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (!counterId) {
      return res.status(400).json({ message: "Counter ID is required" });
    }

    const userId = req.user.id;

    const newReview = new Review({ title, rating, comment, user: userId });
    const savedReview = await newReview.save();

    await Counter.findByIdAndUpdate(counterId, {
      $push: { reviews: savedReview._id },
    }).populate("user");

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: error.stack, stack: error.stack });
  }
};

const updateReviewForCounter = async (req, res) => {
  try {
    const { title, rating, comment } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { title, rating, comment },
      { new: true }
    );
    if (!updatedReview)
      return res.status(404).json({ message: "Review not found" });

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
};

const deleteReviewForCounter = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    await Counter.updateMany({}, { $pull: { reviews: req.params.id } });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};

module.exports = {
  getReviewsByCounter,
  getReviewByIdForCounter,
  createReviewForCounter,
  updateReviewForCounter,
  deleteReviewForCounter,
};
