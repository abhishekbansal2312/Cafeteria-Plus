const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} = require("../controllers/cartController");

router.get("/", verifyToken, getCart); // get cart
router.post("/", verifyToken, addToCart); // add to cart
router.delete("/", verifyToken, removeFromCart); // remove item from cart
router.put("/:id", verifyToken, updateCartItem);

module.exports = router;
