const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/register", registerUser); // done

router.post("/login", loginUser); // done

router.delete("/logout", logoutUser); // done

router.post("/refresh", refreshToken); // done

router.get("/me", verifyToken, (req, res) => {
  res.json({ user: req.user });
}); // done

module.exports = router;
