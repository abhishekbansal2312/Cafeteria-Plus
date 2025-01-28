const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getme,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/register", registerUser); // done

router.post("/login", loginUser); // done

router.delete("/logout", logoutUser); // done

router.post("/refresh", refreshToken); // done

router.get("/me", verifyToken, getme); // done

module.exports = router;
