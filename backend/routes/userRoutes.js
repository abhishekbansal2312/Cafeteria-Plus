const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.delete("/delete/:id", deleteUser);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.get("/profile/:id", getUserProfile);
module.exports = router;
