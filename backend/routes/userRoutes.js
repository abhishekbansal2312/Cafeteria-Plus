const express = require("express");
const router = express.Router();
const {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getMerchants,
} = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/authMiddleware");
// user routes
router.get("/", verifyToken, getUsers);
router.get("/profile", verifyToken, getUserById);
router.put("/profile", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
// merchant routes
router.get("/merchants", verifyTokenAndAdmin, getMerchants);

module.exports = router;
