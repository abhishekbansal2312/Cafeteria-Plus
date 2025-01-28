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
  verifyTokenForAdminAndMerchant,
  verifyToken,
} = require("../middleware/authMiddleware");

router.get("/merchants", verifyToken, getAllMerchantCounters);
router.put("/merchants/:id", verifyTokenAndAdmin, addMerchantInCounter);
router.post("/", verifyTokenAndAdmin, createCounter); // done
router.get("/", getAllCounters); // done
router.get("/:id", getCounterById); // done
router.put("/:id", verifyTokenForAdminAndMerchant, updateCounter); // done
router.delete("/:id", verifyTokenAndAdmin, deleteCounter); // done

module.exports = router;
