const express = require("express");
const router = express.Router();
const {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getUsers);
router.delete("/delete/:id", deleteUser);
router.get("/:id", verifyToken, getUserById);
router.put("/update/:id", updateUser);

module.exports = router;
