const express = require("express");
const router = express.Router();
const {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getUsers);
router.get("/profile", verifyToken, getUserById);
router.put("/profile", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
