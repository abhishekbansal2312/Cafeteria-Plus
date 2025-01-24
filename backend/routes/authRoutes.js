const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  createNewUserWithRole,
} = require("../controllers/authController");
const { verifyTokenAndAdmin } = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/logout", logoutUser);

router.post("/refresh", refreshToken);

router.post("/role", verifyTokenAndAdmin, createNewUserWithRole);

module.exports = router;
