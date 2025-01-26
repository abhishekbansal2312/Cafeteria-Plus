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
router.delete("/", verifyToken, removeFromCart);
router.put("/:id", verifyToken, updateCartItem);

router.put("/increase/:id", verifyToken, increaseCartQuantity);
router.put("/decrease/:id", verifyToken, decreaseCartQuantity);

module.exports = router;
