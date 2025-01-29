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
const filterCounters = require("../filters/filterCounters");
const Counter = require("../models/counterModel");
const paginate = require("../middleware/pagination");

router.get("/merchantcounters", verifyToken, getAllMerchantCounters);
router.get("/merchants", verifyToken, getMerchants);
router.put("/merchants/:id", verifyTokenAndAdmin, addMerchantInCounter);
router.post("/", verifyTokenAndAdmin, createCounter); // done
router.get("/", filterCounters(Counter), paginate, getAllCounters); // done
router.get("/:id", getCounterById); // done
router.put("/:id", verifyTokenForAdminAndMerchant, updateCounter); // done
router.delete("/:id", verifyTokenAndAdmin, deleteCounter); // done

module.exports = router;
