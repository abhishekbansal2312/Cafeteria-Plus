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

router.post("/", createCounter); // done
router.get("/", getAllCounters); // done
// router.get("/merchant", verifyTokenAndMerchant, getAllMerchantCounters);
// router.put("/merchant/:id", verifyTokenAndMerchant, updateCounter);
router.get("/:id", getCounterById);
router.put("/:id", updateCounter); // done
router.delete("/:id", verifyTokenAndAdmin, deleteCounter); // done

module.exports = router;
