const User = require("../models/userModel");
const mongoose = require("mongoose");
const { isUserExists, hashPassword } = require("./authController");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  const id = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const id = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMerchants = async (req, res) => {
  try {
    const merchants = await User.find({ role: "merchant" }).select("-password");
    res.status(200).json(merchants);
  } catch (error) {
    console.error("Error fetching merchants:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!["admin", "customer", "merchant"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

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
      role,
    });
    res.status(201).json({
      message: `${role} created successfully`,
      data: {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserByAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (["admin", "customer", "merchant"].includes(role)) {
      const userExists = await isUserExists(email);
      if (userExists && userExists._id.toString() !== id) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const updatedData = { name, email, role };

      if (password) {
        updatedData.password = await hashPassword(password);
      }

      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
      }).select("-password");

      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }
  } catch (error) {
    console.error("Error updating user by admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getMerchants,
  createUser,
  updateUserByAdmin,
};
