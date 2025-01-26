const express = require("express");
const router = express.Router();
const {
  createCounter,
  getAllCounters,
  getCounterById,
  updateCounter,
  deleteCounter,
  toggleCounterStatus,
  getAllMerchantCounters,
} = require("../controllers/counterController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndMerchant,
} = require("../middleware/authMiddleware");

router.post("/", createCounter);

router.get("/", getAllCounters);
router.get("/merchant", verifyTokenAndMerchant, getAllMerchantCounters);
router.put("/merchant/:id", verifyTokenAndMerchant, updateCounter);
router.get("/:id", getCounterById);
router.put("/:id", verifyTokenAndAdmin, updateCounter);
router.delete("/:id", verifyTokenAndAdmin, deleteCounter);

module.exports = router;
