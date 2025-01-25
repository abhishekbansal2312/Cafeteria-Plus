const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  createNewUserWithRole,
} = require("../controllers/authController");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/logout", logoutUser);

router.post("/refresh", refreshToken);

router.post("/role", verifyTokenAndAdmin, createNewUserWithRole);

router.get("/me", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
