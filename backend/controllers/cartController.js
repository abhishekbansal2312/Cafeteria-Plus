const User = require("../models/userModel");
const Dish = require("../models/dishModel");

const addToCart = async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    const dish = await Dish.findById(id);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cartItem = user.cart.find((item) => item.dish.toString() === id);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ dish: id, quantity: 1 });
    }

    await user.save();

    res.status(200).json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getCart = async (req, res) => {
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

const removeFromCart = async (req, res) => {
  const itemId = req.body.id;
  console.log(itemId);

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

const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

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

const increaseCartQuantity = async (req, res) => {
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

const decreaseCartQuantity = async (req, res) => {
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
    } else {
      user.cart = user.cart.filter((item) => item.dish.toString() !== itemId);
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  increaseCartQuantity,
  decreaseCartQuantity,
};
