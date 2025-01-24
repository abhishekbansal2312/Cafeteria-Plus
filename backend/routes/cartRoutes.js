const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  increaseCartQuantity,
  decreaseCartQuantity,
} = require("../controllers/cartController");

router.get("/", verifyToken, getCart);
router.post("/", verifyToken, addToCart);
router.delete("/:itemId", verifyToken, removeFromCart);
router.put("/:itemId", verifyToken, updateCartItem);
router.put("/:itemId/increase", verifyToken, increaseCartQuantity);
router.put("/:itemId/decrease", verifyToken, decreaseCartQuantity);

module.exports = router;
