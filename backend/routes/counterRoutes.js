const express = require("express");
const router = express.Router();
const {
  createCounter,
  getAllCounters,
  getCounterById,
  updateCounter,
  deleteCounter,
  toggleCounterStatus,
} = require("../controllers/counterController");
const {
  verifyTokenAndAdmin,
  verifyTokenForAdminAndMerchant,
} = require("../middleware/authMiddleware");

router.post("/", verifyTokenAndAdmin, createCounter);

router.get("/", getAllCounters);

router.get("/:id", getCounterById);

router.put("/:id", verifyTokenForAdminAndMerchant, updateCounter);

router.delete("/:id", verifyTokenAndAdmin, deleteCounter);

router.patch(
  "/:id/status",
  verifyTokenForAdminAndMerchant,
  toggleCounterStatus
);

module.exports = router;
