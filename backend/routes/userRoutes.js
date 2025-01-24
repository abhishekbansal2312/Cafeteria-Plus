const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.delete("/delete", deleteUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.put("/update", updateUserProfile);
router.get("/profile", getUserProfile);
module.exports = router;
