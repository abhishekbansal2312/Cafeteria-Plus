const express = require("express");
const router = express.Router();
const {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getMerchants,
  createUser,
  updateUserByAdmin,
} = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/authMiddleware");
const paginate = require("../middleware/pagination");
const filterUsers = require("../filters/filterUsers");
const User = require("../models/userModel");

// user routes for admin access
router.get("/", filterUsers(User), paginate, verifyTokenAndAdmin, getUsers); // done
router.get("/:id", verifyTokenAndAdmin, getUserById); // done
router.post("/", verifyTokenAndAdmin, createUser); // done
router.put("/:id", verifyTokenAndAdmin, updateUserByAdmin); // done
router.delete("/:id", verifyTokenAndAdmin, deleteUser); // done
// user routes for customer access
router.get("/profile", verifyToken, getUserById);
router.put("/profile", verifyToken, updateUser);

// merchant routes
router.get("/merchants", verifyTokenAndAdmin, getMerchants);

module.exports = router;
