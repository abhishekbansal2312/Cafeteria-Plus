const jwt = require("jsonwebtoken");
const { genSalt, hash, compare } = require("bcryptjs");
const User = require("../models/userModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const isUserExists = async (email) => {
  return await User.findOne({ email });
};

const hashPassword = async (password) => {
  const salt = await genSalt(12);
  return await hash(password, salt);
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await isUserExists(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate("cart.dish");
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const validatePassword = await compare(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        role: user.role,
        cartLength: user.cart.length || 0,
        cart: user.cart,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(403).json({ message: "User not found" });

    const newAccessToken = generateAccessToken(user);

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

const logoutUser = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};

const getme = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.dish");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        cartLength: user.cart.length || 0,
        cart: user.cart,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getme,
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  isUserExists,
  hashPassword,
};
