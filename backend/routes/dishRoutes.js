const express = require("express");
const router = express.Router();
const {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
} = require("../controllers/dishController");
const {
  verifyTokenAndAdmin,
  verifyTokenForAdminAndMerchant,
} = require("../middleware/authMiddleware");

router.post("/:counterId", verifyTokenForAdminAndMerchant, createDish);

router.get("/", getAllDishes); // done
router.get("/:id", getDishById);
router.put("/:id", verifyTokenForAdminAndMerchant, updateDish); // done
router.delete("/:id", verifyTokenForAdminAndMerchant, deleteDish); // done

module.exports = router;
