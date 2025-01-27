const express = require("express");
const router = express.Router();
const {
  createCounter,
  getAllCounters,
  getCounterById,
  updateCounter,
  deleteCounter,
  addMerchantInCounter,
  getAllMerchantCounters,
  getMerchants,
} = require("../controllers/counterController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndMerchant,
} = require("../middleware/authMiddleware");

router.get("/merchants", verifyTokenAndAdmin, getMerchants);
router.put("/merchants/:id", verifyTokenAndAdmin, addMerchantInCounter);
router.post("/", createCounter); // done
router.get("/", getAllCounters); // done
router.get("/:id", getCounterById); // done
router.put("/:id", updateCounter); // done
router.delete("/:id", verifyTokenAndAdmin, deleteCounter); // done

module.exports = router;
