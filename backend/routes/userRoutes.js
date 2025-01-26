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
// user routes for admin access
router.get("/", verifyTokenAndAdmin, getUsers);
router.get("/:id", verifyTokenAndAdmin, getUserById);
router.post("/", verifyTokenAndAdmin, createUser);
router.put("/:id", verifyTokenAndAdmin, updateUserByAdmin);
// user routes for customer access
router.get("/profile", verifyToken, getUserById);
router.put("/profile", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
// merchant routes
router.get("/merchants", verifyTokenAndAdmin, getMerchants);

module.exports = router;
