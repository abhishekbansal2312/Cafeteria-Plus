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
const { verifyTokenAndAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyTokenAndAdmin, createCounter);

router.get("/", getAllCounters);

router.get("/:id", getCounterById);
router.put("/:id", verifyTokenAndAdmin, updateCounter);
router.delete("/:id", verifyTokenAndAdmin, deleteCounter);

module.exports = router;
