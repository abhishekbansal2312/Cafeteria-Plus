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

router.get("/", verifyToken, getCart); // get cart
router.post("/", verifyToken, addToCart); // add to cart
router.delete("/", verifyToken, removeFromCart); // remove item from cart
router.put("/:id", verifyToken, updateCartItem);

router.put("/increase/:id", verifyToken, increaseCartQuantity);
router.put("/decrease/:id", verifyToken, decreaseCartQuantity);

module.exports = router;
