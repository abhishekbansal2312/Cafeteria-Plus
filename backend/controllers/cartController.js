const User = require("../models/userModel");
const Dish = require("../models/dishModel");

exports.addToCart = async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    const dish = await Dish.findById(itemId);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingCartItem = user.cart.find(
      (item) => item.dish.toString() === itemId
    );
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cart.push({ dish: itemId, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.dish");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => item.dish.toString() !== itemId);
    await user.save();

    res.status(200).json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = user.cart.find((item) => item.dish.toString() === itemId);
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cartItem.quantity = quantity;
    await user.save();

    res.status(200).json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.increaseCartQuantity = async (req, res) => {
  const { itemId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = user.cart.find((item) => item.dish.toString() === itemId);
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cartItem.quantity += 1;
    await user.save();

    res.status(200).json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.decreaseCartQuantity = async (req, res) => {
  const { itemId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = user.cart.find((item) => item.dish.toString() === itemId);
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await user.save();
      res.status(200).json(user.cart);
    } else {
      res.status(400).json({ message: "Cannot decrease quantity below 1" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
