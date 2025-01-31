const express = require("express");
const router = express.Router();

const {
  getReviewsByCounter,
  getReviewByIdForCounter,
  createReviewForCounter,
  updateReviewForCounter,
  deleteReviewForCounter,
} = require("../controllers/reviewController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/authMiddleware");

router.get("/:counterId", getReviewsByCounter);
router.post("/", verifyToken, createReviewForCounter);
router.get("/:id", getReviewByIdForCounter);
router.put("/:id", updateReviewForCounter);
router.delete("/:id", deleteReviewForCounter);

module.exports = router;
