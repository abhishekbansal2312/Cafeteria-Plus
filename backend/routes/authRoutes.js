const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/logout", logoutUser);

router.post("/refresh", refreshToken);

router.get("/me", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
